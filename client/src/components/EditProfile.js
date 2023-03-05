import React, { useEffect, useState } from "react";

export default ({cancelEdit}) => {

    return (
        <div>
            <div class ="name"> Edit Profile </div>
            <br></br>
            <div class ="description"> Username: <input/> </div>
            <div class ="description"> Description: <input/> </div>
            <div class ="description"> City: <input/> </div>
            <div class ="description"> Education: <input/> </div>
            <div class ="description"> Hobbies: <input/> </div>
            <br></br>
            <div class ="email">
                <button onClick={() => cancelEdit()}> Cancel</button>
                <button onClick={()=>{ alert('Work in Progress'); }}> Submit</button>
            </div>
        </div>
    )
}
