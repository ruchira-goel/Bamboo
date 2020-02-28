package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.DIHandler;
import com.bamboo.demo.Handlers.UserHandler;
import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.Sex;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.DailyInfoRepo;
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

    public UserController(UserRepo userRepo, DailyInfoRepo di) {
        this.userHandler = new UserHandler(userRepo, di); //Check
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
    public User addCharacteristics(@RequestParam(value = "email") String email,
                                   @RequestParam(value = "height") double height,
                                   @RequestParam(value = "weight") double weight,
                                   @RequestParam(value = "age") int age,
                                   @RequestParam(value = "sex") String sex) throws IllegalAccessException {
        System.out.println("email is " + email);
        Sex sexEnum = Sex.OTHER;
        switch (sex) {
            case "Female":
                sexEnum = Sex.FEMALE;
                break;
            case "Male":
                sexEnum = Sex.MALE;
                break;
            case "Other":
                sexEnum = Sex.OTHER;
                break;

        }
        return userHandler.addCharacteristics(email, height, weight, age, sexEnum);
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
    public User getCharacteristics(@RequestParam(value = "email") String email) throws IllegalAccessException {
        System.out.println("email is " + email);
        return userHandler.getCharacteristics(email);
    }

    @RequestMapping("/User/addDailyInfo")              // add daily input request
    public User addDailyInput(@RequestParam(value = "email") String email,
                              @RequestParam(value = "dailyInfo") DailyInfo dailyInfo) throws IllegalAccessException {
        System.out.println("email is " + email);
        return userHandler.addDailyInfo(email, dailyInfo);
    }

//    @RequestMapping("/User/addActivity")              // add daily input request
//    public User addActivity(@RequestParam(value = "email") String email,
//                            @RequestParam(value = "id") String id,
//                            @RequestParam(value = "type") String type,
//                            @RequestParam(value = "calories") int calories,
//                            @RequestParam(value = "minutes") int minutes,
//                            @RequestParam(value = "date") Date date)throws IllegalAccessException {
//        System.out.println("email is " + email);
//        return userHandler.addActivity(email, id, type, calories, minutes, date);
//    }


    @RequestMapping("/User/changePass")          //login request
    public User changePass(@RequestParam(value = "email") String email,
                      @RequestParam(value = "encryptedPassword") String encryptedPassword) throws IllegalAccessException {
        return userHandler.changePass(email, encryptedPassword);
    }
}
