import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import styles from './FileStatus.module.css'

export const FilesStatusBar = () => {
	const { queue, successQueue, errorQueue } = useSelector(state => state.processingQueue);

	return (
		<div className={styles.statusContainer}>
			<span className={styles.statusIcon}><HiOutlineQueueList /></span>
			<span className={styles.statusText}>{queue.length}</span>
			<span className={styles.statusIcon}><FaRegCircleCheck /></span>
			<span className={styles.statusText}>{successQueue.length}</span>
			<span className={styles.statusIcon}><MdErrorOutline /></span>
			<span className={styles.statusText}>{errorQueue.length}</span>
		</div >
	);
};