import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

const selectedItemsSlice = createSlice({
	name: 'selectedItems',
	initialState,
	reducers: {
		addTableData: (state, action) => {
			const { tableId, rowsDict, colsArray, unitsForm } = action.payload;
			state[tableId] = {
				selectedRows: rowsDict,
				selectedCols: colsArray,
				selectedUnits: unitsForm
			};
		},
		updateSelectedRows: (state, action) => {
			const { tableId, block, rows } = action.payload;
			state[tableId].selectedRows[block] = rows;
		},
		updateColsValue: (state, action) => {
			const { tableId, colNumber, value } = action.payload;
			state[tableId].selectedCols[colNumber] = value;
		},
		updateMeasurementUnits: (state, action) => {
			const { tableId, field, measurementUnits } = action.payload;
			state[tableId].selectedUnits[field] = measurementUnits
		}
	}
})

export const { addTableData, updateSelectedRows, updateColsValue, updateMeasurementUnits } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;