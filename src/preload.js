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
	tryDB: () => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('tryDB')
			ipcRenderer.once('dbreply', (event, data) => {
				resolve(data);
			});

			ipcRenderer.once('dbreply', (event, error) => {
				reject(new Error(error));
			});
		})
	}
})