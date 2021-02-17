import Vue, { CreateElement, VNode } from 'vue';
import { Task } from '../reducer';
import { store$ } from '../store';

export const TaskList = Vue.extend({
  props: ['tasks'],
  render(createElement: CreateElement): VNode {
    const taskList = this.$props.tasks.map((task: Task) => {
      return createElement(
        'li',
        task.task
      );
    });
    return createElement('ol', taskList);
  },
});
