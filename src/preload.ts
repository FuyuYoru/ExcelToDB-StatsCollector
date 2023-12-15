// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
// import { resolve } from 'path-browserify';

contextBridge.exposeInMainWorld('pythonAPI', {
	getSheetnames: async (selectedFile: File) => {
		try {
			const sheetnames = await ipcRenderer.invoke('get-excel-sheetnames', JSON.stringify(selectedFile));
			return sheetnames
		} catch (error) {
			throw new Error(error);
		}
	},

	getExcelData: async (filepath: string, sheetname: string) => {
		try {
			const data = await ipcRenderer.invoke('get-excel-data', filepath, sheetname);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	},
});

contextBridge.exposeInMainWorld('sqlite', {
	tryDB: async (data: Record<string, string>) => {
		const result = await ipcRenderer.invoke('sqlite:test', data);
		return result
	},
})

contextBridge.exposeInMainWorld('tempStorage', {
	trySetter: async (uid, data) => {
		const result = await ipcRenderer.invoke('tempStorage:addData', uid, data)
		console.log(result)
	},
	tryGetter: async (uid) => {
		const result = await ipcRenderer.invoke('tempStorage:getDataById', uid)
		console.log(result)
	}
})