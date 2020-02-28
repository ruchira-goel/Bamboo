package com.bamboo.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Activity")
public class Activity {
    @Id
    private String id;
    private String userId;
    private String type;
    private int calories;
    private int minutes;

    public Activity(String userId, String type, int calories, int minutes) {
        this.userId = userId;
        this.type = type;
        this.calories = calories;
        this.minutes = minutes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public int getCalories() {
        return calories;
    }

    public int getMinutes() {
        return minutes;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
