import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
	name: 'selectedData',
	initialState: {},
	reducers: {
		addData: (state, action) => {
			const { tableId, rows, cols} = action.payload;
			state[fileId] = data;
		},
	},
});

export const { addFileData } = dataSlice.actions;
export default dataSlice.reducer;