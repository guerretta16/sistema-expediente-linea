import React from "react";
import './index.css';
import { ListOptions } from "./ListOptions";

function NavBarOptions(){
    return(
        <nav className="NavBar-container">
            <ul className="NavBar-list">
                <ListOptions />
            </ul>
        </nav>
    );
}

export { NavBarOptions };