import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Slider } from "../../../components/slider/slider.jsx";
import { RedactableTable } from "../../../components/tables/redactableTable/RedactableTable.jsx";

const DataVerificationTab = () => {

	const files = useSelector((state) => state.files);
	const [selectedFile, setSelectedFile] = useState('none');
	const [selectedTable, setSelectedTable] = useState('');

	const handleOnChangeSlider = (tableName) => {
		const tableId = files[selectedFile][tableName];
		setSelectedTable(tableId);
	};

	useEffect(() => {
		if (selectedFile !== 'none') {
			handleOnChangeSlider(Object.keys(files[selectedFile])[0]);
		}
	}, [selectedFile]);

	return (
		<>
			<div>
				{Object.keys(files).filter(item => item !== 'active').length > 0 ?
					<select defaultValue={'none'} onChange={e => setSelectedFile(e.target.value)}>
						<option disabled value={'none'}>-- select an option --</option>
						{Object.keys(files).filter(item => item !== 'active').map((value, index) => (
							<option key={index} value={value}>{value}</option>
						))}
					</select> : <p>No data available</p>}
				{selectedFile === 'none' ? null :
					<Slider
						values={Object.keys(files[selectedFile]).filter(key => key !== 'fileType')}
						onValueChange={handleOnChangeSlider}
					/>}
			</div>
			<div style={{ maxHeight: '65vh', overflow: 'scroll' }}>
				{selectedTable && <RedactableTable fileName={selectedFile} tableName={selectedTable} />}
			</div >
			<div className="buttonsContainer">
				<button>Собрать</button>
				<button>Отправить</button>
			</div>
		</>
	)
}


export default DataVerificationTab;