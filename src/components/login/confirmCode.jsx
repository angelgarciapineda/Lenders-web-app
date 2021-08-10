import React, { useState, useEffect, useRef } from "react";
import "../../styles/confirm-code.css";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool";

function ConfirmCode(props) {

    const [emailState, setEmailState] = useState("")
    const [code,setCode] = useState("")
    const emailRef = useRef("")

    useEffect(() => {
        let unmounted = false;

        if(!unmounted){
            if(props.location.state !== undefined){
                //console.log("PROPS ------>",props.location.state.currentUser);
                setEmailState(props.location.state.currentUser.correo)
                emailRef.current = props.location.state.currentUser.correo
            }
        }

        return () => { unmounted = true }
    }, [])

    const confirmCodeFunc = () => {

        const currentUser = new CognitoUser({
            Username: emailRef.current,
            Pool: UserPool
        });

        const callback = (err, result) => {
            if (err) {
                console.log("ERROR CONFIRM --------->",err);
                return;
            }
                console.log("SUCCES CONFIRM --------->",result);
                props.history.push({
                    pathname: '/signin'
                });
        };

        currentUser.confirmRegistration(code, true, callback)
    }

    return (
        <div className="generalContainer">
            <label className="title">Confirmar correo electronico</label>
            <div className="mainContainer">
                <label>
                    Correo:
                </label>
                <input
                    className="form-control"
                    value={emailState}
                    //disable={true}
                />
                <label>
                    Codigo de verificacion:
                </label>
                <input
                    className="form-control"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={confirmCodeFunc}
                >
                    Confirmar
                </button>
            </div>
        </div>
    )
}

export default ConfirmCode;