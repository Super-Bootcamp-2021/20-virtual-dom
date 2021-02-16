import './main.css';
import Vue from 'vue';
import { register, getList, remove } from './async-action';
import { store$, errorAction, clearErrorAction } from './store';
import { WorkerList } from './worker-list';

new Vue({
  el: '#worker',
  components: {
    'worker-list': WorkerList,
  },
  render(element) {
    return element('div', [
      element(
        'p',
        {
          attrs: {
            id: 'error-text',
            class: 'error',
          },
        },
        this.error
      ),
      element(
        'p',
        {
          attrs: {
            id: 'loading-text',
            class: 'primary',
          },
        },
        'memuat...'
      ),
      element('h4', 'Daftarkan pekerja baru'),
      element(
        'form',
        {
          on: {
            submit: this.addNewWorker,
          },
        },
        [
          element(
            'label',
            {
              attrs: {
                for: 'name',
              },
            },
            'Nama:'
          ),
          element('input', {
            attrs: {
              type: 'text',
              name: 'name',
              id: 'name',
              placeholder: 'misal budiman',
            },
            domProps: {
              value: this.name,
            },
            on: {
              input: (event) => {
                this.name = event.target.value;
              },
            },
          }),
          element('br'),

          element(
            'label',
            {
              attrs: {
                for: 'age',
              },
            },
            'Umur:'
          ),
          element('input', {
            attrs: {
              type: 'number',
              name: 'age',
              id: 'age',
              placeholder: 'misal 23',
            },
            domProps: {
              value: this.age,
            },
            on: {
              input: (event) => {
                this.age = event.target.value;
              },
            },
          }),
          element('br'),

          element(
            'label',
            {
              attrs: {
                for: 'photo',
              },
            },
            'Foto:'
          ),
          element('input', {
            attrs: {
              type: 'file',
              name: 'photo',
              id: 'photo',
            },
            domProps: {
              value: this.photo,
            },
            on: {
              input: (event) => {
                this.photo = this.onFileChange;
              },
            },
          }),
          element('br'),
          element(
            'label',
            {
              attrs: {
                for: 'bio',
              },
            },
            'Biodata singkat:'
          ),
          element('br'),
          element('textarea', {
            attrs: {
              name: 'bio',
              id: 'bio',
              cols: '30',
              rows: '3',
              placeholder: 'biodata singkat pekerja',
            },
            domProps: {
              value: this.bio,
            },
            on: {
              input: (event) => {
                this.bio = event.target.value;
              },
            },
          }),
          element('br'),

          element(
            'label',
            {
              attrs: {
                for: 'address',
              },
            },
            'Alamat:'
          ),
          element('br'),
          element('textarea', {
            attrs: {
              name: 'address',
              id: 'address',
              cols: '30',
              rows: '3',
              placeholder: 'alamat pekerja',
            },
            domProps: {
              value: this.address,
            },
            on: {
              input: (event) => {
                this.address = event.target.value;
              },
            },
          }),
          element('br'),
          element('br'),

          element(
            'button',
            {
              attrs: {
                type: 'submit',
              },
            },
            'kirim'
          ),
        ]
      ),
      element('hr'),
      element('h4', 'Daftar Pekerja'),
      element('worker-list', { props: { workers: this.workers } }),
    ]);
  },

  data: {
    loading: false,
    error: null,
    name: '',
    age: '',
    photo: '',
    bio: '',
    address: '',
    workers: {},
  },

  methods: {
    addNewWorker(event) {
      event.preventDefault();
      store$.dispatch(clearErrorAction());
      if (
        !this.name ||
        !this.age ||
        !this.photo ||
        !this.bio ||
        !this.address
      ) {
        store$.dispatch(errorAction('form isian tidak lengkap!'));
        return;
      }

      // register user
      store$.dispatch(
        register({
          name: this.name,
          photo: this.photo,
          age: this.age,
          bio: this.bio,
          address: this.address,
        })
      );

      event.target.reset();
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },

  mounted() {
    this.workers = store$.getState();
    store$.subscribe(() => {
      this.workers = store$.getState();
    });
    store$.dispatch(getList);
  },
});
