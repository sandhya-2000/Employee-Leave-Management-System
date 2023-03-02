import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/Service';
import NavbarComponent from './Navbar';
import { useLocation } from 'react-router-dom';
function AppliedLeaves() {

  const [leave, setLeave] = useState([]);
  const [email, setEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    getAllLeaves()
    setEmail(localStorage.getItem('MEmail'))
  },[leave])


  const getAllLeaves = () => {
    EmployeeService.getLeaveByMEmail(email).then((response) => {
      setLeave(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const acceptOrRejectLeave = (e, leaveId, acceptOrReject) => {
    e.preventDefault()

    EmployeeService.getLeaveByLeaveId(leaveId).then((response) => {


      const memail = response.data.memail
      const uname = response.data.uname
      const fromDate = response.data.fromDate
      const toDate = response.data.toDate
      const reason = response.data.reason
      const status = acceptOrReject

      const leave = { memail, uname, fromDate, toDate, reason, status }
      EmployeeService.updateLeave(response.data.id, leave)
    })
  }


  return (
    <div><NavbarComponent text='' />
      <div >
        <h3 className="text-center" style={{ color: "white", textAlign: "center",textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>{location.state.name}, List of Employee's Leaves</h3>
        <br></br>
        <div className="row" >
          <table className="table table-striped" style={{ color: "Black" }}>

            <thead style={{fontSize: "15px"}} >
              <tr>
                <th style={{"padding-left":"30px"}}>EMPLOYEE NAME</th>
                <th style={{"padding-left":"30px"}}> FROM DATE</th>
                <th style={{"padding-left":"30px"}}> TO DATE</th>
                <th style={{"padding-left":"30px"}}> TYPE OF LEAVE</th>
                <th style={{"padding-left":"30px"}}> REASON </th>  
                <th style={{"padding-left":"30px"}}> STATUS </th>              
                <th style={{"padding-left":"30px"}}> ACTION</th>
              </tr>
            </thead>
            <tbody style={{ color: " black" }}>
              {

                leave.slice(0).reverse().map(
                  (leave, index) =>
                    <tr key={leave.id} >
                      <td style={{"padding-left":"30px"}}> {leave.uname}</td>
                      <td style={{"padding-left":"30px"}}> {leave.fromDate} </td>
                      <td style={{"padding-left":"30px"}}> {leave.toDate}</td>
                      <td style={{"padding-left":"30px"}}> {leave.tof}</td>
                      <td style={{"padding-left":"30px"}}> {leave.reason}</td>
                      <td style={{"padding-left":"30px"}}> {leave.status}</td>

                      <td style={{"padding-left":"30px"}}>
                        <button
                          className="btn "
                          style={{ margin: "5px", backgroundColor: "green" }}
                          onClick={(e) =>
                            acceptOrRejectLeave(e, leave.id, "Accepted")
                          }
                          disabled={leave.status === "Accepted" || leave.status === "Rejected"}
                        >
                          Accept
                        </button>
                        <button
                          className="btn"
                          style={{ margin: "5px", backgroundColor: "red" }}
                          onClick={(e) =>
                            acceptOrRejectLeave(e, leave.id, "Rejected")
                          }
                          disabled={leave.status === "Rejected" || leave.status === "Accepted"}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>

        </div>
      </div>

    </div>
  )
}

export default AppliedLeaves