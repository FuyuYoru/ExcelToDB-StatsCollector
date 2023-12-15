import React, { useState} from 'react';
import { updateSelectedRows, updateColsValue, updateMeasurementUnits } from '../../redux-store/reducers/slices/selectedItemsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { parameters } from '../../data/parameters.js';
import { tableHeadersAndUnits, tableCheckboxes } from '../../redux-store/selectors/tableDataSelectors.js';
import { createPortal } from 'react-dom';
import { ModalTableSelect } from '../modal/tableSelect/modalTableSelect';
import findSimilarity from '../../utils/getObjectItem.js';
import { measurementUnits } from '../../data/measurementUnits.js';

export const TableBody = ({ tableId, bodyName }) => {
	const dispatch = useDispatch();
	const { data, checkboxes } = useSelector((state) => tableCheckboxes(state, tableId, bodyName));
	const { headers, units } = useSelector((state) => tableHeadersAndUnits(state, tableId));

	const handleAllCheckboxesChange = () => {
		const updatedCheckboxes = checkboxes.slice().map((value) => !value);
		dispatch(updateSelectedRows({
			tableId: tableId,
			block: bodyName,
			rows: updatedCheckboxes
		}))
	}

	const handleCheckboxChange = (rowIndex) => {
		const updatedCheckboxes = checkboxes.slice();
		updatedCheckboxes[rowIndex] = !updatedCheckboxes[rowIndex];
		dispatch(updateSelectedRows({
			tableId: tableId,
			block: bodyName,
			rows: updatedCheckboxes
		}))
	};

	const handleParamSelectorChange = (colNumber, option) => {
		dispatch(updateColsValue({
			tableId: tableId,
			colNumber: colNumber,
			value: option.value
		}))
	}

	const handleUnitsSelectorChange = (field,colNumber, option) => {
		dispatch(updateMeasurementUnits({
			tableId: tableId,
			field: field,
			measurementUnits: option,
			forSaga: colNumber
		}))
	}

	const [modalSelect, setModalSelect] = useState({
		status: false,
		coordX: null,
		coordY: null,
		options: parameters,
		disabledOptions: [],
		onChange: null,
	})

	function handleOpenModalSelect(event, options, onChange) {
		const coordX = (event.screenX / window.innerWidth) > 0.8 ? window.innerWidth - 300 : event.screenX
		setModalSelect({
			status: true,
			coordX: coordX,
			coordY: event.clientY,
			options: options,
			disabledOptions: headers,
			onChange: onChange ? (option) => onChange(option) : null,
		})
	}

	function handleCloseModalSelect() {
		setModalSelect({
			status: false,
			coordX: null,
			coordY: null,
			options: [],
			disabledOptions: [],
			onChange: null,
		})
	}

	return data ? (
		<>
			<table>
				<thead style={{ position: 'sticky', top: 0, backgroundColor: 'black' }}>
					<tr>
						<th>Параметр</th>
						{data && data.length > 0 && data[0].map((columnData, columnIndex) => (
							<th key={'head' + columnIndex}>
								<span
									onClick={(e) =>
										handleOpenModalSelect(
											e,
											parameters,
											(option) => handleParamSelectorChange(columnIndex, option)
										)}>
									{findSimilarity(headers[columnIndex], parameters).label}
								</span>
							</th>
						))}
					</tr>
					<tr>
						<th>Единицы измерения</th>
						{data && data.length > 0 && data[0].map((columnData, columnIndex) => (
							<th key={'head' + columnIndex}>
								<span
									onClick={
										measurementUnits[headers[columnIndex]] && measurementUnits[headers[columnIndex]].length > 1 ?
											(e) =>
												handleOpenModalSelect(
													e,
													// initHead[columnIndex + 1],
													measurementUnits[headers[columnIndex]],
													(option) => handleUnitsSelectorChange(headers[columnIndex], columnIndex, option)
												)
											: null
									}>
									{units[headers[columnIndex]] ? units[headers[columnIndex]].label : "Безразмерное"}
								</span>
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					<tr>
						<td colSpan={data.length} onClick={handleAllCheckboxesChange} style={{ textAlign: 'left' }}>
							Переключить все
						</td>
					</tr>
					{data && data.length > 0 && data.map((rowData, rowIndex) => (
						<tr key={'row' + rowIndex} onClick={() => handleCheckboxChange(rowIndex)}>
							<td>
								<input
									type='checkbox'
									checked={checkboxes[rowIndex]}
									onChange={() => handleCheckboxChange(rowIndex)}
								/>
							</td>
							{rowData.map((cellData, cellIndex) => (
								<td key={cellIndex}>{cellData}</td>
							))}
						</tr>
					))}
				</tbody>
			</table >
			{modalSelect.status && createPortal(
				<ModalTableSelect
					options={modalSelect.options}
					disabledOptions={modalSelect.disabledOptions}
					onChange={modalSelect.onChange}
					onClose={handleCloseModalSelect}
					posX={modalSelect.coordX}
					posY={modalSelect.coordY}
				/>, document.body)}
		</>
	) : null;
}
