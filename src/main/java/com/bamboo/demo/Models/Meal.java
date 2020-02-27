package com.bamboo.demo.Models;

import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Meals")
public class Meal {
    @Id
    private String id;
    private String userId;
    private String name;
    private long calories;
    private long fat;
    private long carbs;
    private long protein;


    //private NutritionInfo nutritionInfo;

    public long getCalories() {
        return calories;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setCalories(long calories) {
        this.calories = calories;
    }

    public long getFat() {
        return fat;
    }

    public void setFat(long fat) {
        this.fat = fat;
    }

    public long getCarbs() {
        return carbs;
    }

    public void setCarbs(long carbs) {
        this.carbs = carbs;
    }

    public long getProtein() {
        return protein;
    }

    public void setProtein(long protein) {
        this.protein = protein;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //public NutritionInfo getNutritionInfo() {
//        return nutritionInfo;
//    }

//    public void setNutritionInfo(NutritionInfo nutritionInfo) {
//        this.nutritionInfo = nutritionInfo;
//    }
}
