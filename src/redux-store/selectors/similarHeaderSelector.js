import { createSelector } from "@reduxjs/toolkit";

const selectInitialHeaders = (state) => state.initialHeaders;
const selectTableId = (_, {tableId}) => tableId;
const selectColNumber = (_, {colNumber}) => colNumber;

export const getSimilarHeaders = createSelector(
	[selectInitialHeaders,
		selectTableId,
		selectColNumber],
	(initialHeaders, tableId, colNumber) => {
		const headerKey = Object.keys(initialHeaders).find(key => initialHeaders[key][tableId] == (colNumber + 1));
		const result = headerKey ?
			Object.keys(initialHeaders[headerKey])
				.filter(key => key !== tableId)
				.map(key => ({ [key]: initialHeaders[headerKey][key] }))
			: [];
		return result
	}
)