const requiredParams = [
	{ value: 'field', label: 'Название месторождения' },
	{ value: 'layer', label: 'Пласт' },
	{ value: 'operObject', label: 'Эксплуатационный объект' },
	{ value: 'wellNum', label: 'Номер скважины' },
	{ value: 'wellCluster', label: 'Номер куста' },
	{ value: 'date', label: 'Дата' },
];
const wellDesign = [
	{ value: 'None', label: 'Игнорировать' },
	{ value: 'directDiameter', label: 'Диаметр направления' },
	{ value: 'conductDiameter', label: 'Диаметр кондуктора' },
	{ value: 'colDiameter', label: 'Диаметр Э/К' },
	{ value: 'directDepth', label: 'Глубина направления' },
	{ value: 'condDepth', label: 'Глубина кондуктора' },
	{ value: 'colDepth', label: 'Глубина Э/К' },
	{ value: 'holeDepth', label: 'Глубина забоя' },
	{ value: 'perforationInterval', label: 'Интервал перфорации' },
	{ value: 'topBoundary', label: 'Верхняя перфорация' },
	{ value: 'bottomBoundary', label: 'Нижняя перфорация' },
	{ value: 'wellStart', label: 'Ввод в эксплуатацию' },
];
const equipments = [
	{ value: 'equipmentType', label: 'Тип оборудования' },
	{ value: 'nozzleDiameter', label: 'Диаметр штуцера' },
	{ value: 'pumpTubeDiameter', label: 'Диаметр НКТ' },
	{ value: 'pumpTubeDepth', label: 'Глубина НКТ' },
	{ value: 'packer', label: 'Пакер' },
	{ value: 'packerDepth', label: 'Глубина пакера' },

];
const techModeParams = [
	{ value: 'None', label: 'Игнорировать' },
	{ value: 'reservPress', label: 'Пластовое давление' },
	{ value: 'levelDynam', label: 'Ндин' },
	{ value: 'levelStat', label: 'Нст' },
	{ value: 'bufferPress', label: 'Pбуф' },
	{ value: 'wellBottomPress', label: 'Pзаб' },
	{ value: 'wellHeadPress', label: 'Pуст' },
];
const monthlyReport = [
	{ value: 'None', label: 'Игнорировать' },
	{ value: 'workDaysMounth', label: 'Дней работы/месяц' },
	{ value: 'oilProd', label: 'Добыча нефти (тонны)/ месяц' },
	{ value: 'waterProd', label: 'Добыча воды (тонны)/ месяц' },
	{ value: 'condensatProd', label: 'Добыча конденсата (тонны)/ месяц' },
	{ value: 'dissGasProd', label: 'Добыча растворенного газа (тыс.м3)/ месяц' },
	{ value: 'freeGasProd', label: 'Добыча свободного газа (тыс.м3)/ месяц' },
	{ value: 'capGasProd', label: 'Добыча газа ГШ (тыс.м3)/ месяц' },
	{ value: 'injection', label: 'Закачка рабочего агента в пласт (тонны)/ месяц' },
];

export const parameters = {
	'Обязательные параметры': requiredParams,
	'Конструкция скважины': wellDesign,
	'Оборудование': equipments,
	'Технологические параметры': techModeParams,
	'Эксплуатационные параметры': monthlyReport
};

export const wellType = [
	{ value: 'vertical', label: 'ННС' },
	{ value: 'horizontal', label: 'ГС' },
];

export const character = [
	{value: 'oilProdType', label: 'Добывающая нефтяная' },
	{value: 'gasProdType', label: 'Добывающая газовая' },
	{value: 'waterInjectType', label: 'ППД' },
];