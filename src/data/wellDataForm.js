export const wellForm = {
	'areaLicense': null,
	'field': null,
	'layer': null,
	'operObject': null,
	'operMethod': null,
	'wellNum': null,
	'wellCluster': null,
	'date': null,
	'wellType': null,
	'wellCharacter':null,
}

export const identificationFields = {
	'areaLicense': "Лицензионный участок",
	'field': 'Название месторождения',
	'layer': 'Пласт',
	'operObject': 'Эксплуатационный объект',
	'operMethod': 'Способ эксплуатации',
	'wellNum': 'Номер скважины',
	'wellCluster': 'Кустовая площадка',
	'date': 'Дата',
	'wellType': 'Тип скважины',
	'wellCharacter': 'Характер скважины'
}


const wellType = [
	{ value: 'vertical', label: 'ННС' },
	{ value: 'horizontal', label: 'ГС' },
]

const character = [
	{value: 'oilProdType', label: 'Добывающая нефтяная' },
	{value: 'gasProdType', label: 'Добывающая газовая' },
	{value: 'waterInjectType', label: 'ППД' },
]