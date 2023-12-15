// const { PythonShell } = require('python-shell');
import { PythonShell } from 'python-shell';

export const getExcelSheetnames = async (selectedFile) => {
	let options = {
		mode: 'text',
		pythonPath: './venv/Scripts/python',
		pythonOptions: ['-u'],
		scriptPath: './src/services/python',
		args: [selectedFile.path],
	};
	try {
		const result = await PythonShell.run('get_sheetnames.py', options);
		return JSON.parse(result);
	} catch (error) {
		console.error('Python Error:', error.message);
		throw error;
	}
};

export const getExcelData = async (filepath, sheetname) => {
	let options = {
		mode: 'text',
		pythonPath: './venv/Scripts/python',
		pythonOptions: ['-u'],
		scriptPath: './src/services/python',
		args: [filepath, sheetname],
	};
	try {
		const result = await PythonShell.run('get_data_excel.py', options);
		const { table, header } = JSON.parse(result);
		const dataDict = {
			data: {},
			rowSelectors: {},
			colSelectors: []
		};
		let colLength = 0;
		Object.values(table).forEach((value, index) => {
			const parsedValue = JSON.parse(value);
			dataDict.data[`block_${index + 1}`] = parsedValue.data;
			dataDict.rowSelectors[`block_${index + 1}`] = Array(parsedValue.data.length).fill(false);
			colLength = parsedValue.data[0].length;
		});
		dataDict.colSelectors = Array.from({ length: colLength }, () => 'None');
		return { tableData: dataDict, initialHeader: header };

	} catch (error) {
		console.error('Python Error:', error.message);
		throw error;
	}
};