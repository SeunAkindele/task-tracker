import { TASK_TRACKER } from "../types";

const INITIAL_STATE = {
  taskTrackerState: {
    documents: [],
    title: "",
    description: "",
    date: "",
    modal: false,
    updateModal: false,
    isVisible: false,
    index: null
  },
};

const TaskTrackerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASK_TRACKER:
      return {
        ...state,
        taskTrackerState: action.payload,
      };
    default:
      return state;
  }
};

export default TaskTrackerReducer;