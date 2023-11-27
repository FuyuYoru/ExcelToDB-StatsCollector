import React from "react";
import styles from '../styles/header.css'

function Header(props) {
    const {action} = props;
    return (
        <header>

            <div>
                <button>
                    <span 
                    className="material-symbols-outlined title-menu"
                    onClick={action}>menu</span>
                </button>
            </div>
            <div>
                <button>Свернуть</button>
                <button>Развернуть</button>
                <button>Закрыть</button>
            </div>
        </header>
    );
}

export default Header;