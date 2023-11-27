import { take, actionChannel, put, call, fork } from 'redux-saga/effects';
import { enqueueItem, markItemAsError, markItemAsSuccess} from '../reducers/slices/processingQueueSlice';
// import { getSplittedExcelDataNew } from '../../services/pythonScriptsShell';
import { addHeaderMatching } from '../reducers/slices/initialHeaderSlice';
import { addFile } from '../reducers/slices/filesSlice';
import { addTable } from '../reducers/slices/tablesSlice';
import { addTableData } from '../reducers/slices/selectedItemsSlice';
import { measurementUnitsForm } from '../../data/measurementUnits';

function* processQueueItemSaga(item) {
	try {
		const { tableData, initialHeader } = yield call(window.pythonAPI.getExcelData, item.filePath, item.sheetName);

		for (const key in initialHeader) {
			if (initialHeader.hasOwnProperty(key)) {
				const headerValue = initialHeader[key];
				yield put(addHeaderMatching({
					tableId: item.id,
					headerValue,
					colNumber: key,
				}));
			}
		}

		yield put(addFile({
			fileName: item.title,
			fileInfo: { [item.sheetName]: item.id },
		}));

		yield put(addTable({
			tableId: item.id,
			tableBody: tableData.data,
			initialHeader,
		}));

		yield put(addTableData({
			tableId: item.id,
			rowsDict: tableData.rowSelectors,
			colsArray: tableData.colSelectors,
			unitsForm: measurementUnitsForm
		}));

		yield put(markItemAsSuccess({ id: item.id }));

	} catch (error) {
		console.error('Error processing item:', error);
		yield put(markItemAsError({ id: item.id }));
	}
}

function* workerSaga(queueChannel) {
	while (true) {
		const { payload } = yield take(queueChannel);
		yield call(processQueueItemSaga, payload);
	}
}

export function* watchEnqueueItem() {
	const queueChannel = yield actionChannel(enqueueItem.type);

	const numWorkers = 6;
	for (let i = 0; i < numWorkers; i++) {
		yield fork(workerSaga, queueChannel);
	}
}