package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.ActivityHandler;
import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.ActivityRepo;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.GoalRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class ActivityController {
    private ActivityHandler activityHandler;

    public ActivityController(ActivityRepo activityRepo, DailyInfoRepo dailyInfoRepo,
                              UserRepo userRepo, GoalRepo goalRepo) {
        this.activityHandler = new ActivityHandler(userRepo, dailyInfoRepo, activityRepo, goalRepo);
    }

    @RequestMapping("/Activity/saveActivity")          //save activity
    public Activity saveActivity(@RequestParam(value = "userId") String userId,
                                 @RequestParam(value = "activityName") String activityName,
                                 @RequestParam(value = "time") int time,
                                 @RequestParam(value = "distance") double distance,
                                 @RequestParam(value = "date") Date date) throws IOException {
        return activityHandler.saveActivity(userId, activityName, time, distance, date);
    }

    @RequestMapping("/Activity/addToFavorites")
    public Activity addToFavorites(@RequestParam(value = "activityId") String activityId,
                               @RequestParam(value = "userId") String userId) {
        return activityHandler.addToFavorites(activityId, userId);
    }

    @RequestMapping("/Activity/getFavorites")
    public ArrayList<Activity> getFavorites(@RequestParam(value = "userId") String userId) {
        return activityHandler.getFavorites(userId);
    }

    @RequestMapping("Activity/deleteFavorite")
    public boolean deleteFavorite(@RequestParam(value = "userId") String userId,
                                  @RequestParam(value = "activityId") String activityId) {
        return activityHandler.deleteFavorite(userId, activityId);
    }

    @RequestMapping("/Activity/saveActivityFromFavorites")
    public boolean saveActivityFromFavorites(@RequestParam(value = "userId") String userId,
                                         @RequestParam(value = "activityId") String activityId,
                                         @RequestParam(value = "date") String date) {
        return this.activityHandler.saveActivityFromFavorites(userId, activityId, date);
    }

    @RequestMapping("/Activity/all")
    public List<Activity> users() {
        return activityHandler.display();
    }

    @RequestMapping("/Activity/delAll")
    public void del() {
        this.activityHandler.del();
    }
}
