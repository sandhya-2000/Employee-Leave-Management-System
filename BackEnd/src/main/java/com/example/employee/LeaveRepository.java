package com.example.employee;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface LeaveRepository extends MongoRepository<Leave, String>{
	
	@Query("{'uemail':?0}")
	public  List<Leave> findListofLeavesByUemail(String uemail);
	
	@Query("{'memail':?0}")
	public  List<Leave> findListofLeavesByMemail(String memail);
}
