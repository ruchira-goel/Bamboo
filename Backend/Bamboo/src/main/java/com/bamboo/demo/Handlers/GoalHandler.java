package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.*;

import java.util.List;

public class GoalHandler {
    private MealRepo mealRepo;
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;
    private GoalRepo goalRepo;
    private ActivityRepo activityRepo;

    public GoalHandler(MealRepo mealRepo, UserRepo userRepo, DailyInfoRepo dailyInfoRepo, GoalRepo goalRepo,
                       ActivityRepo activityRepo) {
        this.mealRepo = mealRepo;
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        this.goalRepo = goalRepo;
        this.activityRepo = activityRepo;
    }

    public Goal addGoal(String userId, String type, String limitType, int amount,
                        String trackedItem, String duration) {

        String name = limitType + " " + amount + " of " + trackedItem + " per " + duration;
        System.out.println(Type.valueOfType(type));
        System.out.println(LimitType.valueOfLimitType(limitType));
        System.out.println(TrackedItem.valueOfTrackedItem(trackedItem));
        System.out.println(Duration.valueOfDuration(duration));

        Goal goal = new Goal(userId, Type.valueOfType(type), Duration.valueOfDuration(duration),
                LimitType.valueOfLimitType(limitType), TrackedItem.valueOfTrackedItem(trackedItem), amount);
        goal.setName(name);
        this.goalRepo.save(goal);

        User user = this.userRepo.findUserByUserId(userId);
        user.addGoalId(goal.getId());
        this.userRepo.save(user);
        return goal;
    }

    public List<Goal> display() {
        return this.goalRepo.findAll();
    }

    public void del() {
        this.goalRepo.deleteAll();
    }
}