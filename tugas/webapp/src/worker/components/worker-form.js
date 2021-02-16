const Vue = require('vue').default;
const { register } = require('../async-action');
const { store$ } = require('../store');

const WorkerForm = Vue.extend({
  props: ['workers'],
  render(createElement) {
    return createElement(
      'form',
      {
        //class: { 'todo-done': todo.done },
        on: {
          submit: this.registerNewWorker,
        },
      },
      [
        createElement('label', 'Nama:'),
        createElement('br'),
        createElement('input', {
          domProps: {
            value: this.name,
          },
          on: {
            input: (event) => {
              this.name = event.target.value;
            },
          },
        }),
        createElement('br'),
        createElement('label', 'Age:'),
        createElement('br'),
        createElement('input', {
          domProps: {
            value: this.age,
          },
          on: {
            input: (event) => {
              this.age = event.target.value;
            },
          },
        }),
        createElement('br'),
        createElement('label', 'Foto:'),
        createElement('br'),
        createElement('input', {
          domProps: {
            type: 'file',
            value: this.photo,
          },
          on: {
            input: (event) => {
              this.photo = event.target.files[0];
            },
          },
        }),
        createElement('br'),
        createElement('label', 'Biodata singkat:'),
        createElement('br'),
        createElement('textarea', {
          domProps: {
            name: 'bio',
            cols: '30',
            rows: '3',
          },
          on: {
            input: (event) => {
              this.bio = event.target.value;
            },
          },
        }),
        createElement('br'),
        createElement('label', 'Alamat:'),
        createElement('br'),
        createElement('textarea', {
          domProps: {
            name: 'bio',
            cols: '30',
            rows: '3',
          },
          on: {
            input: (event) => {
              this.address = event.target.value;
            },
          },
        }),
        createElement('br'),
        createElement('button', 'Kirim', {
          domProps: {
            type: 'submit',
          },
        }),
      ]
    );
  },
  data: {
    name: '',
    photo: '',
    age: '',
    bio: '',
    address: '',
    workers: [],
  },
  methods: {
    registerNewWorker(event) {
      event.preventDefault();
      console.log(this.address);
      if (
        !this.name ||
        !this.photo ||
        !this.age ||
        !this.bio ||
        !this.address
      ) {
        console.log('form tidak lengkap');
        return;
      }

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
});

module.exports = {
  WorkerForm,
};
