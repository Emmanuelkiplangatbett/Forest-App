import React from "react";
import { Link } from "react-router-dom"


function Navbar() {

    return (
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/where-im-going">Where I'm Going</Link>
            </li>
            <li>
                <Link to="/where-ive-been">Where I've Been</Link>
            </li>
        </nav>
    )
}


export default Navbar;