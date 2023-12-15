import React, { ChangeEvent, useState } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import styles from './ModalTextInput.module.css'
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

export interface IModalTextInput {
	onChange(value: string): void;
	posX: number;
	posY: number;
	onClose(): void;
}

export const ModalTextInput = ({ onChange, posX, posY, onClose }: IModalTextInput) => {
	const [editableValue, setEditableValue] = useState('');

	const handleChangeClick = (editableValue?: string) => {
		if (editableValue) {
			onChange(editableValue);
		} else {
			setEditableValue('');
		}
		onClose()
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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