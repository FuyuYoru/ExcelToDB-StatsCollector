export const dimensions = {
	'None': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'field': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'layer': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'operObject': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'operMethod': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'wellNum': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'wellCluster': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'date': [{ value: 'nonDimension', label: 'Безразмерное' }],
	'colDiameter': [{ value: 'millimeters', label: 'Миллиметры' }],
	'directDiameter': [{ value: 'millimeters', label: 'Миллиметры' }],
	'conductDiameter': [{ value: 'millimeters', label: 'Миллиметры' }],
	'holeDepth': [{ value: 'meters', label: 'Метры' }],
	'colDepth': [{ value: 'meters', label: 'Метры' }],
	'condDepth': [{ value: 'meters', label: 'Метры' }],
	'directDepth': [{ value: 'meters', label: 'Метры' }],
	'reservPress': [
		{ value: 'pascal', label: 'Паскали' },
		{ value: 'megaPascal', label: 'МПа' },
		{ value: 'atmosphere', label: 'Атмосферы' },
		{ value: 'bars', label: 'Бары' },
	],
	'character': [{ value: 'nonDimension', label: 'Безразмерное' }],
};

const pressure = [
	{ value: 'pascal', label: 'Паскали', coef: 1 },
	{ value: 'megaPascal', label: 'МПа', coef: 1 },
	{ value: 'atmosphere', label: 'Атмосферы', coef: 1 },
	{ value: 'bars', label: 'Бары', coef: 1 },
]

const diameter = [{ value: 'millimeters', label: 'Миллиметры', coef: 1 }];

const depth = [{ value: 'meters', label: 'Метры', coef: 1 }]