import React, { useState } from "react";
import styles from './redactableField/RedactableField.module.css'
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineEdit, MdHighlightAlt } from "react-icons/md";
import { ModalTextInput } from "../../modal/inputField/ModalTextInput.jsx";
import { ModalTableSelect } from "../../modal/tableSelect/modalTableSelect.jsx";
import { createPortal } from "react-dom";
import { DefaultTable } from "../DefaultTable.jsx";
import { wellType, character } from "../../../data/parameters.js";

const selectOptions = {
	'wellType': wellType,
	'wellCharacter': character,
}

export default function TableRow
	({ visibleData, collapsibleData, collapsibleDataHeaders, onChange, onHighlighting, handleStartHighlighting }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const [modalInput, setModalInput] = useState({
		status: false,
		type: null,
		coordX: null,
		coordY: null,
		onChange: null,
	})

	function openModal(event, dataField, type, optionsSelector) {
		const coordX = (event.screenX / window.innerWidth) > 0.8 ? window.innerWidth - 300 : event.screenX;
		const options = optionsSelector ? optionsSelector(dataField) : selectOptions;

		setModalInput({
			status: true,
			options,
			type,
			coordX,
			coordY: event.clientY,
			onChange: onChange && ((newValue) => onChange(dataField, optionsSelector ? newValue.label : newValue)),
		});
	}

	function openModalInput(event, dataField, type) {
		openModal(event, dataField, type, null);
	}

	function openModalSelect(event, dataField, type) {
		openModal(event, dataField, type, (dataField) => selectOptions[dataField]);
	}

	function closeModalInput() {
		setModalInput({
			status: false,
			coordX: null,
			coordY: null,
			onChange: null,
		});
	}
	return (
		<>
			<tr>
				<td onClick={handleToggle}>
					<span >
						<IoIosArrowForward style={!isOpen ?
							{ transform: 'rotate(0deg)', transition: 'transform 0.3s ease-out' }
							: { transform: 'rotate(90deg)', transition: 'transform 0.3s ease-out' }
						} />
					</span>
				</td>
				{visibleData.map((item, colNumber) =>
					<td
						className={styles.redactableField}
						key={colNumber}
						onMouseMove={(event) => onHighlighting(event, colNumber)}
						data-colnumber={colNumber}>
						<div className={styles.resizableText}>
							{item.label}
						</div>
						<div className={styles.icons}>
							<span className={styles.editIcon} onClick={
								!['wellType', 'wellCharacter'].includes(item.value) ?
									(e) => openModalInput(e, item.value, 'input')
									:
									(e) => openModalSelect(e, item.value, 'modal')
							}>
								<MdOutlineEdit />
							</span>
							<span className={styles.highlightIcon} onMouseDown={() => handleStartHighlighting(colNumber, item.label)}>
								<MdHighlightAlt />
							</span>
						</div>
					</td>)}
			</tr>
			<tr style={isOpen ? { display: 'table-row' } : { display: 'none' }}>
				<td colSpan={visibleData.length}>
					<div>
						{collapsibleDataHeaders.map((val, sliceIndex) => (
							<DefaultTable
								key={sliceIndex}
								header={collapsibleDataHeaders[sliceIndex]}
								data={collapsibleData[sliceIndex]}
							/>
						))}
					</div>
				</td>
			</tr>
			{modalInput.status && createPortal(
				modalInput.type === 'input' ? <ModalTextInput
					onChange={modalInput.onChange}
					onClose={closeModalInput}
					posX={modalInput.coordX}
					posY={modalInput.coordY}
				/>
					: <ModalTableSelect
						options={modalInput.options}
						disabledOptions={[]}
						onChange={modalInput.onChange}
						onClose={closeModalInput}
						posX={modalInput.coordX}
						posY={modalInput.coordY}
					/>
				, document.body)}
		</>
	)
}
