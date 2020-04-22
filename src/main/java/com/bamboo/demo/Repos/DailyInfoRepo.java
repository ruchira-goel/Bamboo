package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.Meal;
import com.bamboo.demo.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DailyInfoRepo extends MongoRepository<DailyInfo, String> {
    Optional<DailyInfo> findById(String id);
    List<DailyInfo> findAllByUserId(String userId);
    Optional<DailyInfo> findByDateAndAndUserId(String date, String userId);
    void deleteAllByUserId(String userId);
}