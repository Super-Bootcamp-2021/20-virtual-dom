require('./main.css');
const { Vue } = require('vue');
const { store$ } = require('./store');
const { summary } = require('./async-action');
// const { addTaskAsync, loadTasksAsync } = require ( './performance.client');
// const { TodoList } = require ( './components/todo-list');

new Vue({
  el: '#performance-VDOM',
  render(createElement) {
    return createElement('div', [
      createElement(
        'button',
        {
          on: {
            click: function () {
              this.workers = 1;
              this.tasks = 1;
              this.selesai = 1;
              this.batal = 1;
            },
          },
        },
        'refresh'
      ),
      createElement('li', {}),
    ]);
  },
  data: {
    workers: 0,
    tasks: 0,
    selesai: 0,
    batal: 0,
  },
});
