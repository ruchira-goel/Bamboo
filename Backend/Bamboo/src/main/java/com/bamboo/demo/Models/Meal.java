package com.bamboo.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Meals")
public class Meal {
    @Id
    private String id;
    private String userId;
    private String name;
    private double calories;
    private double fat;
    private double carbs;
    private double protein;

    public Meal(String userId, String name, double calories, double fat, double carbs, double protein) {
        this.userId = userId;
        this.name = name;
        this.calories = calories;
        this.fat = fat;
        this.carbs = carbs;
        this.protein = protein;
    }

    public double getValue(TrackedItem trackedItem) {
        if(trackedItem ==  TrackedItem.G_OF_PROTEIN) {
            return this.protein;
        } else if (trackedItem == TrackedItem.CALORIES) {
            return this.calories;
        }
        return 0;
    }

    //private NutritionInfo nutritionInfo;

    public double getCalories() {
        return calories;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
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
