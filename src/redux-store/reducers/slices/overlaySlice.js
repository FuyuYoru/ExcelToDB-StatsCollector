import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	overlayState: false,
	modalType: '',
	modalContent: {
		title: '',
		data: '',
		datapath: '',
	},
	modalAction: null
}

const overlaySlice = createSlice({
	name: 'overlayDisplay',
	initialState,
	reducers: {
		showOverlay: (state, action) => {
      state.overlayState = !state.overlayState;
      state.modalType = action.payload.modalType;
      state.modalContent = action.payload.modalContent;
			state.modalAction = action.payload.modalAction;
    },
		resetOverlay: (state) => {
			state.overlayState = false;
      state.modalType = initialState.modalType;
      state.modalContent = initialState.modalContent;
		}
	},
});

export const {showOverlay, resetOverlay} = overlaySlice.actions;
export default overlaySlice.reducer;