package com.bamboo.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "Activity")
public class Activity {
    @Id
    private String id;
    private String userId;
    private String type;
    private int calories;
    private int minutes;
    private static final HashMap<String, Double> METValues = new HashMap<String, Double>() {{
        put("general", 7.5);
        put("stationary bicycling", 7.0);
        put("elliptical trainer", 5.0);
        put("jump rope", 11.0);
        put("weight training", 5.0);
        put("pilates", 3.0);
        put("rowing", 6.0);
        put("aerobic", 7.3);
        put("jogging", 7.0);
        put("running 4-0", 6.0);
        put("running 5-0", 8.3);
        put("running 5-2", 9.0);
        put("running 6-0", 9.8);
        put("running 6-7", 10.5);
        put("running 7-0", 11.0);
        put("running 7-5", 11.8);
        put("running 8-0", 11.8);
        put("running 8-6", 12.3);
        put("running 9-0", 12.8);
        put("running 10-0", 14.5);
        put("running 11-0", 16.0);
        put("running 12-0", 19.0);
        put("running 13-0", 19.8);
        put("running 14-0", 23.0);
        put("basketball", 6.5);
        put("boxing", 5.5);
        put("badminton", 5.5);
        put("football", 8.0);
        put("golf", 4.8);
        put("ping pong", 4.0);
        put("soccer", 7.0);
        put("baseball/softball", 5.0);
        put("tennis", 7.3);
        put("volleyball", 3.0);
        put("wrestling", 6.0);
        put("canoeing", 3.5);
        put("kayaking", 5.0);
        put("jet skiing", 7.0);
        put("scuba diving", 7.0);
        put("surfing", 3.0);
        put("swimming", 6.0);
        put("ice skating", 7.0);
        put("skiing", 7.0);
        put("sledding", 7.0);
        put("snowboarding", 4.3);
        put("ice hockey", 8.0);
    }};
    

    public Activity(String userId, String type, int minutes) {
        this.userId = userId;
        this.type = type;
        this.minutes = minutes;
    }

//    public void initMET() {
//        put("general", 7.5);
//        put("stationary bicycling", 7.0);
//        put("elliptical trainer", 5.0);
//        put("jump rope", 11.0);
//        put("weight training", 5.0);
//        put("pilates", 3.0);
//        put("rowing", 6.0);
//        put("aerobic", 7.3);
//        put("jogging", 7.0);
//        put("running 4-0", 6.0);
//        put("running 5-0", 8.3);
//        put("running 5-2", 9.0);
//        put("running 6-0", 9.8);
//        put("running 6-7", 10.5);
//        put("running 7-0", 11.0);
//        put("running 7-5", 11.8);
//        put("running 8-0", 11.8);
//        put("running 8-6", 12.3);
//        put("running 9-0", 12.8);
//        put("running 10-0", 14.5);
//        put("running 11-0", 16.0);
//        put("running 12-0", 19.0);
//        put("running 13-0", 19.8);
//        put("running 14-0", 23.0);
//        put("basketball", 6.5);
//        put("boxing", 5.5);
//        put("badminton", 5.5);
//        put("football", 8.0);
//        put("golf", 4.8);
//        put("ping pong", 4.0);
//        put("soccer", 7.0);
//        put("baseball/softball", 5.0);
//        put("tennis", 7.3);
//        put("volleyball", 3.0);
//        put("wrestling", 6.0);
//        put("canoeing", 3.5);
//        put("kayaking", 5.0);
//        put("jet skiing", 7.0);
//        put("scuba diving", 7.0);
//        put("surfing", 3.0);
//        put("swimming", 6.0);
//        put("ice skating", 7.0);
//        put("skiing", 7.0);
//        put("sledding", 7.0);
//        put("snowboarding", 4.3);
//        put("ice hockey", 8.0);
//    }

    public HashMap<String, Double> getMETValues() {
        return METValues;
    }

    public String getId() {
        return id;
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
}
