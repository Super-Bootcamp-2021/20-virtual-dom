import Vue, { CreateElement, VNode } from 'vue';
import { Worker } from '../reducer';
import { store$ } from '../store';

export const AssigneeSelect = Vue.extend({
  props: ['workers'],
  render(createElement: CreateElement): VNode {
    let temp = [
      {
        id: 0,
        name: 'Name',
      },
      {
        id: 1,
        name: 'Budi',
      },
      {
        id: 2,
        name: 'Susi',
      },
    ];
    // const workerList = this.$props.workers.map((worker: Worker) => {
    const workerList = temp.map((worker) => {
      return createElement(
        'option',
        {
          attrs: {
            value: worker.id,
          },
        },
        worker.name
      );
    });
    var self = this;
    return createElement(
      'select',
      {
        attrs: {
          name: 'assignee',
          id: 'assignee',
        },
        domProps: {
          // Untuk init value of select
          value: self.value,
        },
        on: {
          input: function (event) {
            self.value = event.target.value;
          },
        },
      },
      [workerList]
    );
  },
});
