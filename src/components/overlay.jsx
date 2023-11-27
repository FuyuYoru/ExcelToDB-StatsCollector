import React from "react";
import {useSelector } from "react-redux";
import { useEffect } from "react";
import ModalCheckList from "./modalCheckListOld.jsx";

const Overlay = () => {

	const overlay= useSelector((state) => state.overlay);
	const overlayDisplay = overlay.overlayState? 'block': 'none';

	return (
		<div className="overlay" style={{display: overlayDisplay}}>
				{overlay.modalType === 'checklist'? (
				<ModalCheckList 
				title={overlay.modalContent.title} 
				data={overlay.modalContent.data}
				confirmAction={(overlay.modalAction !== null)?overlay.modalAction: console.log('NONE')}
				/>
				) : null}
		</div>
	)
}

export default Overlay;