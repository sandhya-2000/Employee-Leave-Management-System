import React  from "react";
import { useNavigate } from "react-router-dom";

function NavbarComponent ({text}){
  const navigate = useNavigate();

  const logout = () => {
    // localStorage.removeItem('token-info');
    navigate("/")
    
  };

  return (
    <div style={{
      backgroundColor: '#4a148c', width: '100%', height: '55px'
    }}>
      <nav className='nav z-depth-0'>
        <div className='nav-wrapper'>
          <span className='brand-logo white-text text-darken-4'>
            ELMS
          </span>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
            {text === '' ? <></> : <>{text==='AppliedLeaves' ? <button className="btn btn-nav transparent z-depth-0 white-text text-darken-4 purple darken-4" onClick={() => navigate("/AppliedLeaves")}>Applied Leaves</button>  : <button className="btn btn-nav transparent z-depth-0 white-text text-darken-4 purple darken-4" onClick={() => navigate("/EmployeePage")}>Apply for leave</button>}</>}
            </li>
            <li>
              <i className="fa fa-sign-out" onClickCapture={logout}  style={{ fontSize: '36px', color: 'white', cursor: 'pointer' }}></i>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default NavbarComponent;
