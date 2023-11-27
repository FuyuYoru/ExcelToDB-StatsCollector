import React from "react";
import '../../styles/collectDataPage.css'
import CollapsibleMenu from "../../components/CollapsibleMenu/collapsibleMenu.jsx";
import TabsPanel from "./tabsPanel.jsx";
import { setActiveBody, setActiveFile, setActiveTable } from "../../redux-store/reducers/slices/filesSlice";
import { useSelector, useDispatch } from 'react-redux';

const CollectDataPage = () => {
	const files = useSelector((state) => state.files)
	const tables = useSelector((state) => state.tables)

	const dispatch = useDispatch()
	const activeFileHandler = (key) => {
		const currentActiveFile = files.active.file;

		if (key !== currentActiveFile) {
			dispatch(setActiveFile({ activeFile: key }))
		}
	}

	const activeSheetHandler = (tableId) => {
		const currentActiveTable = files.active.table;
		if (tableId !== currentActiveTable) {
			dispatch(setActiveTable({ activeTable: tableId }));
			const table = tables[tableId];
			if (table && table.body) {
				const firstBody = Object.keys(table.body)[0];
				dispatch(setActiveBody({ activeBody: firstBody }));
			}
		}
	}

	return (
		<div className="collectDataPage__mainContainer">
			<div className="loadedFiles__container">
				<CollapsibleMenu btnText={"Загруженные файлы"} closeOnOutsideClick={false}>
					{Object.keys(files).map((key) => (
						key != 'active' ?
							<button 
							className={files.active.file === key? 'activeFile': null} 
							key={key} 
							onClick={() => activeFileHandler(key)}
							>
								{key}
							</button>
							: null
					))}
				</CollapsibleMenu>
				<CollapsibleMenu btnText={"Загруженные листы"} closeOnOutsideClick={false}>
					{files.active.file != null ? (
						Object.keys(files[files.active.file]).map((sheet) => (
							sheet !== 'fileType' ?
							<button 
							className={files.active.table === files[files.active.file][sheet]? 'activeFile': null}
							key={sheet} 
							onClick={() => activeSheetHandler(files[files.active.file][sheet])}>
								{sheet}
							</button>
							: null
						))
					) : null}
				</CollapsibleMenu>

			</div>
			<div className="tabs__container">
				<TabsPanel />
			</div>
		</div>
	);
}

export default CollectDataPage;