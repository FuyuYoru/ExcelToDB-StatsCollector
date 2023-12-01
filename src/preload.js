const { contextBridge, ipcRenderer } = require('electron');
const { resolve } = require('path-browserify');

contextBridge.exposeInMainWorld('pythonAPI', {
	getSheetnames: async (selectedFile) => {
		try {
			const sheetnames = await ipcRenderer.invoke('get-excel-sheetnames', JSON.stringify(selectedFile));
			return sheetnames
		} catch (error) {
			throw new Error(error);
		}
	},

	getExcelData: async (filepath, sheetname) => {
		try {
			const data = await ipcRenderer.invoke('get-excel-data', filepath, sheetname);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	},
});

contextBridge.exposeInMainWorld('sqlite', {
	tryDB: async (data) => {
		const result = await ipcRenderer.invoke('sqlite:test', data);
		console.log(result)
		return result
	},
	tryGetAll: async () => {
		const result = await ipcRenderer.invoke('sqlite:getAll');
		console.log(result)
		return result
	},
	tryAddWell: async (data) => {
		const result = await ipcRenderer.invoke('sqlite:addWell', data);
		console.log(result)
		return result
	}
}) 