package com.bamboo.demo.Models;

public enum NutrientLimits {
    PROTEIN("Protein"),
    CALORIES("Calories"),
    CARBS("Carbs"),
    FAT("Fat"),
    NUMMEALS("NumMeals");


    String name;

    NutrientLimits(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

    //Following code is from user matzeihnsein from
    //https://stackoverflow.com/questions/8389150/java-enum-elements-with-spaces
    public static NutrientLimits valueOfNutrient(String value) {
        for (NutrientLimits nutrientLimits: NutrientLimits.class.getEnumConstants()) {
            if (nutrientLimits.toString().equals(value)) {
                return nutrientLimits;
            }
        }
        throw new IllegalArgumentException("Limit Type not found");
    }

    public static NutrientLimits fromString(String name) {
        for (NutrientLimits nutrientLimits : NutrientLimits.values()) {
            if (nutrientLimits.name.equalsIgnoreCase(name)) {
                return nutrientLimits;
            }
        }
        return null;
    }
}
