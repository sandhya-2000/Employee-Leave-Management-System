import React, {useState} from 'react';
import './regis/regissty.css'
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/Service";
import AlertMessage from './AlertMessage';
import validator from 'validator';

function RegistrationForm() {

    const navigate = useNavigate();  

    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [role,setRole] = useState({ employee: true, manager: false });
    const [isValid, setIsValid] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [emailMatch, setEmailMatch] = useState(true)
    const [passwordErr,setPasswordErr] = useState('')
    

    const passwordValidate = (e) => {        
        
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.?[#?!@$%^&-])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength =      password.length;
        const uppercasePassword =   uppercaseRegExp.test(password);
        const lowercasePassword =   lowercaseRegExp.test(password);
        const digitsPassword =      digitsRegExp.test(password);
        const specialCharPassword = specialCharRegExp.test(password);
        const minLengthPassword =   minLengthRegExp.test(password);
        let errMsg ="";
        if(passwordLength===0){
                errMsg="Password is empty";
        }else if(!uppercasePassword){
                errMsg="At least one Uppercase";
        }else if(!lowercasePassword){
                errMsg="At least one Lowercase";
        }else if(!digitsPassword){
                errMsg="At least one digit";
        }else if(!specialCharPassword){
                errMsg="At least one Special Characters";
        }else if(!minLengthPassword){
                errMsg="At least minumum 8 characters";
        }else{
            errMsg="";
        }
        setPasswordErr(errMsg)
        console.log(passwordErr)
        const timer = setTimeout(() => {
            setPasswordErr("")
            console.log(passwordErr)
        },1500)

    }    


    const handleSubmit = (e) =>{
        e.preventDefault();
        const employee = {userName, email, role, password}
        
        const strongRegex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.com+$");
        
        if(userName.trim().length === 0 ||      
        role.trim().length === 0 
        ){
        setIsValid(false)
        const timer = setTimeout(() => {
            setIsValid(true)
        },1500)
    }else if(password !== confirmPassword){
        setPasswordMatch(false)
        const timer = setTimeout(() => {
            setPasswordMatch(true)
        },1500)
    }else if(!strongRegex.test(email)){
        setEmailMatch(false)
        const timer = setTimeout(() => {
            setEmailMatch(true)
        },1500)
    }
    else{
        EmployeeService.saveUser(employee).then((response) => {
            setIsSuccess(true)
            const timer = setTimeout(() => {
                navigate('/Login');
            },1500)
        })
    }    
}

    const handleChange = (e) => {
        setRole(e.target.value); 
    }  


    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "userName"){
            setUsername(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    return(
        
        <div className="form">
            <div className="header" style={{color:"#4a148c"}}>
                <h3>REGISTRATION FORM</h3>
            </div>
            <hr></hr>
            <div className="form-body">
                <div className="userName">
                    <label className="form__label" for="userName">Name</label>
                    <input className="form__input" type="text" value={userName} onChange = {(e) => handleInputChange(e)} id="userName" placeholder="Name" required/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="username@domain.tld" required/>
                </div>
                <br></br>

                <div className="radio" >
                    <label className='form__label' >Role :</label>  
                    <label className="form__label"  ><input style={{opacity:"2", marginLeft:"65px"}} type="radio"  checked={role === 'employee'} value="employee" onChange={handleChange}  id="radio" />Employee</label>            
                    <label className="form__label" ><input style={{opacity:"2", marginLeft:"60px"}} type="radio" checked={role === 'manager'} value="manager" onChange={handleChange}  id="radio"/> Manager</label> 
                </div>
                <br></br>   

                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} onKeyUp ={(e) => passwordValidate(e)} placeholder="Password" required/>
                </div>
                {passwordErr === 'null'?<></> : <AlertMessage text={passwordErr} color='red'/>}
                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password" required/>
                </div>
            </div>
            <div className="footer">
                <button className="btn success" onClick={e => handleSubmit(e)}>Register</button>
                {
                isValid ? <></> : <AlertMessage text='Enter Valid Data' color='red'/>
            }
            {
                isSuccess ? <AlertMessage text='Employee Registered Successfully' color='green'/> : <></>
            }
            {
                passwordMatch ? <></> : <AlertMessage text="Passwords don't match!" color='red'/>
            }
            {
                emailMatch ? <></> : <AlertMessage text="Email is not following a proper convention" color='red'/>
            }
            </div>
        </div>
       
    )       
}

export default RegistrationForm


// import React from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// import { useRef, useState, useEffect } from 'react'
// import EmployeeService from '../services/EmployeeService';
// import AlertMessage from './AlertMessage';
// import validator from 'validator';

// import './style/structure.css';

// export function RegisterEmployee() {

//     const [fullName, setFullName] = useState('')
//     const [emailId, setEmailId] = useState('')
   
//     const [designation, setDesignation] = useState('')
//     const [userName, setUserName] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')

//     const [isValid, setIsValid] = useState(true)
//     const [isSuccess, setIsSuccess] = useState(false)
//     const [passwordMatch, setPasswordMatch] = useState(true)
   
//     const [passwordErr,setPasswordErr] = useState('')
//     const [emailMatch, setEmailMatch] = useState(true)
//     const [errorMessage, setErrorMessage] = useState('')

//     const passwordValidate = (e) => {        
        
//         const uppercaseRegExp   = /(?=.*?[A-Z])/;
//         const lowercaseRegExp   = /(?=.*?[a-z])/;
//         const digitsRegExp      = /(?=.*?[0-9])/;
//         const specialCharRegExp = /(?=.?[#?!@$%^&-])/;
//         const minLengthRegExp   = /.{8,}/;
//         const passwordLength =      password.length;
//         const uppercasePassword =   uppercaseRegExp.test(password);
//         const lowercasePassword =   lowercaseRegExp.test(password);
//         const digitsPassword =      digitsRegExp.test(password);
//         const specialCharPassword = specialCharRegExp.test(password);
//         const minLengthPassword =   minLengthRegExp.test(password);
//         let errMsg ="";
//         if(passwordLength===0){
//                 errMsg="Password is empty";
//         }else if(!uppercasePassword){
//                 errMsg="At least one Uppercase";
//         }else if(!lowercasePassword){
//                 errMsg="At least one Lowercase";
//         }else if(!digitsPassword){
//                 errMsg="At least one digit";
//         }else if(!specialCharPassword){
//                 errMsg="At least one Special Characters";
//         }else if(!minLengthPassword){
//                 errMsg="At least minumum 8 characters";
//         }else{
//             errMsg="";
//         }
//         setPasswordErr(errMsg)
//         const timer = setTimeout(() => {
//             setPasswordErr("")
//         },1500)
//         console.log(password,passwordErr)

//     }
    // const validate = (value) => {
 
    //     if (validator.isStrongPassword(value, {
    //       minLength: 8, minLowercase: 1,
    //       minUppercase: 1, minNumbers: 1, minSymbols: 1
    //     })) {
    //       setErrorMessage('Is Strong Password')
    //     } else {
    //       setErrorMessage('Is Not Strong Password')
    //     }
    //   }


//     const userRef = useRef()

//     const navigate = useNavigate()

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         // console.log(fullName, emailId, address, designation, userName, password);

//         const employee = {fullName, emailId, designation, userName, password}
//         const strongRegex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.com+$");

//         if(userName.trim().length === 0 || 
//             password.trim().length === 0 ||
//             emailId.trim().length === 0 ||
            
//             designation.trim().length === 0 
            
//             ){
//             // alert('Enter Valid Data')
//             setIsValid(false)
//             const timer = setTimeout(() => {
//                 setIsValid(true)
//             },3000)
//         }else if(password !== confirmPassword){
//             // alert("Passwords don't match!")
//             setPasswordMatch(false)
//             const timer = setTimeout(() => {
//                 setPasswordMatch(true)
//             },3000)
//         }else if(!strongRegex.test(emailId)){
//             setEmailMatch(false)
//             const timer = setTimeout(() => {
//                 setEmailMatch(true)
//             },3000)
//         } else{
//             EmployeeService.createUser(employee).then((response) => {
//                 // console.log(response.data)
//                 // alert("Employee Registered Successfully")
//                 setIsSuccess(true)
//                 const timer = setTimeout(() => {
//                     navigate("/login")
//                 },3000)
//                 // navigate("/login")
//             })
//         }    
//     }

//   return (
//     <div class="form-body">
//     <div class="row">
//         <div class="form-holder">
//             <div class="form-content">
//                 <div class="form-items">
//                 <h3>Register</h3>
        
                        
//           <form class="requires-validation" novalidate>
            
//                    <div class="col-md-12">
//                                <input class="form-control" type="text"name="fullName" placeholder="Full Name" ref={userRef} onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                               
//                             </div>
            
//                             <div className="email">
                    
//                     <input  type="email"  className="form__input" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Email Id" required/>
//                 </div>
               
           
//                             <div class="col-md-12">
//                                <input class="form-control" type="text" name="userName" placeholder="UserName" onChange={(e) => setUserName(e.target.value)} value={userName} required />
                               
//                             </div>
//                             <div class="col-md-12">
//                                 <select class="form-select mt-3" id="designation" name="designation" onChange={(e) => setDesignation(e.target.value)} value={designation} required>
//                                       <option selected disabled value="">Select Your Role</option>
//                                       <option value="employee">Employee</option>
//                                       <option value="manager">Manager</option>
                                      
//                                </select>
                                
//                            </div>
//                            <div class="col-md-12">
//                               <input class="form-control" type="password" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value); validate(e.target.value);}} onKeyUp ={(e) => passwordValidate(e)} value={password} required />
                              
//                            </div>
//                            {passwordErr === 'null'?<></> : <AlertMessage text={passwordErr} color='red'/>}
//                            <div class="col-md-12">
//                               <input class="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                              
//                            </div>
//                            <div class="form-button mt-3">
//                                 <button id="submit" type="submit" class="btn btn-primary" onClick={handleSubmit}>Register</button>
//                             </div>
//                             <br></br>

//                             {
//                 isValid ? <></> : <AlertMessage text='Incorrect Data' color='red'/>
//             }
//             {
//                 isSuccess ? <AlertMessage text='Employee Registered Successfully' color='green'/> : <></>
//             }
//             {
//                 passwordMatch ? <></> : <AlertMessage text="Passwords don't match!" color='orange'/>
//             }              
//              {
//                 emailMatch ? <></> : <AlertMessage text="Email is not following a proper convention" color='red'/>
//             }
//            {errorMessage === '' ? null :
//         <span style={{
//           fontWeight: 'bold',
//           color: 'yellow',
//         }}>{errorMessage}</span>}
                
//             <p>
//                 <h6>Have an Account Already?</h6>
//                 <Link to='/login' style={removeUnderline}>Click Here</Link>
//             </p>

           
//             </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//    </div>
//   )
// }

// const removeUnderline = {
//     textDecoration: 'none'
// }

// export default RegisterEmployee