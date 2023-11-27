import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	queue: [],
	successQueue: [],
	errorQueue: [],
}

const processingQueueSlice = createSlice({
	name: 'processingQueue',
	initialState,
	reducers: {
		enqueueItem: (state, action) => {
			state.queue.push(action.payload)
		},
		markItemAsSuccess: (state, action) => {
			const itemId = action.payload.id
			const index = state.queue.findIndex(item => item.id === itemId)
			if (index !== -1) {
				state.successQueue.push(state.queue[index]);
				state.queue.splice(index, 1);
			}
		},
		markItemAsError: (state, action) => {
			const itemId = action.payload.id
			const index = state.queue.findIndex(item => item.id === itemId)
			if (index !== -1) {
				state.errorQueue.push(state.queue[index]);
				state.queue.splice(index, 1);
			}
		},
		clearQueue: (state) => {
			state.queue = [];
			state.successQueue = [];
			state.errorQueue = [];
		}
	}
})

export const {
	enqueueItem,
	dequeueItem,
	markItemAsSuccess,
	markItemAsError,
	clearQueue,
} = processingQueueSlice.actions;

export default processingQueueSlice.reducer;