import { createSlice } from "@reduxjs/toolkit"

const initialState = {
}

const tableSlice = createSlice({
	name: 'tableSlice',
	initialState,
	reducers: {
		addTable: (state, action) => {
			const { tableId, tableBody, initialHeader, fileType} = action.payload;
			state[tableId] = {
				body: tableBody,
				initialHeader: initialHeader,
				fileType: fileType
			};
		},
	}
})

export const {addTable} = tableSlice.actions;
export default tableSlice.reducer;