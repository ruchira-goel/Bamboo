package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.ActivityHandler;
import com.bamboo.demo.Handlers.DIHandler;
import com.bamboo.demo.Handlers.MealHandler;
import com.bamboo.demo.Handlers.UserHandler;
import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.Sex;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.ActivityRepo;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.MealRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.Date;
import java.util.List;

@RestController
public class UserController {
    private UserHandler userHandler;
    private DIHandler di;
    private ActivityHandler activityHandler;
    private MealHandler mealHandler;

    public UserController(UserRepo userRepo, DailyInfoRepo di, MealRepo mealRepo, ActivityRepo activityRepo) {
        this.userHandler = new UserHandler(userRepo, di, mealRepo, activityRepo); //Check
        this.di = new DIHandler(di);

    }

    @RequestMapping("/User/login")          //login request
    public User login(@RequestParam(value = "email") String email,
                      @RequestParam(value = "encryptedPassword") String encryptedPassword) throws IllegalAccessException {
        return userHandler.loginUser(email, encryptedPassword);
    }

    @RequestMapping("/User/signup")          //signup request
    public User signup(@RequestParam(value = "name") String name,
                       @RequestParam(value = "email") String email,
                       @RequestParam(value = "password") String password) throws IllegalAccessException {
        return userHandler.signupUser(name, email, password);
    }

    @RequestMapping("/User/addCharacteristics")          //add health characteristics request
    public User addCharacteristics(@RequestParam(value = "userId") String userId,
                                   @RequestParam(value = "height") double height,
                                   @RequestParam(value = "weight") double weight,
                                   @RequestParam(value = "age") int age,
                                   @RequestParam(value = "sex") String sex) throws IllegalAccessException {
        //System.out.println("email is " + email);
        Sex sexEnum = Sex.OTHER;
        switch (sex) {
            case "Female":
            case "FEMALE":
                sexEnum = Sex.FEMALE;
                break;
            case "Male":
            case "MALE":
                sexEnum = Sex.MALE;
                break;
            case "Other":
            case "OTHER":
                sexEnum = Sex.OTHER;
                break;

        }
        return userHandler.addCharacteristics(userId, height, weight, age, sexEnum);
    }

    @RequestMapping("/User/all")
    public List<User> users() {
        return userHandler.display();
    }

    @RequestMapping("/User/delAll")
    public void delete() {
        userHandler.delete();
    }

    @RequestMapping("/DI/all")
    public List<DailyInfo> di() {
        return di.display();
    }

    @RequestMapping("/DI/delAll")
    public void del() {
        di.del();
    }

    @RequestMapping("/User/getCharacteristics")
    public User getCharacteristics(@RequestParam(value = "userId") String userId) throws IllegalAccessException {
        return userHandler.getCharacteristics(userId);
    }

    @RequestMapping("/User/addDailyInfo")              // add daily input request
    public User addDailyInput(@RequestParam(value = "userId") String userId,
                              @RequestParam(value = "dailyInfo") DailyInfo dailyInfo) throws IllegalAccessException {
        return userHandler.addDailyInfo(userId, dailyInfo);
    }

    @RequestMapping("/User/delAccount")
    public boolean deleteAccount(@RequestParam(value = "userId") String userId) {
        return this.userHandler.deleteAccount(userId);
    }

    @RequestMapping("/User/changePass")          //login request
    public User changePass(@RequestParam(value = "userId") String userId,
                           @RequestParam(value = "encryptedPassword") String encryptedPassword) throws IllegalAccessException {
        return userHandler.changePass(userId, encryptedPassword);
    }

    @RequestMapping("/User/weekExerciseTime")
    public String weekExerciseTime(@RequestParam(value = "userId") String userId) {
        return userHandler.getWeekExerciseTime(userId);
    }

    @RequestMapping("/User/weekExerciseCalories")
    public String weekExerciseCalories(@RequestParam(value = "userId") String userId) {
        return userHandler.getWeekExerciseCalories(userId);
    }

    @RequestMapping("/User/weekCaloriesConsumption")
    public String weekCaloriesConsumption(@RequestParam(value = "userId") String userId) {
        return userHandler.getWeekCaloriesConsumption(userId);
    }
}
