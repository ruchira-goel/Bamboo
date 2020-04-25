package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.*;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

//TODO: Add checkMealProgress and checkExerciseProgress in fetchProgress

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
        this.goalRepo.deleteById(goalId);
        this.userRepo.save(user);
        return true;
    }

    public ArrayList<String> fetchGoalInfo(String userId, String goalId) throws IllegalAccessException {
        Optional<Goal> goal = this.goalRepo.findById(goalId);
        if (!goal.isPresent()) {
            throw new IllegalAccessException("There was an error locating your goal, please try adding the goal again!");
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
        User user = this.userRepo.findUserByUserId(userId);
        Optional<Goal> goal = this.goalRepo.findById(goalId);
        if (!goal.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        Goal goalObj = goal.get();

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date currentDate = new Date(System.currentTimeMillis());
        String dateFormat = formatter.format(currentDate);

        double goalProgress = 0.0;

        if (goalObj.getType() == Type.MEAL) {
            if (goalObj.getDuration() == Duration.DAY) {
                try {
                    goalObj.checkMealProgress(mealRepo, dailyInfoRepo, goalRepo, dateFormat);
                    goalProgress = goalObj.getGoalProgress(dateFormat);
                } catch (NullPointerException e) {
                    goalProgress = 0.0;
                }
            } else {
                Calendar cal = Calendar.getInstance();
                cal.add(Calendar.DAY_OF_WEEK, -(cal.get(Calendar.DAY_OF_WEEK) - 2));
                Date newDate = cal.getTime();
                String newDateF = formatter.format(newDate);
                while (!newDateF.equals(dateFormat)) {
                    goalObj.checkMealProgress(mealRepo, dailyInfoRepo, goalRepo, newDateF);
                    goalProgress = goalProgress + goalObj.getGoalProgress(newDateF);
                    Instant current = newDate.toInstant();
                    current = current.plus(1, ChronoUnit.DAYS);
                    newDate = Date.from(current);
                    newDateF = formatter.format(newDate);
                }
                goalObj.checkExerciseProgress(activityRepo, dailyInfoRepo, goalRepo, newDateF);
                goalProgress = goalProgress + goalObj.getGoalProgress(newDateF);
            }
        } else {
            if (goalObj.getDuration() == Duration.DAY) {
                try {
                    goalObj.checkExerciseProgress(activityRepo, dailyInfoRepo, goalRepo, dateFormat);
                    goalProgress = goalObj.getGoalProgress(dateFormat);
                } catch (NullPointerException e) {
                    goalProgress = 0.0;
                }
            } else {
                Calendar cal = Calendar.getInstance();
                cal.add(Calendar.DAY_OF_WEEK, -(cal.get(Calendar.DAY_OF_WEEK) - 2));
                Date newDate = cal.getTime();
                String newDateF = formatter.format(newDate);
                while (!newDateF.equals(dateFormat)) {
                    goalObj.checkExerciseProgress(activityRepo, dailyInfoRepo, goalRepo, newDateF);
                    goalProgress = goalProgress + goalObj.getGoalProgress(newDateF);
                    Instant current = newDate.toInstant();
                    current = current.plus(1, ChronoUnit.DAYS);
                    newDate = Date.from(current);
                    newDateF = formatter.format(newDate);
                }
                goalObj.checkExerciseProgress(activityRepo, dailyInfoRepo, goalRepo, newDateF);
                goalProgress = goalProgress + goalObj.getGoalProgress(newDateF);
            }
        }

        this.goalRepo.save(goalObj);
        this.userRepo.save(user);
        DecimalFormat df = new DecimalFormat("#.##");
        goalProgress = Double.parseDouble(df.format(goalProgress * 100));
        return goalProgress;
    }

    public List<Goal> display() {
        return this.goalRepo.findAll();
    }

    public void del() {
        this.goalRepo.deleteAll();
    }
}