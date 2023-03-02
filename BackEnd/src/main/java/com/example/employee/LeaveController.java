package com.example.employee;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/leave")
public class LeaveController {


	@Autowired
	private LeaveRepository leaveRepository;
	
	@PostMapping
	public Leave saveLeave(@RequestBody Leave leave) {
		return leaveRepository.save(leave);
	}
	
	@GetMapping
	public List<Leave> getAllLeaves() {
		return leaveRepository.findAll();
	}
	
	@GetMapping("/{uemail}")
	public List<Leave>  getLeaveByUEmail(@PathVariable String uemail) {
		List<Leave> leaves = leaveRepository.findListofLeavesByUemail(uemail);
		return leaves;
	}
	
	@GetMapping("/manager/{memail}")
	public List<Leave>  getLeaveByMEmail(@PathVariable String memail) {
		List<Leave> leaves = leaveRepository.findListofLeavesByMemail(memail);
		return leaves;
	}
	
	@GetMapping("/leaveId/{id}")
	public Leave getLeaveByLeaveId(@PathVariable String id) {
		Optional<Leave> leave = leaveRepository.findById(id);
		return leave.get();
	}
	
	@PutMapping("/{id}")
	public Leave updateLeave(@PathVariable String id, @RequestBody Leave leave) {
		Leave new_leave = leaveRepository.findById(id).orElse(null);
		if (new_leave != null) {
			new_leave.setMemail(leave.getMemail());
			new_leave.setUname(leave.getUname());
			new_leave.setFromDate(leave.getFromDate());
			new_leave.setToDate(leave.getToDate());
			new_leave.setReason(leave.getReason());
			new_leave.setStatus(leave.getStatus());
			return leaveRepository.save(new_leave);
		} else {
			return null;
		}
	}
	
	@GetMapping("/Leave-Type")
	public List<tof> getLeaveType(){
		return new ArrayList<>(Arrays.asList(tof.values()));
		
	}
}