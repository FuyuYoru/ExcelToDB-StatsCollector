import Store from 'electron-store';

class DataStore extends Store {
	constructor(settings) {
		super(settings);

		this.files = this.get('files') || [];
	}

	saveFiles() {
		this.set('files', this.files);
	}

	addFile(key, data) {
		const newFile = { key, data };
		this.files.push(newFile);
		this.saveFiles();
	}

	getFileByKey(key) {
		return this.files.find(file => file.key === key);
	}

	getAllFiles() {

		this.files = this.get('files') || [];
		return this.files;
	}
}

export default DataStore;