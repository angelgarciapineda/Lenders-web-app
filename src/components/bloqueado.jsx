import React, { useState, useEffect, useRef } from "react";
import bloqueado from "../assets/bloqueado.png"

function BloqueadoScreen(props) {

    return (
        <div className="">
            <img src={bloqueado}/>
            <label>TEXTO PANTALLA</label>
        </div>
    )
}

export default BloqueadoScreen;