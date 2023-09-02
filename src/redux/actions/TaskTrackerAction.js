import { TASK_TRACKER } from "../types";

export const taskTrackerStateAction = (params) => ({
	type: TASK_TRACKER,
	payload: params,
});
