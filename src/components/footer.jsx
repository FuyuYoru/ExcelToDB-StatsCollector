import React from "react";
import { FilesStatusBar } from "./fileStatusBar/FilesStatusBar.jsx";
import styles from '../styles/footer.css'

export const Footer = () => {
	return (
		<footer>
			<div>
				<FilesStatusBar />
			</div>
		</footer>
	)

}