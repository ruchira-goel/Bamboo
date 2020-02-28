package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.MealRepo;
import com.bamboo.demo.Repos.UserRepo;

import java.util.List;

public class DIHandler {
    private MealRepo mealRepo;
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;

    public DIHandler(DailyInfoRepo dailyInfoRepo) {
        //this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        //this.mealRepo = mealRepo;

    }

    public List<DailyInfo> display() {
        return this.dailyInfoRepo.findAll();
    }

    public void del() {
        this.dailyInfoRepo.deleteAll();
    }

    public void delete() {
        this.dailyInfoRepo.deleteAll();
    }
}
