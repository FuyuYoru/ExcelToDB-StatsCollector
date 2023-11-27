// FOR TEST
const reservParams = {
	anisotrophy: 0.1, // Анизотропия
	botPress: 15 * (10**6), // Забойное давление
	depth: 2200, // для deltaP -- H
	dense: 10, // h, для deltaP -- L
	density: 1100, // плотность 
	prodLateral: 14.2, // k
	prodVert: 7.1, // k
	powerRad: 250, // радиус контура l
	visc: 1.3, // вязкость 
	wellRad: 0.1, // Радиус скважины rc
	wellLen: 15, // длина ствола L
	vertAngle: 30, // Угол от вертикали alpha
	trunkAngle: 50 // угол между стволами tetta
}

const array = createRangeArray(0,180,16);
const angles = {}

function createRangeArray (min, max, count) {
	const 
		result = [],
		step = (max - min)/count;

	for (let i = min; i <= max; i+= step) {
		result.push(i);
	}
	return result;
}

function getReservPress ( params ) {
	const plastPressure = params.density * 9.81 * (params.depth + (params.dense/2) * Math.sin(params.vertAngle));
	return plastPressure;
}

function ellipse ( params ) {
	const highRad = params.wellLen + 2 * params.dense;
	const lowRad = 2* params.wellLen * params.dense + 4 * (params.dense**2);
	const coefA = (highRad * params.anisotrophy * params.dense) / (2 * lowRad);
	const coefB = Math.sin(params.trunkAngle) / (2 * params.wellRad);

	return {
		highRad,
		lowRad,
		coefA,
		coefB
	};
}

function fluidFlow ( params ) {
	const p = params;
	const reservPress = getReservPress(params);
	const deltaPress = reservPress - params.botPress;
	
	const ellipsProps = ellipse(params);

	const comp_1_1 = (4 * params.prodLateral * params.wellLen * deltaPress)/ params.visc;
	const comp_1_2 = Math.cos(1 - ellipsProps.coefA**2)**(-1) / (Math.log(((p.anisotrophy*p.dense)/(2*p.wellRad))*(ellipsProps.coefA**(-1))));
	const comp_1_3 = (2*p.dense/ellipsProps.lowRad) * (Math.cos(ellipsProps.coefA)**(-1)/(Math.log(((p.anisotrophy*p.dense)/(2*p.wellRad)))));
	const comp_2_1 = (2 * p.prodLateral * (p.dense**3) * deltaPress * Math.exp(ellipsProps.coefB))/(ellipsProps.highRad * p.visc * (p.powerRad**2));
	const comp_2_2 = (p.dense/(2*p.powerRad)) * (1/ Math.log((ellipsProps.coefB * p.wellRad)/p.powerRad));

	const result = comp_1_1 * (comp_1_2 + comp_1_3) + comp_2_1 * comp_2_2;
	return result;
}

