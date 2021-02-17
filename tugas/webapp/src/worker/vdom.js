
const Vue = require('vue').default;
const { register, getList, remove } = require('./async-action');
const { store$, errorAction, clearErrorAction } = require('./store');
const { WorkerList }  = require('./components/worker-list');
const { WorkerAdd }  = require('./components/add-worker');

new Vue({
  el: '#app1',
  components: {
    'worker-list': WorkerList,
    'add-worker': WorkerAdd,
  },
  render(createElement) {
    return createElement('hr',[
      createElement('p',{class:'error'},{ props: { error: this.state.error } }),
      this.state.loading,
      createElement('p',{class:'primary'},'memuat...'),
      createElement('h4', 'Daftar Pekerja Baru'),
      createElement('add-worker', {props:{worker :this.add}}),
      createElement('h4', 'Daftar Pekerja'),
      createElement('worker-list', { props: { workers: this.state.workers } }),
    
    ]);
  },
  data: {
    add:{
      name:'',
      age:0,
      bio:'',
      address:'',
      photo:null
    },
    state: {}
  },

  mounted() {
    this.state = store$.getState();
    store$.subscribe(() => {
      this.state = store$.getState();
    });
    store$.dispatch(getList);
  },
});
