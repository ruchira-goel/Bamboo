package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.*;
import org.json.JSONObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class UserHandler {
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;
    private MealRepo mealRepo;
    private ActivityRepo activityRepo;
    private GoalRepo goalRepo;

    public UserHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo, MealRepo mealRepo, ActivityRepo activityRepo,
                       GoalRepo goalRepo) {
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

    public User changeUnit(String userId, boolean isMetric) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account");
        }
        User userObj = user.get();
        userObj.setMetric(isMetric);
        this.userRepo.save(userObj);
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
    public User addCharacteristics(String userId, double height, double weight, int age, Sex sex, Lifestyle lifestyle, boolean isMetric) throws IllegalAccessException {
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
        userObj.setLifestyle(lifestyle);
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
        User user = userRepo.findUserByUserId(userId);
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
     *
     * @param userId user ID
     * @return string representation of total minutes of exercise on each of the past 7 days
     */
    public String getWeekExerciseTime(String userId) {
        int[] minutes = new int[7];
        int offset = 24 * 60 * 60 * 1000;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        User user = this.userRepo.findUserByUserId(userId);
        HashMap<String, String> dailyInfos = user.getDailyInfo();

        for (int i = 0; i < 7; i++) {
            Date date = new Date(System.currentTimeMillis() - offset * i);

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
                minutes[6 - i] = mins;
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
        int offset = 24 * 60 * 60 * 1000;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        User user = this.userRepo.findUserByUserId(userId);
        HashMap<String, String> dailyInfos = user.getDailyInfo();

        for (int i = 0; i < 7; i++) {
            Date date = new Date(System.currentTimeMillis() - offset * i);
            System.out.println("in exercise the date is " + format.format(date) + " and i is " + i);

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
                calories[6 - i] = cals;
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
        int offset = 24 * 60 * 60 * 1000;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        User user = this.userRepo.findUserByUserId(userId);
        HashMap<String, String> dailyInfos = user.getDailyInfo();
        ZonedDateTime date = ZonedDateTime.now();

        for (int i = 0; i < 7; i++) {
            //Date date = new Date(System.currentTimeMillis() - (offset * i));
            System.out.println("date without fomat is " + date);
            System.out.println("the date is " + DateTimeFormatter.ofPattern("dd/MM/yyyy").format(date) + " and i is " + i);
            String formatted = DateTimeFormatter.ofPattern("dd/MM/yyyy").format(date);

            Optional<DailyInfo> info = Optional.empty();
            if (dailyInfos.get(formatted) != null) {
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
                calories[6 - i] = cals;
            }
            date.minusDays(1);
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

    public HashMap<String, String> getSavedRecommendationValues(String userId) {
        return this.userRepo.findUserByUserId(userId).getNutrientLimits();
    }

    /**
     * Calculation sources:
     * 1. Calories based on height, weight, age: https://www.calculator.net/bmr-calculator.html
     * 2. Calories based on physical activity: http://www.checkyourhealth.org/eat-healthy/cal_calculator.php
     * 3. Calories based on all characteristics: https://www.aqua-calc.com/calculate/daily-calorie-needs
     * 4. Limits of calories based on percentages for 3-meals a day: https://www.omnicalculator.com/health/meal-calorie#how-many-calories-per-meal-should-i-eat
     * 5. Carbs: https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/carbohydrates/art-20045705
     * 6. Fat: https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/fat-grams/faq-20058496
     * 7. Protein: https://wa.kaiserpermanente.org/healthAndWellness?item=%2Fcommon%2FhealthAndWellness%2Fconditions%2Fdiabetes%2FfoodBalancing.html
     */

    public HashMap<String, Double> calculateDietRequirements(String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        double height = user.getHeight() / 100;
        double weight = user.getWeight();
        double age = user.getAge();
        Lifestyle lifestyle = user.getLifestyle();
        Sex sex = user.getSex();
        double caloriesRequired = 0;
//        if (sex == Sex.FEMALE) {
//            caloriesRequired = 9.247 * weight + 3.098 * height - 4.330 * age + 447.593;
//        } else if (sex == Sex.MALE) {
//            caloriesRequired = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
//        }
        double pa = 0;
        switch (lifestyle) {
            case SEDENTARY:
                pa = 1;
                //caloriesRequired *= 1.2;
                break;
            case LOW:
                if (sex == Sex.MALE) {
                    pa = 1.12;
                } else if (sex == Sex.FEMALE) {
                    pa = 1.14;
                }
                //caloriesRequired *= 1.375;
                break;
            case MODERATE:
                pa = 1.27;
                //caloriesRequired *= 1.55;
                break;
            case EXTREME:
                if (sex == Sex.MALE) {
                    pa = 1.54;
                } else if (sex == Sex.FEMALE) {
                    pa = 1.45;
                }
                //caloriesRequired *= 1.725;
                break;
            default:
                pa = 1;
        }
        if (sex == Sex.MALE) {
            caloriesRequired = 864 - 9.72 * age + pa * (14.2 * weight + 503 * height);
        } else if (sex == Sex.FEMALE) {
            caloriesRequired = 387 - 7.31 * age + pa * (10.9 * weight + 660.7 * height);
        } else {
            caloriesRequired = 864 - 9.72 * age + pa * (14.2 * weight + 503 * height);
        }
        double calLow = caloriesRequired * 0.25;
        double calHigh = caloriesRequired * 0.40;
        double proteinHigh = 0.2 * caloriesRequired / 4 / 3; //maxProt, min is 12%
        double proteinLow = 0.12 * caloriesRequired / 4 / 3;
        double fatHigh = 0.35 * caloriesRequired / 9 / 3;  //maxFat, min is 20%
        double fatLow = 0.2 * caloriesRequired / 9 / 3;
        double carbsHigh = 0.65 * caloriesRequired / 4 / 3;    //maxcarbs, min is 45%
        double carbsLow = 0.45 * caloriesRequired / 4 / 3;
        return new HashMap<String, Double>() {{
            put("calHigh", calHigh);
            put("calLow", calLow);
            put("fatHigh", fatHigh);
            put("fatLow", fatLow);
            put("proteinHigh", proteinHigh);
            put("proteinLow", proteinLow);
            put("carbsHigh", carbsHigh);
            put("carbsLow", carbsLow);
        }};
    }

    public void clearNutrientLimits(String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        user.setNutrientLimits(new HashMap<>());
        this.userRepo.save(user);
    }

    public void setChars(int age, double height, double weight, String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        user.setAge(age);
        user.setHeight(height);
        user.setWeight(weight);
        this.userRepo.save(user);
    }

    public User resetPass(String email, String newPass) {
        User user =  userRepo.findUserByEmail(email).get();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setToken(null);
        user.setEncryptedPassword(passwordEncoder.encode(newPass));
        return this.userRepo.save(user);
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
    
    public boolean saveDietaryRestrictions(String userId, ArrayList<String> allergies, String diet) {
        User user = this.userRepo.findUserByUserId(userId);
        if (!allergies.isEmpty()) {
            user.getAllergies().clear();
            for (String allergy : allergies) {
                if (!user.getAllergies().contains(allergy)) {
                    user.getAllergies().add(allergy);
                }
            }
        }
        if (!diet.isEmpty()) {
            if (Diet.fromString(diet) != null) {
                user.setDiet(Diet.fromString(diet));
            } else {
                try {
                    Diet newDiet = Diet.valueOf(diet);
                } catch (IllegalArgumentException e) {
                    if (!(e.getMessage().equals("Diet not found"))) {
                        user.setDiet(Diet.valueOf(diet));
                    }
                }

            }
        }
        this.userRepo.save(user);
        return true;
    }

    public ArrayList<ArrayList<String>> getDietaryRestrictions(String userId) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try signing up again");
        }
        User userObj = user.get();
        ArrayList<String> allergies = userObj.getAllergies();
        ArrayList<String> diet = new ArrayList<>();
        diet.add(userObj.getDiet().toString());
        ArrayList<ArrayList<String>> returnVal = new ArrayList<>();
        returnVal.add(allergies);
        returnVal.add(diet);
        return returnVal;
    }

    public boolean hasDailyInfo(String userId, String date) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByUserId(userId);
        if (!user.isPresent()) {
            throw new IllegalAccessException("There was an error locating your account, please try changing notification settings later");
        }
        User userObj = user.get();
        if (userObj.getDailyInfo().containsKey(date)) {
            return true;
        }
        return false;
    }
}
