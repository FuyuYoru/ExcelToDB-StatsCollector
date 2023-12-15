import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styles from './modalCheckList.module.css'
import getUID from "../../../utils/createUID";
import { enqueueItem } from "../../../redux-store/reducers/slices/processingQueueSlice";

export interface IModalChecklist {
	title: string;
	data: string[];
	datapath: string;
	onClose(): void;
}
const ModalCheckList = ({ title, data, datapath, onClose }: IModalChecklist) => {

	const [selectedSheets, setSelectedSheets] = useState([]);
	const [selectionStatus, setSelectionStatus] = useState(null)

	const addToState = (value: string) => {
		setSelectedSheets([...selectedSheets, value]);
	};

	const removeFromState = (value: string) => {
		setSelectedSheets(selectedSheets.filter(e => e !== value));
	};

	function toggleAll(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.checked) {
			setSelectedSheets(data);
		} else {
			setSelectedSheets([]);
		}
	}

	const dispatch = useDispatch()

	const addToProcessingQueue = (sheets: string[]) => {
		if (selectedSheets.length < 1) {
			setSelectionStatus('error');
			return;
		}

		onClose();

		sheets.forEach((value: string) => {
			const uid = getUID();
			const dataObject = {
				title: title,
				filePath: datapath,
				sheetName: value,
				id: uid,
			};
			dispatch(enqueueItem(dataObject));

		});

	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal__container}>
				<h2>{title}</h2>
				<h3>Выберите необходимые листы:</h3>
				<div className={styles.checkList}>
					<label>
						<input
							type="checkbox"
							onChange={(event) => toggleAll(event)}
						/>
						{'Переключить все'}
					</label>
					{data.map((item, index) => (
						<label key={index}>
							<input
								type="checkbox"
								checked={selectedSheets.includes(item) ? true : false}
								onChange={(event) => {
									if (event.target.checked) {
										addToState(item);
									} else {
										removeFromState(item);
									}

								}}
							/>
							{item}
						</label>
					))}
				</div>
				<p>
					{
						selectionStatus === 'error' ?
							'Пожалуйста, убедитесь, что вы выбрали необходимые листы и указали тип файла перед продолжением.'
							: null
					}
				</p>
				<div className={styles.container_buttons}>
					<button onClick={onClose}>Закрыть</button>
					<button onClick={() => { addToProcessingQueue(selectedSheets) }}>Выбрать</button>
				</div>
			</div>
		</div>
	);
}

export default ModalCheckList;