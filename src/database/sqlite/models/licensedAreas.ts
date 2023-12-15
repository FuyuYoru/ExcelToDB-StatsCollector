import { DataTypes, Model } from "sequelize";
import { sequelize } from '../database'

class LicensedAreas extends Model {
	public id: number;
	public licenseNumber: string;
	public fieldName: string;
}


LicensedAreas.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	licenseNumber: {
		type: DataTypes.STRING(128),
		allowNull: false
	},
	fieldName: {
		type: DataTypes.STRING(128),
		allowNull: false
	},
}, {
	modelName: 'licensedAreas',
	sequelize,
})

export default LicensedAreas;