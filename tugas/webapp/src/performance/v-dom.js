require('./main.css');
const { Vue } = require('vue');
const { store$ } = require('./store');
const { summary } = require('./async-action');
const { menuLayout } = require('./components/menu');
const { errLoadBtn } = require('./components/errLoad');

new Vue({
  el: '#performance-VDOM',
  components: {
    menuOption: menuLayout,
    errLoad: errLoadBtn,
  },
  render(createElement) {
    return createElement('div', [
      createElement('menuOption'),
      createElement('errLoad', {
        props: {
          err: this.state.error,
          load: this.state.loading,
        },
      }),
      createElement('li', {}),
    ]);
  },
  data: {
    state: '',
  },
  mounted() {
    this.state = store$.getState();
    store$.subscribe(() => {
      this.state = store$.getState();
    });
    store$.dispatch(summary);
  },
});
