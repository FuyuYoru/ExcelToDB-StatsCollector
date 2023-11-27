import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const collectedDataSlice = createSlice({
	name: 'collectedData',
	initialState,
	reducers: {
		addWellData: (state, action) => {
			const { tableId, dataId, data } = action.payload;
			if (state.hasOwnProperty(tableId)) {
				state[tableId] = { ...state[tableId], [dataId]: data };
			} else { state[tableId] = {[dataId]:data}; }
		}, 
		editWellData : (state, action) => {
			const { tableId, dataId, field, value } = action.payload;
			state[tableId][dataId][field] = value
		}
	}
})

export const { addWellData, editWellData } = collectedDataSlice.actions;
export default collectedDataSlice.reducer;