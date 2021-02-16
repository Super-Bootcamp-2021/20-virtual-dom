import { summary } from './async-action';
import { store$ } from './store';

import './main.css';

const workers = document.getElementById('workers');
const tasks = document.getElementById('tasks');
const done = document.getElementById('task-done');
const canceled = document.getElementById('task-canceled');
const refresh = document.getElementById('refresh');
const errorTxt = document.getElementById('error-text');
const loadingTxt = document.getElementById('loading-text');

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

store$.dispatch<any>(summary);

refresh.onclick = () => {
  store$.dispatch<any>(summary);
};

function render(state: any) {
  // render error
  if (state.error) {
    errorTxt.textContent = state.error.toString();
  } else {
    errorTxt.textContent = '';
  }
  if (state.loading) {
    loadingTxt.style.display = 'block';
  } else {
    loadingTxt.style.display = 'none';
  }

  // render list of worker
  workers.innerText = state.summary?.total_worker?.toString() ?? '0';
  tasks.innerText = state.summary?.total_task?.toString() ?? '0';
  done.innerText = state.summary?.task_done?.toString() ?? '0';
  canceled.innerText = state.summary?.task_cancelled?.toString() ?? '0';
}
