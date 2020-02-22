package com.bamboo.demo.Models;

public class NutritionInfo {
    private long calories;
    private long sodium;
    private long fat;
    private long carbs;
    private long protein;
    private long vitaminA;
    //TODO: add fields

    public long getCalories() {
        return calories;
    }

    public void setCalories(long calories) {
        this.calories = calories;
    }

    public long getSodium() {
        return sodium;
    }

    public void setSodium(long sodium) {
        this.sodium = sodium;
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

    public long getVitaminA() {
        return vitaminA;
    }

    public void setVitaminA(long vitaminA) {
        this.vitaminA = vitaminA;
    }
}
