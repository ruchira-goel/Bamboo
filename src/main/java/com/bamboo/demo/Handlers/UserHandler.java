package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.DailyInfo;
import com.bamboo.demo.Models.Sex;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.ActivityRepo;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.MealRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

public class UserHandler {
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;
    private MealRepo mealRepo;
    private ActivityRepo activityRepo;

    public UserHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo, MealRepo mealRepo, ActivityRepo activityRepo) {
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        this.mealRepo = mealRepo;
        this.activityRepo = activityRepo;

    }

    //login the user
    public User loginUser(String email, String password) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByEmail(email);
        if (!user.isPresent()) {
            throw new IllegalAccessException("This email isn't registered yet");
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(password, user.get().getEncryptedPassword())) {
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
            throw new IllegalAccessException("Please make sure your password is at least 8 characters!");
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User newUser = new User(email, passwordEncoder.encode(password));
        newUser.setName(name);
        return this.userRepo.save(newUser);
    }

    public User getCharacteristics(String userId) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        User userObj = user.get();
        return userObj;
    }

    public User addDailyInfo(String userId, DailyInfo dailyInfo) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        User userObj = user.get();
        userObj.getDailyInfo().put(dailyInfo.getDate(), dailyInfo.getId());
        this.userRepo.save(userObj);
        return userObj;
    }

    //new user add characteristics
    public User addCharacteristics(String userId, double height, double weight, int age, Sex sex) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
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

    public List<User> display() {
        return this.userRepo.findAll();
    }

    public void delete() {
        this.userRepo.deleteAll();
    }

    public User changePass(String userId, String encryptedPassword) {
        User user =  userRepo.findUserByUserId(userId);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setEncryptedPassword(passwordEncoder.encode(encryptedPassword));
        return this.userRepo.save(user);

    }

    public boolean deleteAccount(String userId) {
        this.activityRepo.deleteAllByUserId(userId);
        this.mealRepo.deleteAllByUserId(userId);
        this.dailyInfoRepo.deleteAllByUserId(userId);
        this.userRepo.deleteByUserId(userId);
        return mealRepo.findAllByUserId(userId).isEmpty() &&
                dailyInfoRepo.findAllByUserId(userId).isEmpty() &&
                dailyInfoRepo.findAllByUserId(userId).isEmpty() &&
                userRepo.findUserByUserId(userId) == null;
    }
}
