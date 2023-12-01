
export default class LicensedAreas {
	constructor(DatabaseService) {
		this.dbService = DatabaseService;
	}
	getAllAreas() {
		const sqlQuery = 'SELECT * FROM licensedAreas';
		return this.dbService.getQuery(sqlQuery);
	}
	getArea(licenseNum, field) {
		const sqlQuery = `SELECT * FROM LicensedAreas
			WHERE licenseNumber = ? AND fieldName = ?;`;
		const params = [licenseNum, field];
		return this.dbService.getQuery(sqlQuery, params);
	}
	// addArea(licenseNumber, fieldName, fieldID) {
	// 	const sqlQuery = 'INSERT INTO LicensedAreas (licenseNumber, fieldName, fieldID) VALUE (?, ?, ?)';
	// 	try {
	// 		const result = this.dbService.sendQuery(sqlQuery, [licenseNumber, fieldName, fieldID])
	// 		return result;
	// 	} catch (error) {
	// 		throw error
	// 	}
	// }
	addArea(licenseNum, field) {
		const sqlQuery = 'INSERT INTO LicensedAreas (licenseNumber, fieldName) VALUES (?, ?)';
		const params = [licenseNum, field];
		try {
			const result = this.dbService.sendQuery(sqlQuery, params)
			return result;
		} catch (error) {
			throw error
		}
	}
}