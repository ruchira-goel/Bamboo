package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.Activity;
import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.ActivityRepo;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.json.JSONException;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class ActivityHandler {
    private ActivityRepo activityRepo;
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;

    public ActivityHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo, ActivityRepo activityRepo) {
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        this.activityRepo = activityRepo;
    }

    public Activity saveActivity(String userId, String activityName, int time, int calories) throws JSONException {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date currentDate = new Date(System.currentTimeMillis());
        String date = formatter.format(currentDate);
        Activity activity = new Activity(userId, activityName, calories, time);
        this.activityRepo.save(activity);

        addToDate(date, activity);

        return activity;
    }


    public void addToDate(String date, Activity activity) {
        String userId = activity.getUserId();
        User user = this.userRepo.findById(userId).get();
        String dailyInfoId;
        DailyInfo dailyInfo;
        if (!user.getDailyInfo().containsKey(date)) {
            dailyInfo = new DailyInfo(userId, date);
            this.dailyInfoRepo.save(dailyInfo);
            dailyInfoId = dailyInfo.getId();
            user.getDailyInfo().put(date, dailyInfoId);
            this.userRepo.save(user);
        } else {
            dailyInfoId = user.getDailyInfo().get(date);
            dailyInfo = this.dailyInfoRepo.findById(dailyInfoId).get();
        }
        dailyInfo.addActivity(activity.getId());
        this.dailyInfoRepo.save(dailyInfo);

    }

    public List<Activity> display() {
        return this.activityRepo.findAll();
    }

    public void del() {
        this.activityRepo.deleteAll();
    }
}
