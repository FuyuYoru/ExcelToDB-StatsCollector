const { contextBridge, ipcRenderer } = require('electron');
const { resolve } = require('path-browserify');

contextBridge.exposeInMainWorld('pythonAPI', {
	getSheetnames: (selectedFile) => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get-excel-sheetnames', selectedFile);

			ipcRenderer.once('excel-sheetnames-reply', (event, sheetnames) => {
				resolve(sheetnames);
			});

			ipcRenderer.once('excel-sheetnames-reply', (event, error) => {
				reject(new Error(error));
			});
		});
	},


	getExcelData: (filepath, sheetname) => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get-excel-data', filepath, sheetname);
			ipcRenderer.once('excel-data-reply', (event, data) => {
				resolve(data);
			});

			ipcRenderer.once('excel-data-reply', (event, error) => {
				reject(new Error(error));
			});
		});
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