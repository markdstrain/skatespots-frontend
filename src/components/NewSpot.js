import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import SpotForm from "./Forms/SpotForm";


function NewSpot() {
    
    const dispatch = useDispatch();
    const history = useHistory();

    /** Adds post and saves to backend.  */

    function add() {

    }

    /** Cancel (redirect) */

    function cancel() {
        history.push('/');
    }

    return(
        <main>
            <h1>New Spot</h1>
            <SpotForm save={add} cancel ={cancel}/>
        </main>
    )
}

export default NewSpot;