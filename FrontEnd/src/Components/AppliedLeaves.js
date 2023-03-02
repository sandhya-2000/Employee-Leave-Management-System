import React, {useState, useEffect} from 'react';
import EmployeeService from '../services/Service';
import NavbarComponent from "./Navbar"

function AppliedLeaves () {

    const [leave,setLeave] = useState([]);
    

    useEffect(() => {
        const uemail=localStorage.getItem('UEmail')
        getAllLeaves(uemail)
      },[leave])


      const getAllLeaves = (uemail) => {        
          EmployeeService.getLeaveByUEmail(uemail).then((response) => {
            setLeave(response.data)
            console.log(leave)
          }).catch(error => {
            console.log(error);
          })
      }


  return (
    <div><NavbarComponent text='EmployeePage'/>
        <div>
             <h3 className="text-center" style={{color: "White", textAlign:'center',textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>List of Applied Leaves</h3>
             <br></br>
             <div className = "row" >
                    <table className = "table" style={{color: "black" , overflow: "hidden"}}>

                        <thead>
                            <tr style={{color:"black" , fontSize: "15px"}}>
                                <th style={{"padding-left":"30px"}}> MANAGER EMAIL</th>
                                <th style={{"padding-left":"30px"}}> FROM DATE</th>
                                <th style={{"padding-left":"30px"}}> TO DATE</th>
                                <th style={{"padding-left":"30px"}}> TYPE OF LEAVE </th>
                                <th style={{"padding-left":"30px"}}> REASON </th>
                                <th style={{"padding-left":"30px"}}> STATUS</th>
                            </tr>
                        </thead>
                        <tbody style={{color: "black"}}>
                            {
                                leave.slice(0).reverse().map(
                                    leave => 
                                    <tr className='trow' key={leave.id}>
                                         <td style={{"padding-left":"30px"}}> {leave.memail} </td>  
                                         <td style={{"padding-left":"30px"}}> {leave.fromDate} </td>   
                                         <td style={{"padding-left":"30px"}}> {leave.toDate}</td>
                                         <td style={{"padding-left":"30px"}}> {leave.tof} </td>
                                         <td style={{"padding-left":"30px"}}> {leave.reason}</td>
                                         {leave.status==='Pending' && <td>  <button className='btn' style={{backgroundColor:"orange",color:"black"}}>{leave.status}</button></td>}
                                         {leave.status==='Accepted' && <td>  <button className='btn' style={{backgroundColor:"green" ,color:"black"}}>{leave.status}</button></td>}
                                         {leave.status==='Rejected' && <td>  <button className='btn' style={{backgroundColor:"red" ,color:"black"}}>{leave.status}</button></td>}
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