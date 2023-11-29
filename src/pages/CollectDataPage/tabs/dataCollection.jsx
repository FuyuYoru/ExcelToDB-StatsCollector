import React, { useState, useRef } from "react";
import styles from '../../../styles/dataCollection.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveBody } from "../../../redux-store/reducers/slices/filesSlice";
import { createPortal } from "react-dom";
import ModalCheckList from "../../../components/modal/checkList/modalCheckList.jsx";
import { TableBody } from "../../../components/tables/tableBodyComponent.jsx";


const DataCollectionTab = () => {
	const fileInputRef = useRef(null);
	const dispatch = useDispatch()
	const [modalState, setModalState] = useState({
		visible: false,
		title: null,
		data: null,
		datapath: null,
	})

	const tableData = useSelector((state) => {
		const activeTable = state.files.active.table;
		return activeTable ? state.tables[activeTable].body : null;
	});

	const selectHandler = (value) => {
		dispatch(setActiveBody({ activeBody: value }))
	}

	const showFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = null;
			fileInputRef.current.click();
		}
	};

	const { file, table, body } = useSelector((state) => state.files.active);
	const activeDataExists = file !== null && table !== null && body !== null;

	const handleCloseModal = () => {
		setModalState({
			visible: false,
			title: null,
			data: null,
			datapath: null,
		})
	}

	const handleFileChange = async (event) => {
		const selectedFile = event.target.files[0];
		if (!selectedFile) {
			return;
		}
		try {
			const request = {
				path: selectedFile.path,
				name: selectedFile.name,
			};
	
			const responseData = await window.pythonAPI.getSheetnames(request);
	
			const modalData = {
				title: responseData.filename,
				data: responseData.sheetName,
				datapath: selectedFile.path,
			};
	
			setModalState({
				visible: true,
				...modalData,
			});
		} catch (error) {
			console.error('Error fetching Excel sheet names:', error);
		}
	};


	return (
		<React.Fragment>
			{/* <h3>Данная вкладка предназначена для загрузки данных из Excel-файлов (.xlsx, .xlsm)</h3> */}
			<div>
				{tableData && Object.keys(tableData).length > 0 ? (
					<select defaultValue={Object.keys(tableData)[0]} onChange={e => selectHandler(e.target.value)}>
						{Object.keys(tableData).map((key) => (
							<option key={key} value={key}>
								{key}
							</option>
						))}
					</select>
				) : (
					<p>No data available</p>
				)}
				<div className={styles.tableContainer}>
					{activeDataExists ? <TableBody tableId={table} bodyName={body} /> : null}
				</div>
			</div>
			<div className={styles.buttonsContainer}>
				<button>Lorem, ipsum.</button>
				<button>Saepe, sit.</button>
				<button onClick={showFileInput}>Загрузить файл</button>
				<input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
			</div>
			{modalState.visible &&
				createPortal(
					<ModalCheckList
						title={modalState.title}
						data={modalState.data}
						datapath={modalState.datapath}
						onClose={handleCloseModal} />,
					document.body
				)}
		</React.Fragment>
	)
}

export default DataCollectionTab;