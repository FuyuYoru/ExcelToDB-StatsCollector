export default function (data, coef) {
	try {
		return data * coef
	} catch {
		return data
	}
}