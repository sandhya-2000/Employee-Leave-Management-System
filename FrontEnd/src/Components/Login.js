import React from 'react'
import bg from "../asset/loginnn.jpeg";
import {Link,  useNavigate} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import './regis/regissty.css'
import EmployeeService from '../services/Service';


function Login() {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [displays, setDisplays]= useState('');
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);

    const userRef = useRef()

    const navigation = useNavigate()

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = (e) => {
        
        e.preventDefault()
        setEmail('')
        setPwd('')
        let r="employee"
        let l="manager"

        
        EmployeeService.getUserByEmail(email).then((response) => {
            console.log(response.data.role)
            if(response.data.email === email && response.data.password === pwd && response.data.role===r){
                localStorage.setItem('UEmail',email);
                navigation('/AppliedLeaves',{ state: { name: response.data.userName, email: response.data.email} })
            } else if(response.data.email === email && response.data.password === pwd && response.data.role===l){
                localStorage.setItem('MEmail',email);                
                navigation('/ManagerPage',{ state: { name: response.data.userName, email: response.data.email} })
            } else{
                setIsAlertVisible(true);
                setDisplays("Invalid credentials")
                setTimeout(() =>  setIsAlertVisible(false), 2000);
            }
        })
    }

  return (
   
    <div className="form"> 
        <div className=" header justify-content-center mt-5 border-line"> 
            <img className='responsive-img' alt="" src={bg} width="65%" />
        </div>

        <form className='form-body' onSubmit={handleSubmit}>
            <p>
                <label className="form__label">Email</label><br/>
                <input type="text" autoComplete='off' name="email" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />
            </p>
            <p>
                <label className="form__label">Password</label>
                
                <br/>
                <input type="password" name="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
            </p>
           
                <div className="footer">
                <button  type="submit"  className="btn">Sign In</button>
                <p>New user?<Link to="/RegistrationForm"> <u>Sign up here!</u></Link></p>  
                {isAlertVisible &&<p style={{color:"red"}}>{displays}</p> }             
            </div>
        </form>
      
    </div>
    
  )
}


export default Login
