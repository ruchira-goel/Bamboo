package com.bamboo.demo.Models;

public enum TrackedItem {
    G_OF_PROTEIN("Grams of Protein"),
    CALORIES("Calories"),
    MINUTES_OF_ACTIVITY("Minutes of exercise"),
    HOURS_OF_ACTIVITY("Hours of exercise"),
    CALORIES_BURNED("Calories burned");

    String name;

    TrackedItem(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

    //Following code is from user matzeihnsein from
    //https://stackoverflow.com/questions/8389150/java-enum-elements-with-spaces
    public static TrackedItem valueOfTrackedItem(String value) {
        for (TrackedItem trackedItem : TrackedItem.class.getEnumConstants()) {
            if (trackedItem.toString().equals(value)) {
                return trackedItem;
            }
        }
        throw new IllegalArgumentException("Tracked Item not found");
    }

    public static TrackedItem fromString(String name) {
        for (TrackedItem trackedItem : TrackedItem.values()) {
            if (trackedItem.name.equalsIgnoreCase(name)) {
                return trackedItem;
            }
        }
        return null;
    }
}
