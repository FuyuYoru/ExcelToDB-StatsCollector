import React from "react";
import CollapsibleMenu from "../../CollapsibleMenu/collapsibleMenu.jsx";
import styles from './tableSelect.module.css'
import { useOutsideClick } from "../../../hooks/useOutsideClick.js";

function optionIsArray(options) {
	if (Array.isArray(options)) {
		return true;
	} else if (typeof options === 'object') {
		return false;
	}
}

export const ModalTableSelect = ({ options, disabledOptions, onChange, posX, posY, onClose }) => {
	
	const ref = useOutsideClick(() => {
		onClose()
	})

	const handleOptionClick = (option) => {
		if (onChange) {
			onChange(option)
		}
		onClose()
	}

	return (
		<div className={styles.selectContainer} style={{ left: posX, top: posY }} ref={ref}>
			{
				optionIsArray(options) ?
					(
						<ul>
							{options.map((option) => (
								!disabledOptions.includes(option.value) ?
									<li
										key={option.value}
										value={option.value}
										onClick={() => handleOptionClick(option)}
									>{option.label}
									</li>
									:
									<li
										className={styles.select__menu_disabledItem}
										key={option.value}
										value={option.value}
									>{option.label}
									</li>
							))}
						</ul>
					)
					:
					Object.keys(options).map((value, index) => {
						return (
							<CollapsibleMenu btnText={value} key={index} closeOnOutsideClick={true} >
								<ul>
									{options[value].map((option) => (
										!disabledOptions.includes(option.value) ?
											<li
												key={option.value}
												value={option.value}
												onClick={() => handleOptionClick(option)}
											>{option.label}
											</li>
											:
											<li
												className={styles.select__menu_disabledItem}
												key={option.value}
												value={option.value}
											>{option.label}
											</li>
									))}
								</ul>
							</CollapsibleMenu>
						)
					})
			}
		</div>
	)
}