import React from 'react'; 
import { useState } from 'react';

const Counter = () => {
    
    const [number, setNumber] = useState(0);  //useState initiates the number
    // first arg is the var, second is the function where we change state
    const increase = () => {
        setNumber(number + 1); 
    } 

    const decrease = () => {
        setNumber(number - 1); 
    }

    return (
        <div> 
            <p> {number} </p>
            <button onClick = {decrease}> - </button>   
            <button onClick={increase}> + </button>
        </div> 
    ); 
}

export default Counter; 