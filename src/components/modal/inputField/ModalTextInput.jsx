import React, { useState } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import styles from './ModalTextInput.module.css'
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

export const ModalTextInput = ({ onChange, posX, posY, onClose }) => {
	const [editableValue, setEditableValue] = useState('');

	const handleChangeClick = (editableValue) => {
		if (editableValue) {
			onChange(editableValue);
		} else {
			setEditableValue('');
		}
		onClose()
	};

	const handleInputChange = (e) => {
		setEditableValue(e.target.value);
	};
	const ref = useOutsideClick(() => {
		onClose()
	})

	return (
		<div className={styles.modalContainer} style={{ left: posX, top: posY }} ref={ref} >
			<input
				type="text"
				// value={editableValue}
				placeholder="Введите значение"
				onChange={handleInputChange}
			/>
			<div className={styles.inputContainer}>
				<button onClick={() => handleChangeClick(editableValue)}><IoMdCheckmark /></button>
				<button onClick={() => handleChangeClick()}><IoMdClose /></button>
			</div>
		</div>
	)
}