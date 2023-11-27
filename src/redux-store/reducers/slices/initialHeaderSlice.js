import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const initialHeadersValue = createSlice({
	name: 'initialHeader',
	initialState,
	reducers: {
		addHeaderMatching: (state, action) => {
			const { headerValue, tableId, colNumber } = action.payload;

			if (!state.hasOwnProperty(headerValue)) {
				// Если headerValue отсутствует, создайте новую запись
				state[headerValue] = {};
			}

			// if (!state[headerValue].hasOwnProperty(tableId)) {
			// 	// Если tableId отсутствует, создайте новую запись
			// 	state[headerValue][tableId] = [];
			// }

			state[headerValue][tableId]=colNumber;
		},

	}
})

export const { addHeaderMatching } = initialHeadersValue.actions;
export default initialHeadersValue.reducer;