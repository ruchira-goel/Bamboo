package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    public boolean deleteGoal(String userId, String goalId) {
        User user = this.userRepo.findUserByUserId(userId);
        user.getGoalIds().remove(goalId);
        this.userRepo.save(user);
        return true;
    }

    public ArrayList<String> fetchGoalInfo(String userId, String goalId) throws IllegalAccessException {
        Optional<Goal> goal = this.goalRepo.findById(goalId);
        if (!goal.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        Goal goalObj = goal.get();
        ArrayList<String> goalArray = new ArrayList<>();
        goalArray.add(goalObj.getId());
        goalArray.add(goalObj.getUserId());
        goalArray.add(goalObj.getName());
        goalArray.add(goalObj.getType().toString());
        goalArray.add(goalObj.getDuration().toString());
        goalArray.add(goalObj.getLimitType().toString());
        goalArray.add(goalObj.getTrackedItem().toString());
        goalArray.add(String.valueOf(goalObj.getAmount()));

        return goalArray;
    }

    public Goal editGoal(String userId, String goalId, String type, String limitType, int amount,
                         String trackedItem, String duration) throws IllegalAccessException {
        System.out.println("User ID" + userId);
        User user = this.userRepo.findUserByUserId(userId);
        Optional<Goal> goal = this.goalRepo.findById(goalId);
        if (!goal.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }

        Goal goalObj = goal.get();
        String name = limitType + " " + amount + " of " + trackedItem + " per " + duration;
        goalObj.setType(Type.fromString(type));
        goalObj.setDuration(Duration.fromString(duration));
        goalObj.setLimitType(LimitType.fromString(limitType));
        goalObj.setTrackedItem(TrackedItem.fromString(trackedItem));
        goalObj.setAmount(amount);
        goalObj.setName(name);

        this.goalRepo.save(goalObj);
        this.userRepo.save(user);
        return goalObj;
    }

    public double fetchGoalProgress(String userId, String goalId) throws IllegalAccessException {
        System.out.println("UserID " + userId);
        System.out.println("GoalId " + goalId);
        User user = this.userRepo.findUserByUserId(userId);
        Optional<Goal> goal = this.goalRepo.findById(goalId);
        if (!goal.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        Goal goalObj = goal.get();

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date currentDate = new Date(System.currentTimeMillis());
        String dateFormat = formatter.format(currentDate);

        System.out.println(dateFormat);

        double goalProgress;

        if (goalObj.getDuration() == Duration.DAY) {
            try {
                goalProgress = goalObj.getGoalProgress(dateFormat);
            } catch (NullPointerException e) {
                goalProgress = 0.0;
            }
        } else {
            Date newDate = currentDate;
            double totalAmount = 0;
            for (int i = 6; i >= 0; i--) {
                newDate = new Date(newDate.getTime() - 2 * i);
                System.out.println("New Date : " + formatter.format(newDate));
                try {
                    double amount = goalObj.getGoalProgress(formatter.format(newDate)) * goalObj.getAmount();
                    totalAmount = totalAmount + amount;
                } catch (NullPointerException e) {
                    totalAmount = totalAmount + 0.0;
                }
            }
            goalProgress = totalAmount / goalObj.getAmount();
        }

        this.goalRepo.save(goalObj);
        this.userRepo.save(user);
        System.out.println("Goal Progress = " + goalProgress * 100);
        return goalProgress * 100;
    }

    public List<Goal> display() {
        return this.goalRepo.findAll();
    }

    public void del() {
        this.goalRepo.deleteAll();
    }
}