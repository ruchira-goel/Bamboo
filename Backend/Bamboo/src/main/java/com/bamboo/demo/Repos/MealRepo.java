
package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MealRepo extends MongoRepository<Meal, String> {
    Optional<Meal> findById(String mealId);  //find a user by email

}