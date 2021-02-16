import Vue, { CreateElement, VNode } from 'vue';
import { Worker } from '../reducer';

export const AssigneeSelect = Vue.extend({
  props: ['workers'],
  render(createElement: CreateElement): VNode {
    // let temp = [
    //   {
    //     id: 0,
    //     name: 'Name',
    //   },
    //   {
    //     id: 1,
    //     name: 'Budi',
    //   },
    //   {
    //     id: 2,
    //     name: 'Susi',
    //   },
    // ];
    // const workerList = temp.map((worker) => {
    var workerList = [];
    if (this.$props.workers) {
      workerList = this.$props.workers.map((worker: Worker) => {
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
    }
    var self = this;
    return createElement(
      'select',
      {
        attrs: {
          name: 'assignee',
          id: 'assignee',
        },
        // domProps: {
        //   // Untuk init value of select
        //   value: self.value,
        // },
        on: {
          input: function (event) {
            // self.value = event.target.value;
            self.$emit('test', event);
          },
        },
      },
      [
        // Not Best Practice
        createElement(
          'option',
          {
            attrs: {
              value: '',
            },
          },
          ''
        ),
        workerList,
      ]
    );
  },
});
