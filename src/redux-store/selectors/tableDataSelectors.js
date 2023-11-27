import { createSelector } from "@reduxjs/toolkit";
import { wellForm } from "../../data/wellDataForm";

const selectCollectedData = (state) => state.collectedData;
const selectTablesData = (state) => state.tables;
const selectSelectedItems = (state) => state.selectedItems;
const selectTableId = (state, tableId) => tableId;

export const tableCheckboxes = createSelector(
	(state) => state.tables,
	(state) => state.selectedItems,
	(state, tableId, bodyName) => tableId,
	(state, tableId, bodyName) => bodyName,
	(tables, selectedItems, tableId, bodyName) => {
		return {
			data: tables[tableId].body[bodyName],
			checkboxes: selectedItems[tableId].selectedRows[bodyName],
		};
	}
);

export const tableHeadersAndUnits = createSelector(
	(state) => state.selectedItems,
	(state) => state.tables,
	(state, tableId) => tableId,
	(selectedItems, tables, tableId) => {
		return {
			headers: selectedItems[tableId].selectedCols,
			initHead: tables[tableId].initialHeader,
			units: selectedItems[tableId].selectedUnits,
		};
	}
);

export const getCollectedDataKeys = createSelector(
	[selectCollectedData],
	(collectedData) => {
		return Object.keys(collectedData);
	}
)

export const getCollectedData = createSelector(
	[selectCollectedData, selectTableId],
	(collectedData, tableId) => {
		console.log(tableId);
		if (!Object.keys(collectedData).includes(tableId)) {
			return null;
		}
		return collectedData[tableId];
	}
)

function foundSelectedRows(selectedRowsArray) {
	return selectedRowsArray.reduce((result, value, index) => {
		if (value !== false) {
			result.push(index);
		}
		return result;
	}, []);
}

function combineSelectedCols(headerArray, dataArray, measurementUnits) {
	const result = headerArray.reduce((result, item) => {
		if (item.value !== 'None') {
			if (measurementUnits[item.value] && dataArray[item.index]) {
				result[item.value] = dataArray[item.index] * measurementUnits[item.value].coef;
			} else {
				result[item.value] = dataArray[item.index];
			}
		}
		return result;
	}, {});

	return { ...wellForm, ...result };
}



export const getMarkedData = createSelector(
	[selectTablesData, selectSelectedItems, selectTableId],
	(tables, selectedItems, tableId) => {
		const collectedData = {};

		const cols = selectedItems[tableId].selectedCols
			.map((value, index) => ({
				value: value,
				index: index,
			}))
			.filter((col) => col.value !== 'None');

		const tableBodies = Object.keys(tables[tableId].body)
		if (tableBodies.length === 0) {
			return {};
		}
		tableBodies.forEach(key => {
			const data = tables[tableId].body[key];
			const rows = foundSelectedRows(selectedItems[tableId].selectedRows[key]);

			rows.forEach(number => {
				const uid = `_${key}` + `_${number}`;
				const tmpData = combineSelectedCols(cols, data[number], selectedItems[tableId].selectedUnits);


				collectedData[uid] = tmpData
			});
		})

		return collectedData;
	}

)