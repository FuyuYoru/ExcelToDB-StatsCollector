const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getExcelSheetnames, getExcelData } = require('./services/python/pythonScripts')
// declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

import DatabaseService from './database/database';
import LicensedAreas from './services/sqlite/licensedAreasService';
import Wells from './services/sqlite/wellsService';
const appDir = require('electron').app.getAppPath();
const dbPath = path.join(appDir, './src/database/forTest.db');
const dbService = new DatabaseService(dbPath)
const licensedAreas = new LicensedAreas(dbService);
const wells = new Wells(dbService);


if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: true,
			worldSafeExecuteJavascript: true,
			hardwareAcceleration: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	mainWindow.loadURL(path.resolve(__dirname, './src/renderer.js'));

	// mainWindow.webContents.openDevTools();
	ipcMain.handle('get-excel-sheetnames', async (event, selectedFile) => {
		try {
			const sheetnames = await getExcelSheetnames(JSON.parse(selectedFile));
			return (sheetnames)
		} catch (error) {
			throw error
		}
	});

	ipcMain.handle('get-excel-data', async (event, filepath, sheetname) => {
		try {
			const data = await getExcelData(filepath, sheetname);
			return (data);
		}
		catch (error) {
			throw error
		}
	});

	ipcMain.handle('sqlite:test', async (event, data) => {
		try {
			const testResult = licensedAreas.testMethod(data);
			return testResult
		} catch (error) {
			throw error
		}
	})

	ipcMain.handle('sqlite:getAll', async (event) => {
		try {
			const testResult = licensedAreas.getAllAreas();
			return testResult
		} catch (error) {
			throw error
		}
	})
	ipcMain.handle('sqlite:addWell', async (event, data) => {
		try {
			const { areaLicense, field } = data;
			const request = await licensedAreas.getArea(areaLicense, field);
			if (request.result.length === 0) {
				const areaInsertResult = await licensedAreas.addArea(areaLicense, field);
				const wellInsertResult = await wells.addWell(data, areaInsertResult.result);
				return wellInsertResult;
			} else {
				const licenseAreaID = request.result[0].ID;
				const wellInsertResult = await wells.addWell(data, licenseAreaID);
				return wellInsertResult;
			}
		} catch (error) {
			throw error;
		}
	});

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
