/* eslint-disable no-unused-vars */
const Vue = require('vue').default;
const { CreateElement } = require('vue');

const WorkerSelect = Vue.extend({
  props: ['workers'],
  render(CreateElement) {
    const WorkerList = this.$props.workers.map((worker) => {
      return CreateElement(
        'option',
        {
          domProps: {
            value: worker.id,
          },
        },
        worker.name
      );
    });
    return CreateElement(
      'select',
      { domProps: { name: 'assignee' } },
      WorkerList
    );
  },
});

exports.WorkerSelect = WorkerSelect;
