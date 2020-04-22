package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
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

    public ArrayList<String> fetchPreferredExerciseCategories(String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        return user.getPreferredExerciseCategories();
    }

    public boolean changePreferredExerciseCategories(String userId, String category, int addOrRemove) {
        User user = this.userRepo.findUserByUserId(userId);
        if (addOrRemove == 1) {
            if (!user.getPreferredExerciseCategories().contains(category)) {
                user.getPreferredExerciseCategories().add(category);
            }
        } else {
            if (user.getPreferredExerciseCategories().contains(category)) {
                user.getPreferredExerciseCategories().remove(category);
            } else {
                return false;
            }
        }
        this.userRepo.save(user);
        return true;
    }

    public boolean saveExercisePreferences(String userId, int daysInWeek, int hoursPerDay) {
        User user = this.userRepo.findUserByUserId(userId);

        user.setPreferredExerciseDaysInWeek(daysInWeek);
        user.setPreferredExerciseHoursPerday(hoursPerDay);

        this.userRepo.save(user);

        return true;
    }

    public ArrayList<String> fetchExercisePreferences(String userId) {
        User user = this.userRepo.findUserByUserId(userId);

        ArrayList<String> list = new ArrayList<>();

        list.add(String.valueOf(user.getPreferredExerciseDaysInWeek()));
        list.add(String.valueOf(user.getPreferredExerciseHoursPerday()));

        return list;
    }

    public boolean generateExerciseRoutine(String userId, String days, int hours, String categories) {
        User user = this.userRepo.findUserByUserId(userId);

        // String values are "true" or "false"
        // Correspond to: su m t w th f sa
        String[] week = days.split("\\s+");
        ArrayList<String> daysList = new ArrayList<>();
        if (week[0].equals("true")) {
            daysList.add("Sunday");
        }
        if (week[1].equals("true")) {
            daysList.add("Monday");
        }
        if (week[2].equals("true")) {
            daysList.add("Tuesday");
        }
        if (week[3].equals("true")) {
            daysList.add("Wednesday");
        }
        if (week[4].equals("true")) {
            daysList.add("Thursday");
        }
        if (week[5].equals("true")) {
            daysList.add("Friday");
        }
        if (week[6].equals("true")) {
            daysList.add("Saturday");
        }

        ArrayList<String> activities = new ArrayList<>();

        String[] categoryList = categories.split("\\s+");
        if (categoryList[0].equals("true")) {
            activities.add("Bicycling");
            activities.add("Stationary Bicycling");
        }
        if (categoryList[1].equals("true")) {
            activities.add("Aerobic");
            activities.add("Elliptical Trainer");
            activities.add("Jump Rope");
            activities.add("Pilates");
            activities.add("Rowing");
            activities.add("Weight Training");
        }
        if (categoryList[2].equals("true")) {
            activities.add("Jogging");
            activities.add("Running");
        }
        if (categoryList[3].equals("true")) {
            activities.add("Badminton");
            activities.add("Baseball/Softball");
            activities.add("Basketball");
            activities.add("Boxing");
            activities.add("Football");
            activities.add("Golf");
            activities.add("Ping Pong");
            activities.add("Soccer");
            activities.add("Tennis");
            activities.add("Volleyball");
            activities.add("Wrestling");
        }
        if (categoryList[4].equals("true")) {
            activities.add("Canoeing");
            activities.add("Jet Skiing");
            activities.add("Kayaking");
            activities.add("Scuba Diving");
            activities.add("Surfing");
            activities.add("Swimming");
        }
        if (categoryList[5].equals("true")) {
            activities.add("Ice Skating");
            activities.add("Skiing");
            activities.add("Sledding");
            activities.add("Snowboarding");
            activities.add("Ice Hockey");
        }

        // day category hours
        ArrayList<String> routine = new ArrayList<>();
        for (String day : daysList) {
            int index = (int) (Math.random() * activities.size());
            String str = day + " " + activities.get(index) + " " + hours;
            routine.add(str);
        }
        user.setExerciseRoutine(routine);

        this.userRepo.save(user);

        return true;
    }

    public ArrayList<String> getExerciseRoutine(String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        return user.getExerciseRoutine();
    }
}
