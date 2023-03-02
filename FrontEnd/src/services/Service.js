import axios from 'axios'
const user_url = 'http://localhost:8080/login';
const leave_url = 'http://localhost:8080/leave';

class Service {
  getUserByEmail(email) {
    return axios.get(user_url + '/' + email)
  }
  
  saveUser(user){
    return axios.post(user_url, user)
  }

  getUserByUserName(userName){
    return axios.get(user_url + '/' + userName)
  }

  getManagers(){
    return axios.get(user_url + '/' + "managers")
  }

  saveLeave(leave){
    return axios.post(leave_url,leave)
  }

  getLeaveByUEmail(uemail){
    return axios.get(leave_url+'/'+uemail)
  }

  getLeaveByMEmail(memail){
    return axios.get(leave_url+'/manager/'+memail)
  }

  getAllLeaves(){
    return axios.get(leave_url)
  }

  getLeaveByLeaveId(id){
    return axios.get(leave_url + '/leaveId/' + id)
  }

  updateLeave(id, leave){
    return axios.put(leave_url + '/' + id, leave)
  }

  getLeaveType(){
    return axios.get(leave_url+"/Leave-Type")
  }

}


export default new Service();