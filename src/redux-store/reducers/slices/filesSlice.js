import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
	name: 'files',
	initialState: {
		active: {
			file: null,
			table: null,
			body: null,
		},
	},
	reducers: {
		addFile: (state, action) => {
			const { fileName, fileInfo, fileType} = action.payload;
			if (state.hasOwnProperty(fileName)){
				state[fileName] = {...state[fileName], ...fileInfo, fileType};
			} else {
				state[fileName] = {...fileInfo, fileType};
			}
		},
		setActiveFile: (state, action) => {
			const { activeFile } = action.payload;
			if (state.active.file !== activeFile) {
				state.active.file = activeFile
			};
		},
		setActiveTable: (state, action) => {
			const { activeTable } = action.payload;
			if (state.active.table !== activeTable) {
				state.active.table = activeTable;
			};
		},
		setActiveBody: (state, action) => {
			const { activeBody } = action.payload;
			if (state.active.body !== activeBody) {
				state.active.body = activeBody;
			};
		}
	},
});

export const { addFile, setActiveFile, setActiveTable, setActiveBody } = filesSlice.actions;
export default filesSlice.reducer;