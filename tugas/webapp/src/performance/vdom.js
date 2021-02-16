require('./main.css');
import Vue from 'vue';
import { store$ } from './store';
import { summary } from './async-action';

new Vue({
  el: '#performance',
  render(CreateElement) {
    return CreateElement('div', [
      CreateElement('ul', [
        CreateElement('li', [
          CreateElement(
            'a',
            {
              attrs: {
                href: 'worker.html',
              },
            },
            'pekerja'
          ),
        ]),
        CreateElement('li', [
          CreateElement(
            'a',
            {
              attrs: {
                href: 'tasks.html',
              },
            },
            'pekerjaan'
          ),
        ]),
        CreateElement('li', [
          CreateElement(
            'a',
            {
              attrs: {
                href: 'performance.html',
              },
            },
            'kinerja'
          ),
        ]),
      ]),
      CreateElement('hr'),
      CreateElement(
        'p',
        {
          class: { error: this.loadSummary?.error },
        },
        this.loadSummary?.error
      ),
      CreateElement(
        'p',
        {
          class: { primary: this.loadSummary?.loading },
        },
        this.loadSummary?.loading ? 'memuat . . .' : ''
      ),
      CreateElement(
        'button',
        {
          on: {
            click: this.state,
          },
        },
        'refresh'
      ),
      CreateElement('ul', [
        CreateElement(
          'li',
          'jumlah pekerja: ' + this.loadSummary?.summary?.total_worker
        ),
        CreateElement(
          'li',
          'jumlah tugas: ' + this.loadSummary?.summary?.total_task
        ),
        CreateElement(
          'li',
          'yang selesai: ' + this.loadSummary?.summary?.task_done
        ),
        CreateElement(
          'li',
          'yang dibatalkan: ' + this.loadSummary?.summary?.task_cancelled
        ),
      ]),
    ]);
  },
  data: {
    loadSummary: {},
  },
  methods: {
    state() {
      store$.dispatch(summary);
    },
  },
  mounted() {
    this.loadSummary = store$.getState();
    store$.subscribe(() => {
      this.loadSummary = store$.getState();
    });
    store$.dispatch(summary);
  },
});
