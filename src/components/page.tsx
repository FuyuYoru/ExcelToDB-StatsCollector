import React, {ReactNode } from "react";

interface IPage {
	pageName: string;
	activePage: string;
	children?: ReactNode | undefined;
}

const Page= (props: IPage) => {

	const { pageName, activePage } = props;

	return (
		<div className={`${pageName} ${activePage === pageName ? 'page_active' : 'page_hidden'} `}>
			{props.children}
		</div>
	)
}

export default Page;