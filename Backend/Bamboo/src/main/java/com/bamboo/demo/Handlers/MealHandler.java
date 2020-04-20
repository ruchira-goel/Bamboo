package com.bamboo.demo.Handlers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.text.SimpleDateFormat;
import java.util.*;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import com.bamboo.demo.Models.*;
import com.bamboo.demo.Repos.DailyInfoRepo;
import com.bamboo.demo.Repos.GoalRepo;
import com.bamboo.demo.Repos.MealRepo;
import com.bamboo.demo.Repos.UserRepo;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MealHandler {
    private MealRepo mealRepo;
    private UserRepo userRepo;
    private DailyInfoRepo dailyInfoRepo;
    private GoalRepo goalRepo;

    public MealHandler(UserRepo userRepo, DailyInfoRepo dailyInfoRepo, MealRepo mealRepo, GoalRepo goalRepo) {
        this.userRepo = userRepo;
        this.dailyInfoRepo = dailyInfoRepo;
        this.mealRepo = mealRepo;
        this.goalRepo = goalRepo;
    }

    public Meal saveMealFromLink(String link, String userId, String date) throws IOException, JSONException, IllegalAccessException {
        URL url = new URL("https://api.spoonacular.com/recipes/extract?apiKey=5ccdaac983d344338fe187bb2b7e5501&url="
                + link);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-type", "application/json");
        connection.setRequestProperty("User-agent",
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11");
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String jsonText = in.readLine();
        JSONObject json = new JSONObject(jsonText);
        String mealName = json.get("title").toString();
        String recipeId = json.get("id").toString();

        if (recipeId.equals("-1")) {
            throw new IllegalAccessException("Meal not found");
        }

        URL nutritionURL = new URL("https://api.spoonacular.com/recipes/" + recipeId +
                "/nutritionWidget.json?apiKey=5ccdaac983d344338fe187bb2b7e5501");
        HttpURLConnection con = (HttpURLConnection) nutritionURL.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-type", "application/json");

        BufferedReader input = new BufferedReader(new InputStreamReader(con.getInputStream()));
        JSONObject nutritionJson = new JSONObject(input.readLine());

        //removing last character to get number for nutrition
        String fatStr = nutritionJson.get("fat").toString();
        double fat = Double.parseDouble(fatStr.substring(0, fatStr.length() - 1));
        String proteinStr = nutritionJson.get("protein").toString();
        double protein = Double.parseDouble(proteinStr.substring(0, proteinStr.length() - 1));
        String carbStr = nutritionJson.get("carbs").toString();
        double carb = Double.parseDouble(carbStr.substring(0, carbStr.length() - 1));
        double calories = Double.parseDouble(nutritionJson.get("calories").toString());
        Meal meal = new Meal(userId, mealName, calories, fat, carb, protein);
        this.mealRepo.save(meal);

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date currentDate = new Date(System.currentTimeMillis());
        addToDate(date, meal);

        return meal;
    }


    public Meal saveMealFromName(String name, String userId, String date) throws IOException, JSONException {
        try {
            User user = this.userRepo.findById(userId).get();
            System.out.println("the name is " + name);
            URL url = new URL("https://api.spoonacular.com/recipes/guessNutrition?apiKey=5ccdaac983d344338fe187bb2b7e5501&title="
                    + name);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-type", "application/json");

            BufferedReader input = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            JSONObject nutritionJson = new JSONObject(input.readLine());

            double fat = Double.parseDouble(((JSONObject) nutritionJson.get("fat")).get("value").toString());
            double protein = Double.parseDouble(((JSONObject) nutritionJson.get("protein")).get("value").toString());
            double carb = Double.parseDouble(((JSONObject) nutritionJson.get("carbs")).get("value").toString());
            double calories = Double.parseDouble(((JSONObject) nutritionJson.get("calories")).get("value").toString());

            Meal meal = new Meal(userId, name, calories, fat, carb, protein);
            this.mealRepo.save(meal);

            System.out.println("Date: HERE " + date);
            addToDate(date, meal);
            return meal;
        } catch (IOException e) {
            throw new IOException("Meal not found");
        } catch (JSONException e) {
            throw new JSONException("Meal not found");
        }
    }

    public Meal saveMealFromRecipe(String date, String userId, String recipe, String name) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost
                ("https://api.spoonacular.com/recipes/parseIngredients?apiKey=5ccdaac983d344338fe187bb2b7e5501"); //enter link
        List<NameValuePair> urlParams = new ArrayList<>();
        urlParams.add(new BasicNameValuePair("includeNutrition", "true"));
        urlParams.add(new BasicNameValuePair("servings", "1"));
        urlParams.add(new BasicNameValuePair("ingredientList", recipe));
        httpPost.setEntity(new UrlEncodedFormEntity(urlParams));
        CloseableHttpResponse response = httpClient.execute(httpPost);
        JSONArray jsonarray = new JSONArray(EntityUtils.toString(response.getEntity()));

        Meal meal = new Meal();
        double fat = 0;
        double carbs = 0;
        double protein = 0;
        double calories = 0;
        for (int i = 0; i < jsonarray.length(); i++) {
            JSONObject nutrition;
            try {
                nutrition = (JSONObject) jsonarray.getJSONObject(i).get("nutrition");
            } catch (Exception e) {
                throw new IOException("Ingredients not found");
            }
            JSONArray nutrients = nutrition.getJSONArray("nutrients");             //nutrients array
            for (int j = 0; j < nutrients.length(); j++) {
                String title = nutrients.getJSONObject(j).get("title").toString();      //title of nutrient
                double amount = (double) nutrients.getJSONObject(j).get("amount");
                switch (title) {
                    case "Fat":
                        fat += amount;
                        break;
                    case "Calories":
                        calories += amount;
                        break;
                    case "Carbohydrates":
                        carbs += amount;
                        break;
                    case "Protein":
                        protein += amount;
                        break;
                }
            }
        }
        meal.setCalories(Math.round(calories * 100.0) / 100.0);
        meal.setCarbs(Math.round(carbs * 100.0) / 100.0);
        meal.setFat(Math.round(fat * 100.0) / 100.0);
        meal.setProtein(Math.round(protein * 100.0) / 100.0);
        meal.setName(name);
        meal.setUserId(userId);
        this.mealRepo.save(meal);
        addToDate(date, meal);
        return meal;
    }


    public void addToDate(String date, Meal meal) {
        String userId = meal.getUserId();
        User user = this.userRepo.findById(userId).get();
        String dailyInfoId;
        DailyInfo dailyInfo;
        System.out.println(date);
        if (!user.getDailyInfo().containsKey(date)) {
            dailyInfo = new DailyInfo(userId, date);
            this.dailyInfoRepo.save(dailyInfo);
            dailyInfoId = dailyInfo.getId();
            user.getDailyInfo().put(date, dailyInfoId);
            this.userRepo.save(user);
        } else {
            dailyInfoId = user.getDailyInfo().get(date);
            dailyInfo = this.dailyInfoRepo.findById(dailyInfoId).get();
        }
        dailyInfo.addMeal(meal.getId());
        this.dailyInfoRepo.save(dailyInfo);
        List<Goal> goals = this.goalRepo.findAllByUserId(userId);
        for (Goal goal : goals) {
            if (goal.getType() == Type.MEAL) {
                goal.checkMealProgress(mealRepo, dailyInfoRepo, goalRepo, date);
            }
        }
    }

    public ArrayList<Meal> getRecommendedMeals(String userId, String calLow, String calHigh, String fatLow, String fatHigh,
                                               String proteinLow, String proteinHigh, String carbsLow, String carbsHigh,
                                               int numMeals) throws IOException {
        User user = this.userRepo.findById(userId).get();
        final String CARBS = "CARBS";
        final String PROTEIN = "PROTEIN";
        final String CALORIES = "CALORIES";
        final String FAT = "FAT";
        final String NUMMEALS = "NUMMEALS";
        HashMap<String, List<Object>> nutrientLimits = new HashMap<>();
        String request = "https://api.spoonacular.com/recipes/complexSearch?apiKey=5ccdaac983d344338fe187bb2b7e5501";
        StringBuilder intolerances = new StringBuilder();
        ArrayList<String> allergies = user.getAllergies();
        for (int i = 0; i < allergies.size(); i++) {
            intolerances.append(allergies.get(i));
            if (i != allergies.size() - 1) {
                intolerances.append(",");
            }
        }
        request += "&intolerances=" + intolerances;
        request += "&diet=" + user.getDiet().name();
        if(!carbsLow.equals("")) {
            request += "&minCarbs=";
            //MINCARBS instead of carbs?
            nutrientLimits.put(CARBS, new ArrayList<Object>() {{
                add(LimitType.LESSTHAN.name());
                add(carbsLow);
            }});
            request += carbsLow;
        }
        if (!carbsHigh.equals("")) {
            request += "&maxCarbs=";
            nutrientLimits.put(CARBS, new ArrayList<Object>() {{
                add(LimitType.GREATERTHAN.name());
                add(carbsHigh);
            }});
            request += carbsHigh;
        }
        if(!proteinHigh.equals("")) {
            request += "&maxProtein=";
            nutrientLimits.put(PROTEIN, new ArrayList<Object>() {{
                add(LimitType.GREATERTHAN.name());
                add(proteinHigh);
            }});
            request += proteinHigh;
        }
        if(!proteinLow.equals("")) {
            request += "&minProtein=";
            nutrientLimits.put(PROTEIN, new ArrayList<Object>() {{
                add(LimitType.LESSTHAN.name());
                add(proteinLow);
            }});
            request += proteinLow;
        }
        if(!fatHigh.equals("")) {
            request += "&maxFat=";
            nutrientLimits.put(FAT, new ArrayList<Object>() {{
                add(LimitType.GREATERTHAN.name());
                add(fatHigh);
            }});
            request += fatHigh;
        }
        if(!fatLow.equals("")) {
            request += "&minFat=";
            nutrientLimits.put(FAT, new ArrayList<Object>() {{
                add(LimitType.LESSTHAN.name());
                add(fatLow);
            }});
            request += fatLow;
        }
        if(!calLow.equals("")) {
            request += "&minCalories=";
            nutrientLimits.put(CALORIES, new ArrayList<Object>() {{
                add(LimitType.LESSTHAN.name());
                add(calLow);
            }});
            request += calLow;
        }
        if (!calHigh.equals("")) {
            request += "&maxCalories=";
            nutrientLimits.put(CALORIES, new ArrayList<Object>() {{
                add(LimitType.GREATERTHAN.name());
                add(calHigh);
            }});
            request += calHigh;
        }
        if (numMeals != 0) {
            request += "&number=" + numMeals;
            nutrientLimits.put(NUMMEALS, new ArrayList<Object>() {{
                add(LimitType.EQUAL);
                add(numMeals);
            }});
        }
        user.setNutrientLimits(nutrientLimits);
        this.userRepo.save(user);
        URL url = new URL(request);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-type", "application/json");

        BufferedReader input = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        JSONArray mealArray = new JSONArray(input.readLine());
        ArrayList<Meal> recommended = new ArrayList<>();
        for (int i = 0; i < mealArray.length(); i++) {
            JSONObject mealObject = mealArray.getJSONObject(i);
            String fatString = mealObject.get("fat").toString();
            String carbsString = mealObject.get("carbs").toString();
            String proteinString = mealObject.get("protein").toString();
            Meal meal = new Meal(userId, mealObject.get("title").toString(),
                    Double.parseDouble(mealObject.get("calories").toString()),
                    Double.parseDouble(fatString.substring(0, fatString.length() - 1)),
                    Double.parseDouble(carbsString.substring(0, carbsString.length() - 1)),
                    Double.parseDouble(proteinString.substring(0, proteinString.length() - 1)));
            recommended.add(meal);
        }
        return recommended;
    }

    public List<Meal> display() {
        return this.mealRepo.findAll();
    }

    public void del() {
        this.mealRepo.deleteAll();
    }

    public Meal addToFavorites(String mealId, String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        user.getFavMeals().add((mealId));
        this.userRepo.save(user);
        return this.mealRepo.findById(mealId).get();
    }

    public ArrayList<Meal> getFavorites(String userId) {
        User user = this.userRepo.findUserByUserId(userId);
        ArrayList<Meal> meals = new ArrayList<>();
        for (String mealId : user.getFavMeals()) {
            meals.add(this.mealRepo.findById(mealId).get());
        }
        return meals;
    }

    public boolean deleteFavorite(String userId, String mealId) {
        User user = this.userRepo.findUserByUserId(userId);
        user.getFavMeals().remove(mealId);
        this.userRepo.save(user);
        return true;
    }

    public boolean saveMealFromFavorites(String userId, String mealId, String date) {
        addToDate(date, this.mealRepo.findById(mealId).get());
        return true;
    }
}
