package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.GoalHandler;
import com.bamboo.demo.Models.Goal;
import com.bamboo.demo.Models.Meal;
import com.bamboo.demo.Repos.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GoalController {

    private GoalHandler goalHandler;

    public GoalController(MealRepo mealRepo, DailyInfoRepo dailyInfoRepo, UserRepo userRepo,
                          GoalRepo goalRepo, ActivityRepo activityRepo) {
        this.goalHandler = new GoalHandler(mealRepo, userRepo, dailyInfoRepo, goalRepo,activityRepo);
    }

    @RequestMapping("/Goal/addGoal")
    public Goal addGoal(@RequestParam(value = "userId") String userId,
                        @RequestParam(value = "type") String type,
                        @RequestParam(value = "limitType") String limitType,
                        @RequestParam(value = "amount") int amount,
                        @RequestParam(value = "trackedItem") String trackedItem,
                        @RequestParam(value = "duration") String duration) {
        return this.goalHandler.addGoal(userId, type, limitType, amount,trackedItem, duration);
    }

    @RequestMapping("/Goal/all")
    public List<Meal> users() {
        return goalHandler.display();
    }

    @RequestMapping("/Goal/delAll")
    public void del() {
        this.goalHandler.del();
    }

}
