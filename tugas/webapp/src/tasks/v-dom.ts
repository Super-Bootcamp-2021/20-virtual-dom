import Vue, { CreateElement} from 'vue';

new Vue({
  el: '#app',
  render(createElement: CreateElement) {
    return createElement('h1', 'Ini vue component');
  }
});