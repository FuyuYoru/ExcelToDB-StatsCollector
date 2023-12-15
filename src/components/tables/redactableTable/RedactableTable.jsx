import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { identificationFields } from "../../../data/wellDataForm.js";
import { getMarkedData, getCollectedData } from "../../../redux-store/selectors/tableDataSelectors.js";
import CollapsibleTableRow from "./CollapsibleTableRow.jsx";
import { addWellData, editWellData } from "../../../redux-store/reducers/slices/collectedDataSlice.js";
import { createRangeArray } from "../../../utils/createRangeArray.js";
import styles from './redactableField/RedactableField.module.css'
import { parameters } from "../../../data/parameters.js";
import findSimilarity from "../../../utils/getObjectItem.js";

function splitArray(array, arrayLength) {
	const result = [];
	while (array.length) {
		result.push(array.splice(0, arrayLength))
	}
	return result;
}

export const RedactableTable = ({ tableName }) => {
	const dispatch = useDispatch()
	const data = useSelector((state) => getCollectedData(state, tableName));
	const selectedData = useSelector((state) => getMarkedData(state, tableName));

	useEffect(() => {
		if (data === null) {
			updateStorage();
		}
	}, [data, selectedData, tableName]);

	function updateStorage() {
		Object.keys(selectedData).forEach((value) => {
			dispatch(addWellData({
				tableId: tableName,
				dataId: value,
				data: selectedData[value],
			}))
		})
	}

	const handleSendData = () => {
		if (!data && !Object.keys(data).length > 0){
			return;
		}
		Object.values(data).map((value) => {
			window.sqlite.tryAddWell(value);
		})
	}

	const [isSelection, setIsSelection] = useState({
		state: false,
		colNumber: null,
		rowStart: null,
		forDispatch: [],
		forHighlighting: [],
		dispatchValue: null,
	})

	const ChangeStorageItem = (dataId, dataField, value) => {
		dispatch(editWellData({
			tableId: tableName,
			dataId: dataId,
			field: dataField,
			value: value
		}))
	}

	const handleMouseMove = (event, colNumber, rowNumber) => {
		if (!isSelection.state || colNumber !== isSelection.colNumber) {
			return;
		}
		const minIndex = Math.min(isSelection.rowStart, rowNumber)
		const maxIndex = Math.max(isSelection.rowStart, rowNumber)
		const tmpArray = createRangeArray(minIndex, maxIndex, 1);
		setIsSelection({
			...isSelection,
			forDispatch: tmpArray
		});
		Array.from(isSelection.forHighlighting).map((element, index) => {
			if (isSelection.forDispatch.includes(index)) {
				element.classList.add(styles.selectedItem)
			} else {
				element.classList.remove(styles.selectedItem);
			}
		})
	};

	const handleStartHighlighting = (colNumber, rowNumber, value) => {
		const elements = document.querySelectorAll(`.${styles.redactableField}[data-colnumber="${colNumber}"]`);
		setIsSelection({
			state: true,
			colNumber: colNumber,
			rowStart: rowNumber,
			forDispatch: [rowNumber],
			forHighlighting: elements,
			dispatchValue: value
		});
	};

	const handleStopHighlighting = () => {
		const tempKeysArray = Object.keys(data);
		const elements = document.querySelectorAll(`.${styles.selectedItem}`);
		elements.forEach((element) => {
			element.classList.remove(styles.selectedItem);
		});
		isSelection.forDispatch.forEach(value => {
			const field = Object.keys(data[tempKeysArray[value]])[isSelection.colNumber]
			ChangeStorageItem(tempKeysArray[value], field, isSelection.dispatchValue)
		})
		setIsSelection({
			state: false,
			colNumber: null,
			rowStart: null,
			forDispatch: [],
			dispatchValue: null,
		})
	}

	return (data && Object.keys(data).length > 0 ?
		<>
			<button onClick={updateStorage}>Update Storage</button>
			<table>
				<thead>
					<tr>
						<th></th>
						{Object.keys(identificationFields).map((value, index) => {
							return <th key={index} value={value}>
								{identificationFields[value]}
							</th>
						})}
					</tr>
				</thead>
				<tbody onMouseUp={isSelection.state ? handleStopHighlighting : null}>
					{
						Object.keys(data).map((item, rowNumber) => {
							const visibleData = Object.keys(data[item])
								.filter(key => Object.prototype.hasOwnProperty.call(identificationFields, key))
								.map((value) => ({ value: value, label: data[item][value] }));
							const collapsibleData = Object.keys(data[item])
								.filter(key => !Object.prototype.hasOwnProperty.call(identificationFields, key))
								.map((value) => data[item][value]);

							const collapsibleDataHeaders = Object.keys(data[item])
								.filter(key => !Object.prototype.hasOwnProperty.call(identificationFields, key))
								.map((value) => findSimilarity(value, parameters).label)

							return (<CollapsibleTableRow
								key={rowNumber}
								visibleData={visibleData}
								collapsibleData={splitArray(collapsibleData, visibleData.length)}
								collapsibleDataHeaders={splitArray(collapsibleDataHeaders, visibleData.length)}
								onChange={(dataField, value) => ChangeStorageItem(item, dataField, value)}
								onHighlighting={(event, colNumber) => handleMouseMove(event, colNumber, rowNumber)}
								handleStartHighlighting={(colNumber, value) => handleStartHighlighting(colNumber, rowNumber, value)}

							/>);
						})
					}
				</tbody>
			</table>
			<div className="buttonsContainer">
				<button onClick={handleSendData}>Отправить</button>
			</div>
		</>
		:
		<p>No data selected</p>);
}