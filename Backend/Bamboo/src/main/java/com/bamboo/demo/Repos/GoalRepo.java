package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.Goal;
import com.bamboo.demo.Models.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.List;
import java.util.Optional;

public interface GoalRepo extends MongoRepository<Goal, String> {
    Goal findGoalById(String id);
    List<Goal> findAllByUserId(String userId);
    void deleteAllByUserId(String userId);

}
