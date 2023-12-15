import React, {useState} from "react";
import styles from "./tabsPanel.module.css"
import DataCollectionTab from "./tabs/dataCollection.jsx";
import DataVerificationTab from "./tabs/dataVerification.jsx";

const TabsPanel = () => {

  const [activeTab, setActiveTab] = useState(0);

  const tabContents = [
    ['Вкладка 1',<DataCollectionTab/>],
    ['Вкладка 2',<DataVerificationTab/>],
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <ul className={styles.tabsPanel__list}>
        {tabContents.map((content, index) => (
          <li
            key={index}
            className={activeTab === index ? styles.active : ''}
            onClick={() => handleTabClick(index)}>
            {content[0]}
          </li>
        ))}
      </ul>
      <div className="tabContent">
        {tabContents[activeTab][1]}
      </div>
    </div>
  );
};

export default TabsPanel;