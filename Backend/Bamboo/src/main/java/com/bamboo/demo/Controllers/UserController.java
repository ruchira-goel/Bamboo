package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.UserHandler;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class UserController {
    private UserHandler userHandler;

    public UserController(UserRepo userRepo) {
        this.userHandler = new UserHandler(userRepo);
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
                       @RequestParam(value = "sex") com.bamboo.demo.Models.Sex sex)throws IllegalAccessException {
        //TODO: sex should be enum but not sure if this is how to do it
        return userHandler.addCharacteristics(email, height, weight, age, sex);
    }

    @RequestMapping("/User/all")
    public List<User> users() {
        return userHandler.display();
    }
}
