
package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MealRepo extends MongoRepository<Meal, String> {
    Optional<Meal> findById(String mealId);  //find a user by email
    //List<Meal> findAllByUserId(String userId);
    void deleteAllByUserId(String userId);

}