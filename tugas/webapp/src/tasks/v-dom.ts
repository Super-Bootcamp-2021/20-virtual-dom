import './main.css';
import { done, cancel, getList, add, getWorkersList } from './async-action';
import { store$, errorAction, clearErrorAction } from './store';

import Vue, { CreateElement, VNode } from 'vue';
import { TaskList } from './components/task-list';
import { AssigneeSelect } from './components/assignee-select';

new Vue({
  el: '#task-app',
  components: {
    'task-list': TaskList,
    'assignee-select': AssigneeSelect,
  },
  render(createElement: CreateElement): VNode {
    return createElement('div', [
      createElement('hr'),
      this.state.error ? createElement('p', this.state.error.toString()) : null,
      this.state.loading ? createElement('p', 'memuat...') : null,
      createElement('h4', 'buat tugas baru'),
      createElement(
        'form',
        {
          on: {
            submit: this.submitNewTask,
          },
        },
        [
          createElement(
            'label',
            {
              attrs: {
                for: 'job',
              },
            },
            'Tugas'
          ),
          createElement('textarea', {
            attrs: {
              name: 'job',
              id: 'job',
              cols: 30,
              rows: 3,
              placeholder: 'deskripsi pekerjaan',
            },
            // domProps: {
            //   value: this.task.job,
            // },
            on: {
              input: (event) => {
                this.task.job = event.target.value;
                console.log(this)
              },
            },
          }),
          createElement(
            'label',
            {
              attrs: {
                for: 'assignee',
              },
            },
            'Pekerja'
          ),
          createElement('assignee-select', { props: { workers: this.state.workers } }),
          createElement(
            'label',
            {
              attrs: {
                for: 'attachment',
              },
            },
            'Lampiran'
          ),
          createElement('input', {
            attrs: {
              type: 'file',
              name: 'attachment',
              id: 'attachment',
            },
          }),
          createElement('button', { attrs: { type: 'submit' } }, 'kirim'),
        ]
      ),
      createElement('hr'),
      createElement('h4', 'daftar tugas'),
      createElement('task-list', { props: { tasks: this.tasks } }),
    ]);
  },
  data: {
    task: {
      job: '',
      assignee: '',
      attachment: {},
    },

    tasks: [],
    state: {},
  },
  methods: {
    submitNewTask(event) {
      event.preventDefault();
      if (
        !this.job.value ||
        !this.assignee.options[this.assignee.selectedIndex] ||
        !this.attachment?.files
      ) {
        store$.dispatch(errorAction('form isian tidak lengkap!'));
        return;
      }

      // register user
      store$.dispatch<any>(
        add({
          job: this.job.value,
          assignee_id: this.assignee.options[this.assignee.selectedIndex].value,
          attachment: this.attachment?.files[0],
        })
      );

      // reset form
      event.target.reset();
    },
  },
  mounted() {
    this.state = store$.getState();
    store$.subscribe(() => {
      this.state = store$.getState();
    });
    store$.dispatch<any>(getList);
    store$.dispatch<any>(getWorkersList);

    console.log(this.state);
  },
});

// const app1 = new Vue({
//   el: '#task-app',
//   render(createElement: CreateElement): VNode {
//     return createElement('div', [
//       createElement('input', {
//         domProps: {
//           value: this.message,
//         },
//         on: {
//           input: (event) => {
//             this.message = event.target.value;
//           },
//         },
//       }),
//       this.hide ? null : createElement('p', this.message),
//       createElement(
//         'button',
//         {
//           on: {
//             click: this.reverse,
//           },
//         },
//         'kebalik'
//       ),
//       createElement(
//         'button',
//         {
//           on: {
//             click: this.toggleHide,
//           },
//         },
//         this.hide ? 'lihat' : 'tutup'
//       ),
//     ]);
//   },
//   data: {
//     message: 'selamat pagi',
//     hide: false,
//   },
//   methods: {
//     reverse() {
//       this.message = this.message.split('').reverse().join('');
//     },
//     toggleHide() {
//       this.hide = !this.hide;
//     },
//   },
// });
