require('./main.css');
const Vue = require('vue');
const { store$ } = require('./store');

new Vue({
  el: '#app1',
  render(createElement) {
    return createElement('div', 'initial');
  },
  data: {
    init: '',
  },

  mounted() {
    this.init = store$.getState();
    store$.subscribe(() => {
      this.init = store$.getState();
    });
  },
});
