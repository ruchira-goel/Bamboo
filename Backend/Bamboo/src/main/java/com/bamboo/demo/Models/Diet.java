package com.bamboo.demo.Models;

public enum Diet {
    GLUTENFREE("Gluten Free"),
    KETOGENIC("Ketogenic"),
    VEGETARIAN("Vegetarian"),
    LACTOVEGETARIAN("Lacto-Vegetarian"),
    OVOVEGETARIAN("Ovo-Vegetarian"),
    VEGAN("Vegan"),
    PESCETARIAN("Pescetarian"),
    PALEO("Paleo"),
    PRIMAL("Primal"),
    WHOLE30("Whole30"),
    UNSPECIFIED("Unspecified");

    String name;

    Diet(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

    //Following code is from user matzeihnsein from
    //https://stackoverflow.com/questions/8389150/java-enum-elements-with-spaces
    public static Diet valueOfDiet(String value) {
        for (Diet diet : Diet.class.getEnumConstants()) {
            if (diet.toString().equals(value)) {
                return diet;
            }
        }
        throw new IllegalArgumentException("Diet not found");
    }

    public static Diet fromString(String name) {
        for (Diet diet : Diet.values()) {
            if (diet.name.equalsIgnoreCase(name)) {
                return diet;
            }
        }
        return null;
    }
}
