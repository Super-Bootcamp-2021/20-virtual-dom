import './main.css';
import Vue from 'vue';
import { register, getList, remove } from './async-action';
import { store$, errorAction, clearErrorAction } from './store';

new Vue({
  el: '#worker',
  render(element) {
    return element('div', [
      element('p', this.message),
      element('hr'),
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
                this.photo = event.target.value;
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
              rows: 3,
              placeholder: 'alamat pekerja',
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
      element('div', {
        attrs: {
          id: 'list',
        },
      }),
    ]);
  },

  data: {
    message: '',
    name: '',
    age: 0,
    photo: '',
    bio: '',
    address: '',
    workers: [],
  },

  methods: {
    addNewWorker(event) {
      event.preventDefault();
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
  },

  mounted() {
    this.workers = store$.getState();
    store$.subscribe(() => {
      this.workers = store$.getState();
    });
    store$.dispatch(getList);
  },
});
