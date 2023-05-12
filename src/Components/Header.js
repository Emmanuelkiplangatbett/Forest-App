import React from "react";
import Caravan from "../caravan-solid.svg"


function Header() {

    return (
        <div className = "header">
            <h1>Road Trippin'</h1>
            <img src={Caravan} alt="test"/>
        </div>
    )
}

export default Header;