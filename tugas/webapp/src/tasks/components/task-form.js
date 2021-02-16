/* eslint-disable no-unused-vars */
const Vue = require('vue').default;
const { CreateElement } = require('vue');
const { WorkerSelect } = require('./worker-select');
const {
  done,
  cancel,
  getList,
  add,
  getWorkersList,
} = require('../async-action');
const { store$, errorAction, clearErrorAction } = require('../store');

const TaskForm = Vue.extend({
  props: ['workers'],
  components: {
    'worker-select': WorkerSelect,
  },
  render(CreateElement) {
    return CreateElement(
      'form',
      {
        on: {
          submit: this.submitTask,
        },
      },
      [
        CreateElement('textarea', {
          domProps: {
            type: 'text',
            name: 'job',
            placeholder: 'masukkan detil tugas disini',
          },
          on: {
            input: (event) => {
              this.job = event.target.value;
            },
          },
        }),
        CreateElement('worker-select', {
          props: {
            workers: this.$props.workers,
          },
        }),
        CreateElement('input', {
          domProps: {
            type: 'file',
            name: 'attachment',
          },
          on: {
            emit$: this.fileEvent,
          },
        }),
        CreateElement('input', {
          domProps: {
            type: 'submit',
            value: 'tambah tugas',
          },
        }),
      ]
    );
  },
  data: {
    job: '',
    assignee_id: '',
    attachment: '',
  },
  methods: {
    submitTask(event) {
      event.preventDefault();
      store$.dispatch(clearErrorAction());
      // if (!this.job || !this.assignee || !this.attachment) {
      //   store$.dispatch(errorAction('form isian tidak lengkap!'));
      //   return;
      // }
      store$.dispatch(
        add({
          job: this.job,
          assignee_id: this.assignee_Id,
          attachment: this.attachment,
        })
      );
    },
    fileEvent(event) {
      const attachment = event.target.files[0];
      this.attachment = attachment;
    },    
  },
});

exports.TaskForm = TaskForm;
