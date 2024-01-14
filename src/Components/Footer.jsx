import React from "react";
import './Footer.css'
import Currenttrack from "./Currenttrack.jsx";
import PlayerControls from "./Playercontrol";
import Volume from "./Volume";
function Footer(){
    return(
        <div className="Footer">
            <Currenttrack/>
            <PlayerControls/>
            <Volume/>
        </div>
    )
}
export default Footer;