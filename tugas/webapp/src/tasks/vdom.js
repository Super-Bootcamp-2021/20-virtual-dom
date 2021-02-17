import Vue from 'vue';
const {
  getList,
  getWorkersList,
} = require('./async-action');
const { store$ } = require('./store');
import { TaskList } from './task-list'
import { TaskInput } from './task-input'
require('./main.css');

new Vue({
  el: '#app-1',
  components: {
      'task-input' : TaskInput,
      'task-list' : TaskList,
  },
  render(crt) {
    return crt('div', [
      this.error ? crt('p', { class: { primary: true } }, this.error ): null,
      this.loading ? crt('p', { class: { primary: true } }, 'memuat...') : null,
      crt('task-input', { props: { workers: this.workers } }),
      crt('h4', 'Daftar Pekerjaan'),
      crt('task-list', { props: { tasks: this.tasks } }),
    ]);
  },
  data: {
    loading: true,
    error: null,
  },
  

  mounted() {
    const state = store$.getState();
    this.loading = state.loading;
    this.error = state.error;
    this.assignee = state.workers;
    this.tasks = state.tasks;
    store$.subscribe(() => {
      const state = store$.getState();
      this.loading = state.loading;
      this.error = state.error;
      this.assignee = state.workers;
      this.tasks = state.tasks;
    });
    store$.dispatch(getList);
    store$.dispatch(getWorkersList);
  },
});
