package com.bamboo.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashMap;

@Document(collection = "Goals")
public class Goal {
    @Id
    String id;
    String userId;
    String name;
    Type type;
    Duration duration;
    LimitType limitType;
    TrackedItem trackedItem;
    int amount;
    HashMap<Date, Double> goalProgress;

    public Goal(String userId, Type type, Duration duration, LimitType limitType,
                TrackedItem trackedItem, int amount) {
        this.userId = userId;
        this.type = type;
        this.duration = duration;
        this.limitType = limitType;
        this.trackedItem = trackedItem;
        this.amount = amount;
        this.goalProgress = new HashMap<>();
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
}
