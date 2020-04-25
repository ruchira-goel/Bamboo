package com.bamboo.demo.Models;

import com.bamboo.demo.Repos.ActivityRepo;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.GoalRepo;
import com.bamboo.demo.Repos.MealRepo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Optional;

@Document(collection = "Goals")
public class Goal {
    @Id
    String id;
    String userId;
    String name;
    Type type;
    Duration duration;
    LimitType limitType;
    HashMap<String, Double> goalProgress;       //String is a date and Double is the progress
    TrackedItem trackedItem;
    int amount;

    public void setGoalProgress(String date, double progress) {
        this.goalProgress.put(date, progress);
    }

    public Goal(String userId, Type type, Duration duration, LimitType limitType,
                TrackedItem trackedItem, int amount) {
        this.userId = userId;
        this.type = type;
        this.duration = duration;
        this.goalProgress = new HashMap<>();
        this.limitType = limitType;
        this.trackedItem = trackedItem;
        this.amount = amount;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public LimitType getLimitType() {
        return limitType;
    }

    public void setLimitType(LimitType limitType) {
        this.limitType = limitType;
    }

    public TrackedItem getTrackedItem() {
        return trackedItem;
    }

    public void setTrackedItem(TrackedItem trackedItem) {
        this.trackedItem = trackedItem;
    }

    public double getGoalProgress(String date) {
        if (!goalProgress.containsKey(date)) {
            return 0.0;
        }
        return goalProgress.get(date);
    }

    public boolean checkMealProgress(MealRepo mealRepo, DailyInfoRepo dailyInfoRepo,
                                     GoalRepo goalRepo, String date) {
        Optional<DailyInfo> dailyInfoOpt = dailyInfoRepo.findByDateAndAndUserId(date, this.userId);
        if (!dailyInfoOpt.isPresent()) {
            this.setGoalProgress(date, 0);
            goalRepo.save(this);
            return false;
        }
        DailyInfo dailyInfo = dailyInfoOpt.get();
        double currentAmount = 0;

        if (this.limitType == LimitType.GREATERTHAN) {
            if (dailyInfo.getMeals().isEmpty()) {
                this.setGoalProgress(date, 0);
                goalRepo.save(this);
                return false;
            }
            for (String mealId : dailyInfo.getMeals()) {
                Meal meal = mealRepo.findById(mealId).get();
                currentAmount += meal.getValue(this.trackedItem);
            }
            this.setGoalProgress(date, currentAmount / this.amount);
        } else {
            if (dailyInfo.getMeals().isEmpty()) {
                this.setGoalProgress(date, 1.0);
                goalRepo.save(this);
                return false;
            }
            for (String mealId : dailyInfo.getMeals()) {
                Meal meal = mealRepo.findById(mealId).get();
                currentAmount += meal.getValue(this.trackedItem);
            }
            if (currentAmount > this.amount) {
                this.setGoalProgress(date, 1.0 - (currentAmount - this.amount) / this.amount);
            } else {
                this.setGoalProgress(date, 1.0);
            }
        }
        goalRepo.save(this);
        if (this.limitType == LimitType.LESSTHAN && currentAmount <= this.amount) {
            return true;
        }
        if (this.limitType == LimitType.GREATERTHAN && currentAmount >= this.amount) {
            return true;
        }
        return false;
    }

    public boolean checkExerciseProgress(ActivityRepo activityRepo, DailyInfoRepo dailyInfoRepo,
                                         GoalRepo goalRepo, String date) {
        Optional<DailyInfo> dailyInfoOpt = dailyInfoRepo.findByDateAndAndUserId(date, this.userId);
        if (!dailyInfoOpt.isPresent()) {
            setGoalProgress(date, 0);
            goalRepo.save(this);
            return false;
        }
        DailyInfo dailyInfo = dailyInfoOpt.get();
        double currentAmount = 0;

        if (this.limitType == LimitType.GREATERTHAN) {
            if (dailyInfo.getActivities().isEmpty()) {
                setGoalProgress(date, 0);
                goalRepo.save(this);
                return false;
            }
            for (String activityId : dailyInfo.getActivities()) {
                Activity activity = activityRepo.findById(activityId).get();
                currentAmount += activity.getValue(this.trackedItem);
            }
            setGoalProgress(date, currentAmount / this.amount);
        } else {
            if (dailyInfo.getActivities().isEmpty()) {
                this.setGoalProgress(date, 1.0);
                goalRepo.save(this);
                return false;
            }
            for (String activityId : dailyInfo.getActivities()) {
                Activity activity = activityRepo.findById(activityId).get();
                currentAmount += activity.getValue(this.trackedItem);
            }
            if (currentAmount > this.amount) {
                this.setGoalProgress(date, 1.0 - (currentAmount - this.amount) / this.amount);
            } else {
                this.setGoalProgress(date, 1.0);
            }

        }
        goalRepo.save(this);
        if (this.limitType == LimitType.LESSTHAN && currentAmount <= this.amount) {
            return true;
        }
        if (this.limitType == LimitType.GREATERTHAN && currentAmount >= this.amount) {
            return true;
        }
        return false;
    }
}
