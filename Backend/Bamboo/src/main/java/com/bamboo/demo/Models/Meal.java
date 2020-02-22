package com.bamboo.demo.Models;

import java.util.Date;

public class Meal {
    private String id;
    private String name;
    private NutritionInfo nutritionInfo;

    public void addToDate(Date date) {
        //TODO
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

    public NutritionInfo getNutritionInfo() {
        return nutritionInfo;
    }

    public void setNutritionInfo(NutritionInfo nutritionInfo) {
        this.nutritionInfo = nutritionInfo;
    }
}
