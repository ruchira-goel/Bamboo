


package com.bamboo.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "DailyInfo")
public class DailyInfo {
    @Id
    String id;
    String userId;
    String date;
    ArrayList<String> meals; //ids of meals
    private ArrayList<String> activities;

    public ArrayList<String> getActivities() {
        return activities;
    }

    public DailyInfo(String userId, String date) {
        this.userId = userId;
        this.date = date;
        this.meals = new ArrayList<>();
    }

    public void addActivity(String activity) {
        activities.add(activity);
    }

    public void addMeal(String mealId) {
        this.meals.add(mealId);
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ArrayList<String> getMeals() {
        return meals;
    }
}