export default function findSimilarity(searchValue, values) {
	if (Array.isArray(values)) {
		const result = values.find((item) => item.value === searchValue);
		if (result) {
			return result
		}
	} else if (typeof values === 'object') {
		const items = Object.keys(values);
		for (const item of items) {
			const result = findSimilarity(searchValue, values[item])
			if (result) {
				return result;
			};
		}
	}
}