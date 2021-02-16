import './app.css';
import Vue, { CreateElement, VNode } from 'vue';
import { store$ } from './store';
import { addTaskAsync, loadTasksAsync } from './todo-client';
import { TodoList } from './components/todo-list';

new Vue({
  el: '#todo-app',
  components: {
    'todo-list': TodoList,
  },
  render(h: CreateElement): VNode {
    return h('div', [
      h(
        'form',
        {
          on: {
            submit: this.submitNewTask,
          },
        },
        [
          h('input', {
            domProps: {
              value: this.task,
            },
            on: {
              input: (event) => {
                this.task = event.target.value;
              },
            },
          }),
          h('button', 'tambah'),
        ]
      ),
      h('hr'),
      h('h4', 'daftar kerjaan'),
      h('todo-list', { props: { todos: this.todos } }),
    ]);
  },
  data: {
    task: '',
    todos: [],
  },
  methods: {
    submitNewTask(event) {
      event.preventDefault();
      if (!this.task?.length) {
        return;
      }
      store$.dispatch<any>(addTaskAsync(this.task));
      event.target.reset();
    },
  },
  mounted() {
    this.todos = store$.getState();
    store$.subscribe(() => {
      this.todos = store$.getState();
    });
    store$.dispatch<any>(loadTasksAsync);
  },
});
