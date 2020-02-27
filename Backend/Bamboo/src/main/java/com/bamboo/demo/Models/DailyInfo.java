


package com.bamboo.demo.Models;

import com.bamboo.demo.Repos.DailyInfoRepo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "DailyInfo")
public class DailyInfo {
    @Id
    String id;
    String userId;
    Date date;
    ArrayList<String> meals; //ids of meals
    //private static DailyInfoRepo dailyInfoRepo;

    public DailyInfo(String userId, Date date) {
        this.userId = userId;
        this.date = date;
        this.meals = new ArrayList<>();
        //this.dailyInfoRepo =
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ArrayList<String> getMeals() {
        return meals;
    }
}