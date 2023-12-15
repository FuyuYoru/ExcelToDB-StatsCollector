import React from "react";
import { FilesStatusBar } from "./fileStatusBar/FilesStatusBar";
import '../styles/footer.css'

export const Footer = () => {
	return (
		<footer>
			<div>
				<FilesStatusBar />
			</div>
		</footer>
	)

}