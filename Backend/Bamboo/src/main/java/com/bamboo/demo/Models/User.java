package com.bamboo.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Document(collection = "Users")
public class User {
    @Id
    private String userId;
    private String name;
    private String email;
    private String encryptedPassword;
    private double height;                       //unit - cms, kgs
    private double weight;
    private int age;                            //changes
    private Sex sex;
    private Lifestyle lifestyle;
    private ArrayList<String> goalIds;
    private HashMap<String, String> dailyInfo;    //String is id of the daily info obj
    private ArrayList<String> favMeals;
    private ArrayList<String> favExerciseRoutine;
    private boolean isMetric;
    //private HashMap<String, List<Object>> nutrientLimits;
    private HashMap<String, String> nutrientLimits; //e.g. proteinHigh --> 50
    private ArrayList<String> allergies;
    private Diet diet;

    public Diet getDiet() {
        return diet;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }

    public ArrayList<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(ArrayList<String> allergies) {
        this.allergies = allergies;
    }

    public Lifestyle getLifestyle() {
        return lifestyle;
    }

    public void setLifestyle(Lifestyle lifestyle) {
        this.lifestyle = lifestyle;
    }

    //notification settings:
    boolean dailyInputReminder;
    boolean goalStreakNotif;

    public boolean isGoalStreakNotif() {
        return goalStreakNotif;
    }

    public void setGoalStreakNotif(boolean goalStreakNotif) {
        this.goalStreakNotif = goalStreakNotif;
    }

    public boolean isDailyInputReminder() {
        return dailyInputReminder;
    }

    public void setDailyInputReminder(boolean dailyInputReminder) {
        this.dailyInputReminder = dailyInputReminder;
    }

    public boolean isMetric() {
        return isMetric;
    }

    public void setMetric(boolean metric) {
        isMetric = metric;
    }

    public void addGoalId(String goalId) {
        this.goalIds.add(goalId);
    }

    public ArrayList<String> getGoalIds() {
        return goalIds;
    }

    public ArrayList<String> getFavMeals() {
        return favMeals;
    }

    public ArrayList<String> getFavExerciseRoutine() {
        return favExerciseRoutine;
    }

    public User(String email, String encryptedPassword) {
        this.email = email;
        this.encryptedPassword = encryptedPassword;
        this.dailyInfo = new HashMap<>();
        this.goalIds = new ArrayList<>();
        this.favMeals = new ArrayList<>();
        this.favExerciseRoutine = new ArrayList<>();

        //initialize all notifications to be true
        this.dailyInputReminder = true;
        this.nutrientLimits = new HashMap<>();
        this.allergies = new ArrayList<>();
        this.diet =  Diet.UNSPECIFIED;
        this.lifestyle = Lifestyle.UNSPECIFIED;
    }

    public HashMap<String, String> getDailyInfo() {
        return dailyInfo;
    }

    public HashMap<String, String> getNutrientLimits() {
        return nutrientLimits;
    }

    public void setNutrientLimits(HashMap<String, String> nutrientLimits) {
        this.nutrientLimits = nutrientLimits;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return email.equals(user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, encryptedPassword);
    }
}
