const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getExcelSheetnames, getExcelData } = require('./services/python/pythonScripts')
import db from './models/dbnmgr';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		webPreferences: {
			// as a best practice + safety, nodeIntegration should be false
			// this keeps the renderer thread having direct access to Node
			contextIsolation: true,
			nodeIntegration: true,
			// will sanitize JS code to be safe
			worldSafeExecuteJavascript: true,
			hardwareAcceleration: false,
			// is a feature that ensures that both your
			// preload scripts and Electron's internal logic tunes in seperate context:
			// contextIsolation: true,
			// preload script exposes the parts needed for renderer from main thread:
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
	ipcMain.on('get-excel-sheetnames', async (event, selectedFile) => {
		try {
			const sheetnames = await getExcelSheetnames(JSON.parse(selectedFile));
			event.sender.send('excel-sheetnames-reply', JSON.stringify(sheetnames));
		} catch (error) {
			console.error('Error processing Excel sheet names:', error);
			event.sender.send('excel-sheetnames-reply', JSON.stringify({ error: error.message }));
		}
	});

	ipcMain.on('get-excel-data', async (event, filepath, sheetname) => {
		try {
			const data = await getExcelData(filepath, sheetname);
			event.sender.send('excel-data-reply', data);
		}
		catch (errot) {
			event.sender.send('excel-data-reply', JSON.stringify({ error: error.message }));
		}
	});

	ipcMain.on('tryDB', async (event) => {
		try {
			const result = db.prepare('SELECT id, "user" FROM users;').get()
			event.sender.send('dbreply', result);
		} catch (error) {
			event.sender.send('dbreply', error.message);
		}
	})
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
