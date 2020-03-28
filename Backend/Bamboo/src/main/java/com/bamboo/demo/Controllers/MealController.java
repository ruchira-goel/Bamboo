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
                             @RequestParam(value = "userId") String userId) throws IOException, IllegalAccessException {
        return mealHandler.saveMealFromLink(link, userId);
    }

    @RequestMapping("/Meal/infoFromName")          //meal info from name
    public Meal infoFromName(@RequestParam(value = "name") String name,
                             @RequestParam(value = "userid") String userid) throws IOException, IllegalAccessException {
        return mealHandler.saveMealFromName(name, userid);
    }

    @RequestMapping("/Meal/addToFavorites")          //meal info from name
    public Meal addToFavorites(@RequestParam(value = "mealId") String mealId,
                               @RequestParam(value = "userId") String userId) {
        return mealHandler.addToFavorites(mealId, userId);
    }

    @RequestMapping("/Meal/getFavorites")          //meal info from name
    public ArrayList<Meal> getFavorites(@RequestParam(value = "userId") String userId) {
        return mealHandler.getFavorites(userId);
    }

    @RequestMapping("/Meal/deleteFavorite")          //meal info from name
    public boolean deleteFavorite(@RequestParam(value = "userId") String userId,
                               @RequestParam(value = "mealId") String mealId) {
        System.out.println("Returned from mealhandler");
        return mealHandler.deleteFavorite(userId, mealId);
    }

    @RequestMapping("/Meal/all")
    public List<Meal> users() {
        return mealHandler.display();
    }

    @RequestMapping("/Meal/delAll")
    public void del() {
        this.mealHandler.del();
    }
}
