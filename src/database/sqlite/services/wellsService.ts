import Wells from "../models/wells";

interface IWells {
	addRecord(data: Record<string, number | string | null>, licenseNumber: number): Promise<void>;
}

class WellsService implements IWells {
	async addRecord(data: Record<string, string | number | null>, licenseNumber: number): Promise<void> {
		const well = await Wells.create({ ...data, areaId: licenseNumber });
		console.log(well);
	}

}

export default WellsService