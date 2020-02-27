package com.bamboo.demo.Repos;

import com.bamboo.demo.Models.Activity;
import com.bamboo.demo.Models.DailyInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DailyInfoRepo extends MongoRepository <DailyInfo, String> {
    Optional<DailyInfo> findById(String id);         // find an activity by id
}