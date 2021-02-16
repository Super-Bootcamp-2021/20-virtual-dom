const Vue = require('vue');
const {
  done,
  cancel,
  getList,
  add,
  getWorkersList,
} = require('./async-action');
const { store$, errorAction, clearErrorAction } = require('./store');

require('./main.css');

new Vue ({})