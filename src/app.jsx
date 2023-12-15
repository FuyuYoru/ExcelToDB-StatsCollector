import React, { useState } from "react";
import Header from './components/header';
import { Footer } from "./components/footer";
import Pages from "./components/pagesPanel/pagesPanel";
import Page from './components/page'
import HomePage from "./pages/HomePage/Home.jsx";
import CollectDataPage from "./pages/CollectDataPage/collectData.jsx";
// import { FilesStatusBar } from "./components/fileStatusBar/FilesStatusBar.jsx";
import { Provider } from 'react-redux';
import { store } from './redux-store/store';

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
    togglePanel();
  };

  return (
    <Provider store={store}>
      <React.Fragment>
        <Header action={togglePanel} />
        <Pages panelState={panelState} action={setPage} />
        <Page pageName={'HomePage'} activePage={activePage}>
          <HomePage />
        </Page>
        <Page pageName={'CollectDataPage'} activePage={activePage}>
          <CollectDataPage />
        </Page>
        <Footer />
      </React.Fragment>
    </Provider>
  );
}

export default App;
