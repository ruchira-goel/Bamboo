package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Repos.DailyInfoRepo;

import java.util.List;

public class DIHandler {
    private DailyInfoRepo dailyInfoRepo;

    public DIHandler(DailyInfoRepo dailyInfoRepo) {
        this.dailyInfoRepo = dailyInfoRepo;
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
