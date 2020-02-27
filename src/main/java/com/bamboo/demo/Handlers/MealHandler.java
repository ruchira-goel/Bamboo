package com.bamboo.demo.Handlers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.Meal;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.MealRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.json.JSONException;
import org.json.JSONObject;


public class MealHandler {
    private MealRepo mealRepo;
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;

    public MealHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo, MealRepo mealRepo) {
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        this.mealRepo = mealRepo;

    }


    public Meal saveMealFromLink(String link, String email) throws IOException, JSONException {
//        URL url = new URL("https://api.spoonacular.com/recipes/extract?apiKey=5ccdaac983d344338fe187bb2b7e5501&url=" + link);
//        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//        connection.setRequestMethod("GET");
//        connection.setRequestProperty("Content-type", "application/json");
//        int status = connection.getResponseCode();
//        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//        String inputLine;
//        while ((inputLine = in.readLine()) != null) {
//            System.out.println(inputLine);
//        }
//        in.close();
//        connection.disconnect();

        User user = this.userRepo.findByEmail(email).get();
        String userId = user.getUserId();

        System.out.println("before the first api call");
        URL url = new URL("https://api.spoonacular.com/recipes/extract?apiKey=5ccdaac983d344338fe187bb2b7e5501&url=" + link);
        System.out.println("after the first api call");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-type", "application/json");
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String jsonText = in.readLine();
        JSONObject json = new JSONObject(jsonText);
        String mealName = json.get("title").toString();
        String recipeId = json.get("id").toString();

        URL nutritionURL = new URL("https://api.spoonacular.com/recipes/" + recipeId + "/nutritionWidget.json?apiKey=5ccdaac983d344338fe187bb2b7e5501");
        HttpURLConnection con = (HttpURLConnection) nutritionURL.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-type", "application/json");
        BufferedReader input = new BufferedReader(new InputStreamReader(con.getInputStream()));
        JSONObject nutritionJson = new JSONObject(input.readLine());

        //removing last character to get number for nutrition
        String fatStr = nutritionJson.get("fat").toString();
        double fat = Double.parseDouble(fatStr.substring(0, fatStr.length() - 1));
        String proteinStr = nutritionJson.get("protein").toString();
        double protein = Double.parseDouble(proteinStr.substring(0, proteinStr.length() - 1));
        String carbStr = nutritionJson.get("carbs").toString();
        double carb = Double.parseDouble(carbStr.substring(0, carbStr.length() - 1));
        double calories = Double.parseDouble(nutritionJson.get("calories").toString());
        Meal meal = new Meal(userId, mealName, calories, fat, carb, protein);
        this.mealRepo.save(meal);

        Date currentDate = new Date(System.currentTimeMillis());
        addToDate(currentDate, meal);

        return meal;
    }


    public void addToDate(Date date, Meal meal) {
        String userId = meal.getUserId();
        User user = this.userRepo.findById(userId).get();
        String dailyInfoId;
        DailyInfo dailyInfo;
        if (!user.getDailyInfo().containsKey(date)) {
            dailyInfo = new DailyInfo(userId, date);
            dailyInfoId = dailyInfo.getId();
            user.getDailyInfo().put(date, dailyInfoId);
            this.userRepo.save(user);
        } else {
            dailyInfoId = user.getDailyInfo().get(date);
            dailyInfo = this.dailyInfoRepo.findById(dailyInfoId).get();
        }
        dailyInfo.addMeal(meal.getId());
        this.dailyInfoRepo.save(dailyInfo);

    }

    public List<Meal> display() {
        return this.mealRepo.findAll();
    }
}
