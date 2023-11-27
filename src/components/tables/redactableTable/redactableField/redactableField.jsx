import React, { useState } from "react";
import styles from '../styles/RedactableField.module.css'
import { MdOutlineEdit, MdHighlightAlt } from "react-icons/md";

export const RedactableField = ({ data, onFieldChange, handleStartHighlighting }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editableValue, setEditableValue] = useState(data ? data : '');

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleChangeClick = (editableValue) => {
		setIsEditing(false);
		if (editableValue) {
			onFieldChange(editableValue);
		} else {
			setEditableValue(data);
		}
	};

	const handleInputChange = (e) => {
		setEditableValue(e.target.value);
	};

	function startHighlighting(data) {
		// document.querySelectorAll(styles.redactableFieldParent)
		console.log(document.querySelectorAll(styles.redactableFieldParent))
		handleStartHighlighting(data)
	}

	return (
		<div className={styles.redactableField}>
			{isEditing ? (
				<div className={styles.resizableText}>
					<input
						type="text"
						value={editableValue}
						onChange={handleInputChange}
					/>
					<div className={styles.inputContainer}>
						<button onClick={() => handleChangeClick(editableValue)}>✅</button>
						<button onClick={() => handleChangeClick()}>❌</button>
					</div>
				</div>
			) : (
				<>
					<div className={styles.resizableText}>
						{data}
					</div>
					<div className={styles.icons}>
						<span className={styles.editIcon} onClick={handleEditClick}>
							<MdOutlineEdit />
						</span>
						<span className={styles.highlightIcon} onMouseDown={() => handleStartHighlighting(data)}>
							<MdHighlightAlt/>
							</span>
					</div>
				</>
			)}
		</div>
	);
};