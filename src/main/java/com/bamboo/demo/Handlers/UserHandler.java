package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.Activity;
import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.Sex;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.UserRepo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public class UserHandler {
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;

    public UserHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo) {
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
    }

    //login the user
    public User loginUser(String email, String password) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByEmail(email);
        if (!user.isPresent()) {
            throw new IllegalAccessException("This email isn't registered yet");
        }
        if (!user.get().getEncryptedPassword().equals(password)) {
            throw new IllegalAccessException("You entered the wrong password!");
        }
        return user.get();
    }

    //new user signup
    public User signupUser(String name, String email, String password) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByEmail(email);
        if (user.isPresent()) {
            throw new IllegalAccessException("This email is already registered. Try the login page instead");
        }
        if (password.length() < 8) {
            throw new IllegalAccessException("Your password is not valid! Make sure it ___");
        }
        User newUser = new User(email, password);
        newUser.setName(name);
        return this.userRepo.save(newUser);

    }

    //new user add characteristics
    public User addCharacteristics(String email, double height, double weight, int age, Sex sex) throws IllegalAccessException {
        email = email.substring(1,email.length()-1);
        Optional<User> user = this.userRepo.findByEmail(email);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        User userObj = user.get();
        userObj.setHeight(height);
        userObj.setWeight(weight);
        userObj.setAge(age);
        userObj.setSex(sex);
        this.userRepo.save(userObj);
        return userObj;
    }

    public User addDailyInfo(String email, DailyInfo dailyInfo) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByEmail(email);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing in again");
        }
        User userObj = user.get();
        userObj.getDailyInfo().put(dailyInfo.getDate(), dailyInfo.getId());
        this.userRepo.save(userObj);
        return userObj;
    }

    public User addActivity(String email, String id, String type, int calories, int minutes, Date date) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByEmail(email);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing in again");
        }
        User userObj = user.get();
        String dailyInfoId = userObj.getDailyInfo().get(date);
        Optional<DailyInfo> dailyInfo = this.dailyInfoRepo.findById(dailyInfoId);
        DailyInfo dailyInfoObj = dailyInfo.get();
        Activity activity = new Activity(id, type, calories, minutes, date);
        dailyInfoObj.getActivities().add(activity.getId());
        this.userRepo.save(userObj);
        this.dailyInfoRepo.save(dailyInfoObj);
        return userObj;
    }

    public List<User> display() {
        return this.userRepo.findAll();
    }
}
