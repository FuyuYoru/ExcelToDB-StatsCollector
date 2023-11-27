const Database = require('better-sqlite3');

class DatabaseService {
	constructor(databasePath) {
		this.db = new Database(databasePath, { fileMustExist: true });
	}
	query(sqlQuery, params) {
		try {
			const statement = this.db.prepare(sqlQuery);
			const result = statement.all(params);
			return result;
		} catch (error) {
			throw error
		}
	}
}

module.exports = DatabaseService;