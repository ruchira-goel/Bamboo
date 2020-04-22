package com.bamboo.demo;

import com.bamboo.demo.Models.Meal;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class test {
    public static void main(String[] args) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("https://api.spoonacular.com/recipes/parseIngredients?apiKey=5ccdaac983d344338fe187bb2b7e5501"); //enter link
        List<NameValuePair> urlParams = new ArrayList<>();
        urlParams.add(new BasicNameValuePair("includeNutrition", "true"));
        urlParams.add(new BasicNameValuePair("servings", "1"));
        urlParams.add(new BasicNameValuePair("ingredientList", "3 oz pork shoulder\n2 tbsp sugar"));
        httpPost.setEntity(new UrlEncodedFormEntity(urlParams));
        CloseableHttpResponse response = httpClient.execute(httpPost);
        //System.out.println(EntityUtils.toString(response.getEntity()));
        JSONArray jsonarray = new JSONArray(EntityUtils.toString(response.getEntity()));
        System.out.println(jsonarray.getJSONObject(0).get("name"));

        //JSONObject nutritionJson = new JSONObject(EntityUtils.toString(response.getEntity()));
        //System.out.println(nutritionJson);
        Meal meal = new Meal();
        double fat = 0;
        double carbs = 0;
        double protein = 0;
        double calories = 0;
        for (int i = 0; i < jsonarray.length(); i++) {
            String name = jsonarray.getJSONObject(i).get("name").toString();
            JSONObject nutrition = (JSONObject) jsonarray.getJSONObject(i).get("nutrition");
            System.out.println(nutrition);
            JSONArray nutrients = nutrition.getJSONArray("nutrients");             //nutrients array
            System.out.println(nutrients);
            for (int j = 0; j < nutrients.length(); j++) {
                String title = nutrients.getJSONObject(j).get("title").toString();      //title of nutrient
                System.out.println("title: " + title);
                double amount = (double) nutrients.getJSONObject(j).get("amount");
                System.out.println(amount);
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
        meal.setCalories(calories);
        meal.setCarbs(carbs);
        meal.setFat(fat);
        meal.setProtein(protein);
            System.out.println(protein);
            System.out.println(calories);
            System.out.println(carbs);
            System.out.println(fat);

            System.out.println("I AM HERE AND CONFUSED");
    }
}
