package com.example.employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/login")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@PostMapping
	public User saveUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	@GetMapping
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/{email}")
	public User getUserByEmail(@PathVariable String email) {
		User user = userRepository.findUserByEmail(email);
		return user;
	}
	
	@GetMapping("/managers")
	public List<User> getManagers() {
		return userRepository.findManagers();
	}
}
