import React, { useState } from "react";
import styles from './slider.module.css';

export const Slider = ({ values, onValueChange }) => {
	const [currentValue, setCurrentValue] = useState(values[0]);
	const maxElementsNumber = 5;

	const valueIndex = values.findIndex(element => element === currentValue);

	const startIndex = Math.max(0, valueIndex - Math.floor(maxElementsNumber / 2));
	const endIndex = Math.min(values.length, startIndex + maxElementsNumber);

	const handlePrev = () => {
		const index = Math.max(0, valueIndex - 1)
		setCurrentValue(values[index]);
	};

	const handleNext = () => {
		const index = Math.min(values.length - 1, valueIndex + 1)
		setCurrentValue(values[index]);
	};

	const handleChange = (value) => {
		setCurrentValue(value);
		if (onValueChange) {
			onValueChange(value)
		}
	}

	return (
		<div className={styles.sliderContainer}>
			<ul className={styles.sliderList}>
				<li className={styles.sliderToggler} onClick={handlePrev}>←</li>
				{values.slice(startIndex, endIndex).map((arrayValue, arrayIndex) => (
					<li
						className={arrayValue == currentValue ? styles.sliderItem_selected : styles.sliderItem}
						key={arrayIndex}
						onClick={() => handleChange(arrayValue)}
					>
						{arrayValue}
					</li>
				))}
				<li className={styles.sliderToggler} onClick={handleNext}>→</li>
			</ul>
		</div>
	)
}