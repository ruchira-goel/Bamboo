package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);  //find a user by email
    Optional<User> findById(String id);  //find a user by email

}
