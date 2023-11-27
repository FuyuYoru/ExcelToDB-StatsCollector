import React from "react";

export const DefaultTable = ({ header, data }) => {

	return (
		<table>
			<thead>
				<tr>
					{header.map((value, colNumber) =>
						<th key={`col ${colNumber}`}>
							{value}
						</th>)}
				</tr>
			</thead>
			<tbody>
				<tr>
					{data.map((value, colNumber) =>
						<td key={`col ${colNumber}`}>
							{value}
						</td>)}
				</tr>
			</tbody>
		</table>
	)
}