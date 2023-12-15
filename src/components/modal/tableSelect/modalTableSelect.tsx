import React from "react";
import CollapsibleMenu from "../../collapsibleMenu/collapsibleMenu.jsx";
import styles from './tableSelect.module.css'
import { useOutsideClick } from "../../../hooks/useOutsideClick.js";

interface ISelectInteface {
	value: string;
	label: string;
}

export interface IModalTableSelect {
	options: Array<ISelectInteface> | Record<string, Array<ISelectInteface>>;
	onChange(option: ISelectInteface): void;
	onClose(): void;
	posX: number;
	posY: number;
	disabledOptions: Array<unknown>;

}

export const ModalTableSelect = ({ options, disabledOptions, onChange, posX, posY, onClose }: IModalTableSelect) => {

	const ref = useOutsideClick(() => {
		onClose()
	})

	const handleOptionClick = (option: ISelectInteface) => {
		if (onChange) {
			onChange(option)
		}
		onClose()
	}

	return (
		<div className={styles.selectContainer} style={{ left: posX, top: posY }} ref={ref}>
			{
				Array.isArray(options) ? (
					<ul>
						{options.map((option) => (
							!disabledOptions.includes(option.value) ? (
								<li
									key={option.value}
									value={option.value}
									onClick={() => handleOptionClick(option)}
								>
									{option.label}
								</li>
							) : (
								<li
									className={styles.select__menu_disabledItem}
									key={option.value}
									value={option.value}
								>
									{option.label}
								</li>
							)
						))}
					</ul>
				) : (
					Object.keys(options).map((value, index) => (
						<CollapsibleMenu btnText={value} key={index} closeOnOutsideClick={true}>
							<ul>
								{options[value].map((option) => (
									!disabledOptions.includes(option.value) ? (
										<li
											key={option.value}
											value={option.value}
											onClick={() => handleOptionClick(option)}
										>
											{option.label}
										</li>
									) : (
										<li
											className={styles.select__menu_disabledItem}
											key={option.value}
											value={option.value}
										>
											{option.label}
										</li>
									)
								))}
							</ul>
						</CollapsibleMenu>
					))
				)
			}

		</div>
	)
}