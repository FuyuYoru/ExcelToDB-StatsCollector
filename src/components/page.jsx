import React from "react";

const Page = (props) => {

  const { pageName, activePage } = props;

    return (
      <div className={`${pageName} ${activePage === pageName? 'page_active': 'page_hidden'} `}>
        {props.children}
      </div>
    )
}

export default Page;