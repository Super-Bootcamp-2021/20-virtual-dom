import Vue from 'vue';
import { remove } from '../async-action';
import { store$ } from '../store';

export const ListWorker = Vue.extend({
  props: ['workers'],

  render(element) {
    const workerList = this.$props.workers.map((worker) => {
      return element('div', [
        element('li', [
          element('img', {
            attrs: {
              href: '${worker.photo}',
              alt: '',
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
                  this.removeWorker(worker);
                },
              },
            },
            'hapus'
          ),
        ]),
      ]);
    });
    return element('ol', workerList);
  },

  methods: {
    removeWorker(worker) {
      store$.dispatch(remove(worker.id));
    },
  },
});
