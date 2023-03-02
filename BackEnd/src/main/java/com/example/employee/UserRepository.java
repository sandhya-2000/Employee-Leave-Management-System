package com.example.employee;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {

	@Query("{'email':?0}")
	public User findUserByEmail(String email);
	
	@Query("{'role':{$eq:'manager'}}")
	public List<User> findManagers();
	
	
	
	
//	LookupOperation lookupOperation = LookupOperation.newLookup().
//            from("leave").
//            localField("email").
//            foreignField("email").
//            as("listOfLeaves");
//
//AggregationOperation match = Aggregation.match(Criteria.where("listOfLeaves").size(1));
//
//
//Aggregation aggregation = Aggregation.newAggregation(lookupOperation, match);
//
//List<BasicDBObject> results = mongoOperation.aggregate(aggregation, "users", BasicDBObject.class).getMappedResults();

}
