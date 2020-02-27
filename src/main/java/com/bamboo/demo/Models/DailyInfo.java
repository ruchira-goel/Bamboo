package com.bamboo.demo.Models;

import java.util.ArrayList;
import java.util.Date;

public class DailyInfo {
    private String id;
    private Date date;
    private ArrayList<String> meals;
    private ArrayList<String> activities;

    public DailyInfo() {
        this.meals = new ArrayList<>();
        this.activities = new ArrayList<>();
    }

    public DailyInfo(String id, Date date) {
        this.id = id;
        this.date = date;
        this.meals = new ArrayList<>();
        this.activities = new ArrayList<>();
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ArrayList<String> getMeals() {
        return meals;
    }

    public ArrayList<String> getActivities() {
        return activities;
    }

    public void addMeals(String meal) {
        meals.add(meal);
    }

    public void addActivities(String activity) {
        activities.add(activity);
    }

    public String getId() {
        return id;
    }
}
