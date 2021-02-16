import Vue from 'vue';
import { register, getList, remove } from './async-action';
import { store$, errorAction, clearErrorAction } from './store';

export const WorkerList = Vue.extend({
  props: ['workers'],

  render(element) {
    const workerList = this.$props.workers.workers.map((worker) => {
      return element('div', [
        element('li', [
          element('img', {
            attrs: {
              src: '${worker.photo}',
              alt: 'worker.jpg',
              width: '30px',
              height: '30px',
            },
          }),
          element('span', worker.name),
          element(
            'button',
            {
              on: {
                click: () => {
                  this.removeWorker(remove(worker));
                },
              },
            },
            'hapus'
          ),
        ]),
      ]);
    });
    element('list', workerList);
  },

  methods: {
    removeWorker(worker) {
      store$.dispatch(remove(worker.id));
    },
  },
});
