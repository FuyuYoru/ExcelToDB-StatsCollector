
export default class LicensedAreas {
	constructor(DatabaseService) {
		this.dbService = DatabaseService;
	}
	getAllAreas() {
		const sqlQuery = 'SELECT * FROM licensedAreas';
		return this.databaseService.query(sqlQuery);
	}
	addArea(licenseNumber, fieldName, fieldID) {
		const sqlQuery = 'INSERT INTO licensedAreas (licenseNumber, fieldName, fieldID) VALUE (?, ?, ?)';
		try {
			const result = this.dbService.query(sqlQuery, [licenseNumber, fieldName, fieldID])
			return result;
		} catch (error) {
			throw error
		}
	}
}