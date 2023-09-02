// reducers/index.js
import { combineReducers, createStore } from 'redux';
import TaskTrackerReducer from '../reducers/TaskTracker';

const rootReducer = combineReducers({
  taskTracker: TaskTrackerReducer,
});

export const store = createStore(rootReducer);
