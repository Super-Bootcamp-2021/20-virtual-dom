import Vue, { CreateElement, VNode } from 'vue';

export const TodoItem = Vue.extend({
  props: ['todo'],
  render(createElement: CreateElement): VNode {
    return createElement(
      'li',
      { style: { color: 'red' } },
      this.$props.todo.text
    );
  },
});
