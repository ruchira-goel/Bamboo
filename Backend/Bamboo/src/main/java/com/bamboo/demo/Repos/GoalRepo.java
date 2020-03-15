package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.Goal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GoalRepo extends MongoRepository<Goal, String> {
}
