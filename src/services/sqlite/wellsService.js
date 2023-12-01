export default class WellsService {
	constructor(DatabaseService) {
		this.dbService = DatabaseService;
	}

	addWell(data, licenseAreaID) {
		const queryData = wellAttributes.reduce((result, attribute) => {
			result[attribute] = data[attribute] !== undefined ? data[attribute] : null;
			return result;
		}, { licenseNumberID: licenseAreaID });

		const sqlQuery = `
			INSERT INTO wells (
				${wellAttributes.join(', ')}, licenseNumberID
			)
			VALUES (
				${wellAttributes.map(attribute => `$${attribute}`).join(', ')}, $licenseNumberID
			)`;

		const result = this.dbService.sendQuery(sqlQuery, queryData);
		return result;
	}
}

const wellAttributes = [
	'wellNum', 'date', 'operObject', 'layer', 'wellType', 'wellCluster', 'equipmentType',
	'nozzleDiameter', 'pumpTubeDiameter', 'pumpTubeDepth', 'packer', 'packerDepth',
	'directDiameter', 'conductDiameter', 'colDiameter', 'directDepth', 'condDepth',
	'colDepth', 'holeDepth', 'perforationInterval', 'topBoundary', 'bottomBoundary',
	'wellStart', 'workDaysMounth', 'oilProd', 'waterProd', 'condensatProd',
	'dissGasProd', 'freeGasProd', 'capGasProd', 'injection', 'wellType', 'wellCharacter'
];
