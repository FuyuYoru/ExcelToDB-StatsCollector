import LicensedAreas from "../models/licensedAreas";

interface IAreasService {
	finrOrCreateArea(licenseNumber: string, fieldName: string): Promise<number>;
}

class AreasService implements IAreasService {
	async finrOrCreateArea(licenseNumber: string, fieldName: string): Promise<number> {
		let area = await LicensedAreas.findOne({ where: { licenseNumber: licenseNumber, fieldName: fieldName } });

		if (!area) {
			area = await LicensedAreas.create({ licenseNumber: licenseNumber, fieldName: fieldName })
		}

		return area.id;
	}
}

export default AreasService;