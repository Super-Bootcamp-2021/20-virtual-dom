import Vue, { CreateElement } from 'vue';
import { getList, add, getWorkersList } from './async-action';
import '../main.css';
import { store$, errorAction, clearErrorAction } from './store';
import { TaskList } from './component/task-list';

new Vue({
  el: '#task-app',
  component: {
    'tasks-list': TaskList,
  },
  render() {
    const workersLists = this.workers.map((worker) => {
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
    return CreateElement('div', [
      CreateElement(
        'form',
        {
          on: {
            submit: this.submitNewTask,
          },
        },
        [
          CreateElement('p', 'Tugas : '),
          CreateElement('textarea', {
            domProps: {
              cols: '30',
              rows: '3',
            },
            on: {
              input: (event) => {
                this.newTask.job = event.target.value;
              },
            },
          }),
          CreateElement('p', 'Assignee'),
          CreateElement(
            'select',
            {
              on: {
                change: (event) => {
                  this.newTask.assignee_id =
                    event.target.children[event.target.selectedIndex].value;
                },
              },
            },
            [
              CreateElement(
                'option',
                {
                  domProps: {
                    value: '',
                  },
                },
                'Pilih pekerja'
              ),
              workersLists,
            ]
          ),
          CreateElement('input', {
            domProps: {
              type: 'file',
            },
            on: {
              change: (event) => {
                this.newTask.attachment = event.target.files[0];
              },
            },
          }),
          CreateElement('button', 'simpan'),
        ]
      ),
      CreateElement('hr'),
      CreateElement('h4', 'Daftar Tugas'),
      CreateElement('tasks-list', {
        props: {
          tasks,
        },
      }),
    ]);
  },
  data: {
    newTask: {
      job: '',
      assignee_id: null,
      attachment: null,
    },
    tasks: [],
    workers: [],
  },
  methods: {
    submitNewTask(event) {
      event.preventDefault();
      if (
        this.newTask.job === '' ||
        this.newTask.assignee_id === null ||
        this.newTask.attachment === null
      ) {
        return;
      }
      store$.dispatch(add(this.newTask));
      event.target.reset();
    },
  },
  mounted() {
    this.tasks = store$.getState().tasks;
    this.workers = store$.getState().workers;
    store$.subscribe(() => {
      this.tasks = store$.getState().tasks;
      this.workers = store$.getState().workers;
    });
    store$.dispatch(getList);
    store$.dispatch(getWorkersList);
  },
});
