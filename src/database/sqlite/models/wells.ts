import { DataTypes, Model } from "sequelize";
import { sequelize } from '../database'

class Wells extends Model {
	public id: number;
	public wellNum: string;
	public date: Date;
	public operObject: string;
	public layer: string;
	public wellType: string | null;
	public wellCluster: string;
	public equipmentType: string | null;
	public nozzleDiameter: number | null;
	public pumpTubeDiameter: number | null;
	public pumpTubeDepth: number | null;
	public packer: string | null;
	public packerDepth: number | null;
	public directDiameter: number | null;
	public conductDiameter: number | null;
	public colDiameter: number | null;
	public directDepth: number | null;
	public condDepth: number | null;
	public colDepth: number | null;
	public holeDepth: number | null;
	public perforationInterval: string | null;
	public topBoundary: number | null;
	public bottomBoundary: number | null;
	public wellStart: number | null;
	public workDaysMounth: number | null;
	public oilProd: number | null;
	public waterProd: number | null;
	public condensatProd: number | null;
	public dissGasProd: number | null;
	public freeGasProd: number | null;
	public capGasProd: number | null;
	public injection: number | null;
	public wellCharacter: string | null;
	public areaId: number;
}

Wells.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		wellNum: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		operObject: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		layer: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		wellType: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		wellCluster: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		equipmentType: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		nozzleDiameter: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		pumpTubeDiameter: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		pumpTubeDepth: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		packer: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		packerDepth: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		directDiameter: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		conductDiameter: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		colDiameter: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		directDepth: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		condDepth: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		colDepth: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		holeDepth: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		perforationInterval: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		topBoundary: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		bottomBoundary: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		wellStart: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		workDaysMounth: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		oilProd: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		waterProd: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		condensatProd: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		dissGasProd: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		freeGasProd: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		capGasProd: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		injection: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		wellCharacter: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		areaId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'licensedAreas',
				key: 'id',
			}
		},
	},
	{
		tableName: 'wells',
		sequelize,
	}
)

export default Wells;