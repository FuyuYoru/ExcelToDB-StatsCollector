const Database = require('better-sqlite3');

class DatabaseService {
	constructor(databasePath) {
		this.db = new Database(databasePath, { fileMustExist: true });
	}
	getQuery(sqlQuery, params) {
		try {
			const statement = this.db.prepare(sqlQuery);
			const result = params ? statement.all(params) : statement.all();
			return {
				status: 'success',
				result: result
			};
		} catch (error) {
			return {
				status: 'error',
				message: error.message
			}
		}
	}
	sendQuery(sqlQuery, params) {
		try {
			const statement = this.db.prepare(sqlQuery);
			const result = params ? statement.run(params) : statement.run();
			return {
				status: 'success',
				result: result.lastInsertRowid
			};
		} catch (error) {
			return {
				status: 'error',
				message: error.message
			}
		}
	}

}

module.exports = DatabaseService;