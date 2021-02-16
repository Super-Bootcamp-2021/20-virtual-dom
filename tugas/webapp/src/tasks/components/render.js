/* eslint-disable no-unused-vars */
const Vue = require('vue').default;
const { CreateElement } = require('vue');
const { TaskForm } = require('./task-form');
const { TaskList } = require('./task-list.js');
const {
  done,
  cancel,
  getList,
  add,
  getWorkersList,
} = require('../async-action');
const { store$, errorAction, clearErrorAction } = require('../store');

const Task = new Vue({
  el: '#task',
  components: {
    'task-form': TaskForm,
    'task-list': TaskList,
  },
  render(CreateElement) {
    return CreateElement('div', [
      CreateElement(
        'H3',
        { props: { workers: this.state.workers } },
        this.state.error
      ),
      CreateElement('task-form', { props: { workers: this.state.workers } }),
      CreateElement('task-list', { props: { tasks: this.state.tasks } }),
    ]);
  },
  data: {
    state: {
      loading: true,
      error: '',
      workers: [
        {
          id: '1',
          name: 'hedy',
        },
        {
          id: '1',
          name: 'hedy',
        },
      ],
      tasks: [],
    },
  },
  mounted() {
    store$.subscribe(() => {
      this.state = store$.getState();
    });
    store$.dispatch(getList);
    store$.dispatch(getWorkersList);
  },
});

exports.Task = Task;
