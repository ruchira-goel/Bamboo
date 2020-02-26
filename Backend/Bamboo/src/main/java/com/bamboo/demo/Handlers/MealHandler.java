package com.bamboo.demo.Handlers;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.MealRepo;

public class MealHandler {
    private MealRepo mealRepo;

    public MealHandler(MealRepo mealRepo) {
        this.mealRepo = mealRepo;
    }

    public void getInfoFromLink(String link) throws IOException {
        URL url = new URL("https://api.spoonacular.com/recipes/extract?apiKey=5ccdaac983d344338fe187bb2b7e5501&url=" + link);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-type", "application/json");
        int status = connection.getResponseCode();
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            System.out.println(inputLine);
        }
        in.close();
        connection.disconnect();

    }
}
