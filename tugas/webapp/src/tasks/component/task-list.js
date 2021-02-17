import Vue, { CreateElement } from 'vue';
import { cancel, done } from '../async-action';

export const TaskList = Vue.extend({
  props: ['tasks'],
  render() {
    const taskList = this.$props.tasks.map((task) => {
      return CreateElement('div', [
        CreateElement(
          'a',
          { domProps: { href: task.attachment, target: 'blank' } },
          'attachment'
        ),
        ' ',
        CreateElement('span', task.job),
        ' ',
        CreateElement('span', task.assignee),
        ' ',
        task.done
          ? CreateElement('span', 'selesai')
          : CreateElement('span', [
              CreateElement(
                'button',
                { on: { click: () => this.doneTask(task.id) } },
                'selesai'
              ),
              CreateElement(
                'button',
                { on: { click: () => this.cancelTask(task.id) } },
                'batal'
              ),
            ]),
      ]);
    });
    return CreateElement('div', taskList);
  },
  methods: {
    doneTask(id) {
      store$.dispatch(done(id));
    },
    cancelTask(id) {
      store$.dispatch(cancel(id));
    },
  },
});
