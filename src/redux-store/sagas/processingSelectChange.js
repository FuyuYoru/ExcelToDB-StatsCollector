import { takeEvery, select, put } from "redux-saga/effects";
import { updateColsValue, updateMeasurementUnits } from "../reducers/slices/selectedItemsSlice";
import { getSimilarHeaders } from "../selectors/similarHeaderSelector";

function* processUpdateParamValue(action) {
	if (action.source === 'saga') {
		return;
	}

	const { tableId, colNumber, value } = action.payload;
	const similarHeaders = yield select(state => getSimilarHeaders(state, { tableId, colNumber }));
	if (similarHeaders.length === 0) {
		return;
	}

	for (const element of similarHeaders) {
		const [[tableId, colNumber]] = Object.entries(element);
		const payload = {
			tableId: tableId,
			colNumber: parseInt(colNumber) - 1,
			value: value,
		}
		yield put({ type: updateColsValue.type, payload: payload, source: 'saga' });
	}
}

function* processUpdateUnitsValue(action) {
	if (action.source === 'saga') {
		return;
	}

	const { tableId, field, measurementUnits, forSaga } = action.payload;
	const similarHeaders = yield select(state => getSimilarHeaders(state, { tableId, colNumber: forSaga }));
	if (similarHeaders.length === 0) {
		return;
	}

	for (const element of similarHeaders) {
		const [[tableId, colNumber]] = Object.entries(element);
		const payload = {
			tableId: tableId,
			field: field,
			measurementUnits: measurementUnits,
		}
		yield put({ type: updateMeasurementUnits.type, payload: payload, source: 'saga' });
	}
}


export function* watchSelectChange() {
	yield takeEvery(updateColsValue.type, processUpdateParamValue)
	yield takeEvery(updateMeasurementUnits.type, processUpdateUnitsValue)
}