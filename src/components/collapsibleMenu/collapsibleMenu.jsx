import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import styles from './collapsibleMenu.module.css'
import { IoIosArrowForward } from "react-icons/io";
import { useOutsideClick } from "../../hooks/useOutsideClick";


const CollapsibleMenu = (props) => {
	const { btnText, closeOnOutsideClick } = props;
	const [menuState, setMenuState] = useState(false)

	const action = () => {
		setMenuState(!menuState)
	};

	const ref = useOutsideClick(() => {
		if (closeOnOutsideClick){
			setMenuState(false)
		}
	})

	return (
		<div className={styles.collapsibleMenu__container} ref={ref}>
			<button onClick={action} className={styles.collapsibleMenu__button}>
				<span className={`${styles.collapsibleMenu__icon} ${menuState ? styles.active : ''}`}>
					<IoIosArrowForward />
				</span>
				{btnText}
			</button>
			<div className={menuState ? styles.collapsibleMenu__menu + ' ' + styles.active : styles.collapsibleMenu__menu}>
				{props.children}
			</div>
		</div>
	);
}

export default CollapsibleMenu;