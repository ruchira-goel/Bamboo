package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.Goal;
import com.bamboo.demo.Models.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GoalRepo extends MongoRepository<Goal, String> {
    Optional<Goal> findById(String goaId);
}
