import Vue, { CreateElement, VNode } from 'vue';
import { TodoItem } from './todo-item';

const app1 = new Vue({
  el: '#app-1',
  render(createElement: CreateElement): VNode {
    return createElement('div', [
      createElement('input', {
        domProps: {
          value: this.message,
        },
        on: {
          input: (event) => {
            this.message = event.target.value;
          },
        },
      }),
      this.hide ? null : createElement('p', this.message),
      createElement(
        'button',
        {
          on: {
            click: this.reverse,
          },
        },
        'kebalik'
      ),
      createElement(
        'button',
        {
          on: {
            click: this.toggleHide,
          },
        },
        this.hide ? 'lihat' : 'tutup'
      ),
    ]);
  },
  data: {
    message: 'selamat pagi',
    hide: false,
  },
  methods: {
    reverse() {
      this.message = this.message.split('').reverse().join('');
    },
    toggleHide() {
      this.hide = !this.hide;
    },
  },
});

const app2 = new Vue({
  el: '#app-2',
  components: {
    'todo-item': TodoItem,
  },
  render(createElement: CreateElement): VNode {
    const todos: VNode[] = [];
      for (const todo of this.todos) {
        todos.push(createElement('todo-item', { props: { todo: todo } }));
      }
    return createElement('ul', todos);
  },
  data: {
    todos: [
      { text: 'makan' },
      { text: 'minum' },
      { text: 'belajar' },
      { text: 'main' },
    ],
  },
  beforeCreate() {
    console.log('before create');
  },
  beforeUpdate() {
    console.log('will render DOM');
  },
  mounted() {
    for (let i = 0; i < 99; i++) {
      this.todos.push({ text: 'teks ke ' + i });
    }
  },
});
