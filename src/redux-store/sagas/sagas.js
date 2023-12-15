import { all } from "redux-saga/effects";
import { watchEnqueueItem } from "./processingQueueSaga";
import { watchSelectChange } from "./processingSelectChange";

export default function* rootSaga() {
	yield all([
		watchEnqueueItem(),
		watchSelectChange(),
	])
}