package com.bamboo.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashMap;

@Document(collection = "Activity")
public class Activity {
    @Id
    private String id;
    private String userId;
    private String type;
    private int calories;
    private int minutes;
    private HashMap<String, Double> METValues = new HashMap<>();

    public Activity(String userId, String type, int calories, int minutes) {
        this.userId = userId;
        this.type = type;
        this.calories = calories;
        this.minutes = minutes;
        initMET();
    }

    public void initMET() {
        METValues.put("bicycling", 7.5);
        METValues.put("bicycling stationary", 7.0);
        METValues.put("elliptical", 5.0);
        METValues.put("rope skipping", 11.0);
        METValues.put("stair treadmill", 9.0);
        METValues.put("pilates", 3.0);
        METValues.put("rowing", 6.0);
        METValues.put("aerobics", 7.3);
        METValues.put("jogging", 7.0);
        METValues.put("running 4.0", 6.0);
        METValues.put("running 5.0", 8.3);
        METValues.put("running 5.2", 9.0);
        METValues.put("running 6.0", 9.8);
        METValues.put("running 6.7", 10.5);
        METValues.put("running 7.0", 11.0);
        METValues.put("running 7.5", 11.8);
        METValues.put("running 8.0", 11.8);
        METValues.put("running 8.6", 12.3);
        METValues.put("running 9.0", 12.8);
        METValues.put("running 10.0", 14.5);
        METValues.put("running 11.0", 16.0);
        METValues.put("running 12.0", 19.0);
        METValues.put("running 13.0", 19.8);
        METValues.put("running 14.0", 23.0);
        METValues.put("basketball", 6.5);
        METValues.put("boxing", 5.5);
        METValues.put("badminton", 5.5);
        METValues.put("football", 8.0);
        METValues.put("golf", 4.8);
        METValues.put("soccer", 7.0);
        METValues.put("softball", 5.0);
        METValues.put("tennis", 7.3);
        METValues.put("volleyball", 3.0);
        METValues.put("wrestling", 6.0);
        METValues.put("canoeing", 3.5);
        METValues.put("kayaking", 5.0);
        METValues.put("jet skiing", 7.0);
        METValues.put("scuba diving", 7.0);
        METValues.put("surfing", 3.0);
        METValues.put("swimming", 6.0);
        METValues.put("ice skating", 7.0);
        METValues.put("skiing", 7.0);
        METValues.put("sledding", 7.0);
        METValues.put("snowboarding", 4.3);
        METValues.put("ice hockey", 8.0);
    }

    public HashMap<String, Double> getMETValues() {
        return METValues;
    }

    public void setMETValues(HashMap<String, Double> METValues) {
        this.METValues = METValues;
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


    public void setCalories(int calories) {
        this.calories = calories;
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
