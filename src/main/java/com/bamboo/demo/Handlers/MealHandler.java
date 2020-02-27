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



public class MealHandler {
    private MealRepo mealRepo;
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;

    public MealHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo, MealRepo mealRepo) {
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        this.mealRepo = mealRepo;

    }


    public void saveMealFromLink(String link, String email) throws IOException {
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


        URL url = new URL("https://api.spoonacular.com/recipes/extract?apiKey=5ccdaac983d344338fe187bb2b7e5501&url=" + link);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-type", "application/json");
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String jsonText = in.readLine();
        JSONObject

    }


    public void addToDate(Date date, String mealId) {
        //TODO
        Meal meal = this.mealRepo.findById(mealId).get();
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
        dailyInfo.addMeal(mealId);
        this.dailyInfoRepo.save(dailyInfo);

    }

    public List<Meal> display() {
        return this.mealRepo.findAll();
    }
}
