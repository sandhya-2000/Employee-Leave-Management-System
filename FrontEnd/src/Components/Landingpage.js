import React from 'react'
import bg from "../asset/bg4.png";
import { useNavigate } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

function Landingpage() {
    const navigate = useNavigate();

    return (
            <div className='row' style={{backgroundColor:"white"}}>
                <div className='col s12 m6'>
                    <img className='responsive-img' alt="" src={bg} width="96%" />
                </div>
                <div className='col s12 m6'>
                <br></br><br></br>
                    <h2 className='title purple-text text-darken-4'>
                        EMPLOYEE LEAVE  MANAGEMENT  SYSTEM
                    </h2>
                    <br></br>
                    <p className='para'>
                        Login to your account!
                    </p>
                    <button className="waves-effect waves-dark btn-large blue" onClick={() => navigate("/Login")}>Sign In</button>
                    <p className='para'>
                        Create an account here!
                    </p>
                    <button className="waves-effect waves-dark btn-large blue" onClick={() => navigate("/RegistrationForm")}>Sign Up</button>
                </div>
            </div>
    );
}

export default Landingpage;