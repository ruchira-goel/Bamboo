package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.MealHandler;
import com.bamboo.demo.Models.Meal;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.GoalRepo;
import com.bamboo.demo.Repos.MealRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MealController {
    private MealHandler mealHandler;

    public MealController(MealRepo mealRepo, DailyInfoRepo dailyInfoRepo, UserRepo userRepo, GoalRepo goalRepo) {
        this.mealHandler = new MealHandler(userRepo, dailyInfoRepo, mealRepo, goalRepo);
    }

    @RequestMapping("/Meal/infoFromLink")          //meal info from link
    public Meal infoFromLink(@RequestParam(value = "link") String link,
                             @RequestParam(value = "userId") String userId,
                             @RequestParam(value = "date") String date) throws IOException, IllegalAccessException {
        return mealHandler.saveMealFromLink(link, userId, date);
    }

    @RequestMapping("/Meal/infoFromName")          //meal info from name
    public Meal infoFromName(@RequestParam(value = "name") String name,
                             @RequestParam(value = "userid") String userid,
                             @RequestParam(value = "date") String date) throws IOException, IllegalAccessException {
        return mealHandler.saveMealFromName(name, userid, date);
    }

    @RequestMapping("/Meal/infoFromRecipe")
    public Meal infoFromRecipe(@RequestParam(value = "recipe") String recipe,
                               @RequestParam(value = "userId") String userId,
                               @RequestParam(value = "date") String date,
                               @RequestParam(value = "name") String name) throws IOException, IllegalAccessException {
        return mealHandler.saveMealFromRecipe(date, userId, recipe, name);
    }

    @RequestMapping("/Meal/addToFavorites")
    public Meal addToFavorites(@RequestParam(value = "mealId") String mealId,
                               @RequestParam(value = "userId") String userId) {
        return mealHandler.addToFavorites(mealId, userId);
    }

    @RequestMapping("/Meal/getFavorites")
    public ArrayList<Meal> getFavorites(@RequestParam(value = "userId") String userId) {
        return mealHandler.getFavorites(userId);
    }

    @RequestMapping("/Meal/deleteFavorite")
    public boolean deleteFavorite(@RequestParam(value = "userId") String userId,
                                  @RequestParam(value = "mealId") String mealId) {
        return mealHandler.deleteFavorite(userId, mealId);
    }

    @RequestMapping("/Meal/saveMealFromFavorites")
    public boolean saveMealFromFavorites(@RequestParam(value = "userId") String userId,
                                         @RequestParam(value = "mealId") String mealId,
                                         @RequestParam(value = "date") String date) {
        return this.mealHandler.saveMealFromFavorites(userId, mealId, date);
    }

    @RequestMapping("/Meal/all")
    public List<Meal> users() {
        return mealHandler.display();
    }

    @RequestMapping("/Meal/delAll")
    public void del() {
        this.mealHandler.del();
    }

    @RequestMapping("/Meal/getRecommended")
    public ArrayList<Meal> getRecommendedMeals(@RequestParam(value = "userId")String userId,
                                               @RequestParam(value = "calLow")String calLow,
                                               @RequestParam(value = "calHigh")String calHigh,
                                               @RequestParam(value = "fatLow")String fatLow,
                                               @RequestParam(value = "fatHigh")String fatHigh,
                                               @RequestParam(value = "proteinLow")String proteinLow,
                                               @RequestParam(value = "proteinHigh")String proteinHigh,
                                               @RequestParam(value = "carbsLow")String carbsLow,
                                               @RequestParam(value = "carbsHigh")String carbsHigh,
                                               @RequestParam(value = "numMeals")int numMeals) throws IOException {
        return mealHandler.getRecommendedMeals(userId, calLow,calHigh, fatLow, fatHigh,
                proteinLow, proteinHigh, carbsLow, carbsHigh, numMeals);
    }

    @RequestMapping("/Meal/getIng")
    public ArrayList<String> getIng(@RequestParam(value = "userId") String userId,
                                    @RequestParam(value = "mealId") String mealId) throws IOException, IllegalAccessException {
        return mealHandler.getIngredients(mealId, userId);
    }

    @RequestMapping("/Meal/getIns")
    public ArrayList<String> getIng(@RequestParam(value = "mealId") String mealId) throws IOException, IllegalAccessException {
        return mealHandler.getInstructions(mealId);
    }
}
