import Vue, { CreateElement, VNode } from 'vue';
import { Task } from '../reducer';
import { done, cancel } from '../async-action';
import { store$ } from '../store';

export const TaskList = Vue.extend({
  props: ['tasks'],
  render(createElement: CreateElement): VNode {
    var taskList = [];
    if (this.$props.tasks) {
      taskList = this.$props.tasks.map((task: Task) => {
        return createElement('li', [
          createElement('div', [
            createElement('a', task.attachment),
            createElement('span', task.job),
            createElement('span', task.assignee),
            task.done
              ? createElement('span', 'sudah selesai')
              : [
                  createElement(
                    'button',
                    {
                      on: {
                        // click: this.doneBtn(task.id),
                        click: () => {
                          store$.dispatch<any>(done(task.id));
                        },
                      },
                    },
                    'selesai'
                  ),
                  createElement(
                    'button',
                    {
                      on: {
                        // click: this.cancelBtn(task.id),
                        click: () => {
                          store$.dispatch<any>(cancel(task.id));
                        },
                      },
                    },
                    'batal'
                  ),
                ],
          ]),
        ]);
      });
    }
    return createElement('ol', taskList);
  },
  methods: {
    // Kok Error
    doneBtn(id) {
      console.log(id);
      // store$.dispatch<any>(done(id));
    },
    cancelBtn(id) {
      console.log(id);
      // store$.dispatch<any>(cancel(id));
    },
  },
});
