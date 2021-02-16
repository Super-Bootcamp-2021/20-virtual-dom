/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
require('./main.css');
const Vue = require('vue').default;

//const { addTaskAsync, loadTasksAsync } = require('./worker.client');
const { WorkerList } = require('./components/worker-list');
const { WorkerForm } = require('./components/worker-form');
const { getList } = require('./async-action');
const { store$ } = require('./store');

new Vue({
  el: '#app-worker',
  components: {
    'worker-list': WorkerList,
    'worker-form': WorkerForm,
  },
  render(h) {    
    return h('div', [      
      h('worker-form'),
      h('hr'),
      h('h4', 'Daftar pekerja'),      
      h('worker-list', { props: { workers: this.workers } }),      
    ]);
  },
  data: {    
    workers: [],
  },  
  mounted() {
    let state;
    store$.subscribe(() => {
      state = store$.getState();
      this.workers = state.workers;
    });
    store$.dispatch(getList);
    // if (state.error) {
    //   errorTxt.textContent = state.error.toString();
    // } else {
    //   errorTxt.textContent = '';
    // }
  },
});
