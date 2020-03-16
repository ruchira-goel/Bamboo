package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.Activity;
import com.bamboo.demo.Models.DailyInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityRepo extends MongoRepository <Activity, String> {
    Optional<Activity> findById(String id);         // find an activity by id
    void deleteAllByUserId(String userId);
    List<DailyInfo> findAllByUserId(String userId);
}