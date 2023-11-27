import React, { useState } from "react";
import Header from './components/header.jsx';
import { Footer } from "./components/footer.jsx";
import Pages from "./components/pagesPanel/pagesPanel.jsx";
import Page from './components/page.jsx'
import HomePage from "./pages/HomePage/Home.jsx";
import CollectDataPage from "./pages/CollectDataPage/collectData.jsx";
import { FilesStatusBar } from "./components/fileStatusBar/FilesStatusBar.jsx";
function App() {

	const [activePage, setActivePage] = useState(null);
	const [panelState, setPanelState] = useState(false);

	const togglePanel = () => {
		setPanelState(!panelState);
	};

	const setPage = (page) => {
		if (page) {
			setActivePage(page);
		}
		togglePanel()
	};

	return (
		<React.Fragment>
			<Header action={togglePanel} />
			<Pages panelState={panelState} action={setPage} />
			<Page pageName={'HomePage'} activePage={activePage}>
				<HomePage />
			</Page>
			<Page pageName={'CollectDataPage'} activePage={activePage}>
				<CollectDataPage />
			</Page>
			<Footer/>
		</React.Fragment>
	);
}

export default App;