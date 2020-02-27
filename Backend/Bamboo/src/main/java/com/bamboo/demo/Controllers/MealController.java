package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.MealHandler;
import com.bamboo.demo.Models.Meal;
import com.bamboo.demo.Repos.MealRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.util.List;

@RestController
public class MealController {
    private MealHandler mealHandler;

    public MealController(MealRepo mealRepo) {
        this.mealHandler = new MealHandler(mealRepo);
    }

    @RequestMapping("/Meal/infoFromLink")          //meal info from link
    public void infoFromLink(@RequestParam(value = "link") String link) throws IOException {
        mealHandler.getInfoFromLink(link);
    }

    @RequestMapping("/Meal/all")
    public List<Meal> users() {
        return mealHandler.display();
    }
}
