package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.*;
import org.json.JSONObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

public class UserHandler {
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;
    private MealRepo mealRepo;
    private ActivityRepo activityRepo;
    private GoalRepo goalRepo;

    public UserHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo, MealRepo mealRepo, ActivityRepo activityRepo, GoalRepo goalRepo) {
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        this.mealRepo = mealRepo;
        this.activityRepo = activityRepo;
        this.goalRepo = goalRepo;
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
    public User addCharacteristics(String userId, double height, double weight, int age, Sex sex, boolean isMetric) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        User userObj = user.get();
        userObj.setHeight(height);
        userObj.setWeight(weight);
        userObj.setAge(age);
        userObj.setSex(sex);
        userObj.setMetric(isMetric);
        this.userRepo.save(userObj);
        return userObj;
    }


    public ArrayList<Goal> fetchGoals(String userId) throws IllegalAccessException {
        Optional<User> userObj = this.userRepo.findByUserId(userId);
        if (!userObj.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        User user = userObj.get();
        ArrayList<Goal> goals = new ArrayList<>();
        for (String goalId : user.getGoalIds()) {
            goals.add(this.goalRepo.findById(goalId).get());
        }
        return goals;
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

    /**
     * Get the total minutes of exercise a user did in the last week, ending with today's information.
     * Data intended for display on a graph.
     * @param userId user ID
     * @return string representation of total minutes of exercise on each of the past 7 days
     */
    public String getWeekExerciseTime(String userId) {
        int[] minutes = new int[7];
        int offset = 24*60*60*1000;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        User user = this.userRepo.findUserByUserId(userId);
        HashMap<String, String> dailyInfos = user.getDailyInfo();

        for (int i = 0; i < 7; i++) {
            Date date = new Date(System.currentTimeMillis() - offset*i);

            Optional<DailyInfo> info = Optional.empty();
            if (dailyInfos.get(format.format(date)) != null) {
                info = this.dailyInfoRepo.findById(dailyInfos.get(format.format(date)));
            }

            if (info.isPresent()) {
                ArrayList<String> activityIDs = info.get().getActivities();
                int mins = 0;
                for (String id : activityIDs) {
                    Optional<Activity> activity = this.activityRepo.findById(id);
                    if (activity.isPresent())
                        mins += activity.get().getMinutes();
                }
                minutes[6-i] = mins;
            }
        }

        StringBuilder str = new StringBuilder();
        for (int i : minutes) {
            str.append(i);
            str.append(" ");
        }

        return str.toString().trim();
    }

    public String getWeekExerciseCalories(String userId) {
        int[] calories = new int[7];
        int offset = 24*60*60*1000;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        User user = this.userRepo.findUserByUserId(userId);
        HashMap<String, String> dailyInfos = user.getDailyInfo();

        for (int i = 0; i < 7; i++) {
            Date date = new Date(System.currentTimeMillis() - offset*i);

            Optional<DailyInfo> info = Optional.empty();
            if (dailyInfos.get(format.format(date)) != null) {
                info = this.dailyInfoRepo.findById(dailyInfos.get(format.format(date)));
            }

            if (info.isPresent()) {
                ArrayList<String> activityIDs = info.get().getActivities();
                int cals = 0;
                for (String id : activityIDs) {
                    Optional<Activity> activity = this.activityRepo.findById(id);
                    if (activity.isPresent())
                        cals += activity.get().getCalories();
                }
                calories[6-i] = cals;
            }
        }

        StringBuilder str = new StringBuilder();
        for (int i : calories) {
            str.append(i);
            str.append(" ");
        }

        return str.toString().trim();
    }

    public String getWeekCaloriesConsumption(String userId) {
        int[] calories = new int[7];
        int offset = 24*60*60*1000;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        User user = this.userRepo.findUserByUserId(userId);
        HashMap<String, String> dailyInfos = user.getDailyInfo();

        for (int i = 0; i < 7; i++) {
            Date date = new Date(System.currentTimeMillis() - offset*i);

            Optional<DailyInfo> info = Optional.empty();
            if (dailyInfos.get(format.format(date)) != null) {
                info = this.dailyInfoRepo.findById(dailyInfos.get(format.format(date)));
            }

            if (info.isPresent()) {
                ArrayList<String> mealIDs = info.get().getMeals();
                int cals = 0;
                for (String id : mealIDs) {
                    Optional<Meal> meal = this.mealRepo.findById(id);
                    if (meal.isPresent())
                        cals += meal.get().getCalories();
                }
                calories[6-i] = cals;
            }
        }

        StringBuilder str = new StringBuilder();
        for (int i : calories) {
            str.append(i);
            str.append(" ");
        }

        return str.toString().trim();
    }

    public User addNotifSettings(String userId, boolean dailyInput, boolean goalStreak) {
        User user = this.userRepo.findUserByUserId(userId);
        user.setDailyInputReminder(dailyInput);
        user.setGoalStreakNotif(goalStreak);
        this.userRepo.save(user);
        return user;
    }

    public User getUser(String userId) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account");
        }
        return user.get();
    }

    public String getGoalStreakNotificationMessage(String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        int streak = 0;
        int offset = 24*60*60*1000;
        while_loop:
        while (true) {
            Date date = new Date(System.currentTimeMillis() - offset*(streak + 1));
            boolean noDailyGoals = true;
            for (String goalId : user.getGoalIds()) {
                Goal goal = goalRepo.findGoalById(goalId);
                if (goal.getDuration() == Duration.WEEK) {
                    //the goal streak is only for daily goals, so we skip this goal
                    continue;
                }
                noDailyGoals = false;
                if (goal.getLimitType() == LimitType.GREATERTHAN && goal.getGoalProgress(dateFormat.format(date)) < 1) {
                    //goal was to have greater than, progress less than 100%, not achieved
                    break while_loop;
                } else if (goal.getLimitType() == LimitType.LESSTHAN && goal.getGoalProgress(dateFormat.format(date)) > 1
                        || !user.getDailyInfo().containsKey(dateFormat.format(date))) {
                    //goal was to have less than, progress over 100%, not achieved
                    //OR there was no inputs on this date, so we cannot consider this goal achieved
                    break while_loop;
                }
                //else current goal was achieved for this date
            } //loops through each goal
            if (noDailyGoals) {
                break;
            }
            streak++;
        } //loops through each previous day
        //now streak should be the number of days before this that all daily goals were achieved
        JSONObject message = new JSONObject();
        if (streak == 0) {
            message.put("message", "Good luck with your goals today, you’ve got this!");
        } else if (streak > 0 && streak < 10) {
            message.put("message", "You’ve completed all daily goals for " +  streak + " day(s) straight now, keep it up!");
        } else {

            message.put("message", "You’ve completed all daily goals for " + streak + " days straight now, you’re on fire!");
        }
        return message.toString();
    }

    public boolean hasGoals(String userId) {
        //false is user has no goals, true if they do
        return !userRepo.findUserByUserId(userId).getGoalIds().isEmpty();
    }
}
