
const pressure = [
	{ value: 'pascal', label: 'Паскаль', coef: 1 },
	{ value: 'megaPascal', label: 'МП', coef: 2 },
	{ value: 'atmosphere', label: 'Атмосфер', coef: 3 },
	{ value: 'bars', label: 'Бар', coef: 4 },
]

const diameter = [{ value: 'millimeters', label: 'Миллиметр', coef: 1 }];

const depth = [{ value: 'meters', label: 'Метр', coef: 1 }]

export const measurementUnits = {
	// date: '',
	// wellStart: '',
	directDiameter: diameter,
	conductDiameter: diameter,
	colDiameter: diameter,
	nozzleDiameter: diameter,
	pumpTubeDiameter: diameter,
	directDepth: depth,
	condDepth: depth,
	colDepth: depth,
	holeDepth: depth,
	// perforationInterval: '',
	topBoundary: depth,
	bottomBoundary: depth,
	pumpTubeDepth: depth,
	packerDepth: depth,
	levelDynam: depth,
	levelStat: depth,
	reservPress: pressure,
	bufferPress: pressure,
	wellBottomPress: pressure,
	wellHeadPress: pressure,
	// oilProd: '',
	// waterProd: '',
	// condensatProd: '',
	// dissGasProd: '',
	// freeGasProd: '',
	// capGasProd: '',
	// injection: '',
};

export const measurementUnitsForm = {
	directDiameter: diameter[0],
	conductDiameter: diameter[0],
	colDiameter: diameter[0],
	nozzleDiameter: diameter[0],
	pumpTubeDiameter: diameter[0],
	directDepth: depth[0],
	condDepth: depth[0],
	colDepth: depth[0],
	holeDepth: depth[0],
	topBoundary: depth[0],
	bottomBoundary: depth[0],
	pumpTubeDepth: depth[0],
	packerDepth: depth[0],
	levelDynam: depth[0],
	levelStat: depth[0],
	reservPress: pressure[0],
	bufferPress: pressure[0],
	wellBottomPress: pressure[0],
	wellHeadPress: pressure[0],
};