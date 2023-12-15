import React from "react";
import './pagesPanel.css'
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface IPages {
	panelState: boolean;
	action(pageName?: string): void;
}

const Pages = ({ panelState, action }: IPages) => {

	const ref = useOutsideClick(() => {
		if (panelState) {
			action()
		}
	})

	return (
		<div ref={ref} className={`pagesPanel ${panelState ? "pagesPanel_open" : ''}`}>
			<button onClick={() => action('HomePage')}>
				<span className={"button_description"}>Главная</span>
			</button>
			<button onClick={() => action('CollectDataPage')}>
				<span className={"button_description"}>Данные из Excel</span>
			</button>
		</div>
	);
}

export default Pages;
