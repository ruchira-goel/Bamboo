package com.bamboo.demo.Models;

import java.util.Date;

public class Activity {
    private String id;
    private String type;
    private int calories;
    private int minutes;
    private Date date;

    public Activity(String id, String type, int calories, int minutes, Date date) {
        this.id = id;
        this.type = type;
        this.calories = calories;
        this.minutes = minutes;
        this.date = date;
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

    public int getMinutes() {
        return minutes;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
