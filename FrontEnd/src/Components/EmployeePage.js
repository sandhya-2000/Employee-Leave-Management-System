import React, { useState, useEffect } from 'react'
import EmployeeService from "../services/Service";
import NavbarComponent from "./Navbar"
import AlertMessage from './AlertMessage';

function EmployeePage() {

  const [memail, setMemail] = useState('')
  const [uname, setUname] = useState('')
  const [uemail, setUemail] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [tof, setTof] = useState([])
  const status = 'Pending'

  const [isValid, setIsValid] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const [managers, setManagers] = useState([]);
  const [leaveTypeList, setLeaveTypeList] = useState([])

  useEffect(() => {
    getLeaveType()
    getManagers()
    setUemail(localStorage.getItem('UEmail'))
    getUserByEmail(uemail)
  }, [managers])

  const getManagers = () => {
    EmployeeService.getManagers().then((e) => {
      setManagers(e.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const getUserByEmail = (uemail) => {
    EmployeeService.getUserByEmail(uemail).then(response => {
      setUname(response.data.userName)
    })
  }

  const getLeaveType = () => {
    EmployeeService.getLeaveType().then((response) => {
      setLeaveTypeList(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const leaveApply = { memail, uname, uemail, tof, fromDate, toDate, reason, status }

    if (fromDate.trim().length === 0 ||
      toDate.trim().length === 0 ||
      tof === "" ||
      reason.trim().length === 0
    ) {
      setIsValid(false)
      const timer = setTimeout(() => {
        setIsValid(true)
      }, 1500)
    } else {
      EmployeeService.saveLeave(leaveApply).then((response) => {
        setIsSuccess(true)

        setMemail('')
        setUname('')
        setUemail('')
        setTof('')
        setFromDate('')
        setToDate('')
        setReason('')

        const timer = setTimeout(() => {
          setIsSuccess(false)
        }, 1500)
      })
    }
  }

  return (

    <div>
      <NavbarComponent text='AppliedLeaves' />
      <div className="form">
        <div className="header" style={{ color: "#4a148c" }}>
          <h4>Hello, {uname}!</h4>

          <h4>Apply for leave!!</h4>
        </div>
        <hr></hr>
        <div className="form-body">
          <div>
            <label className="form__label" htmlFor="fromDate">Select Manager</label>
            <select className='dropdown' name="manager" onChange={(e) => { setMemail(e.target.value) }} value={memail}>
              <option value="" disabled selected>Choose manager</option>
              {managers.map(manager => <option value={manager.email} key={manager.email}>{manager.email}</option>)}
            </select>
          </div>

          <div>
            <label className="form__label" htmlFor="typeOfLeave">Type of Leave</label>
            <select className="dropdown"  id="tof" name="tof" onChange={(e) => setTof(e.target.value)} value={tof}>
                    <option value="select">Select</option>
                    {
                        leaveTypeList.map(leaveTypeName => <option value={leaveTypeName} key={leaveTypeName}>{leaveTypeName}</option>)
                    }
                </select>
          </div>


          <div className="fromDate">
            <label className="form__label" htmlFor="fromDate">From Date</label>
            <input className="form__input" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} id="fromDate" required />
          </div>
          <div className="toDate">
            <label className="form__label" htmlFor="toDate">To Date</label>
            <input className="form__input" min={fromDate} type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} id="toDate" required />
          </div>
          <div className="reason">
            <label className="form__label" htmlFor="reason">Reason</label>
            <input className="form__input" type="text" value={reason} onChange={(e) => setReason(e.target.value)} id="reason" required />
          </div>
        </div>
        <div className="footer">
          <button className="btn success" onClick={e => handleSubmit(e)}>Apply!</button>
          {
            isValid ? <></> : <AlertMessage text='Enter Valid Data' color='red' />
          }
          {
            isSuccess ? <AlertMessage text='Leave Applied Successfully' color='green' /> : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default EmployeePage
