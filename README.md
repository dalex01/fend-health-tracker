# Health Tracker
Using Backbone, I developed a single page app that tracks the user's calorie intake~~, and optionally, other health-related metrics~~. Typing food names into the search field display a list of matching foods as provided by the health API. Users is able to select an item from the list, and the item will be added to the list of foods the user is tracking. The total calorie count also update to reflect the new daily total.

## Requirements

Project was reviewed according to this [rubric](http://i.imgur.com/T38q489.png).

# How to use

* To see this project on your PC you should just clone repository with command `git clone https://github.com/dalex01/fend-health-tracker.git` and start build/index.html file.
* Or [click](http://dalex01.github.io/fend-health-tracker/build/)

## Features

1. Search in Nutritionix DB via API.
2. Add and remove found products to the list. List is stored in Local Storage.
3. Calculate total number of calories in the list.

# APIs used
1. Nutritionix API

# To make your own health tracker
1. Clone repository (for example, by command `git clone https://github.com/dalex01/fend-health-tracker.git`)
2. Install all required components via bower (bootstrap, jquery, knockout) - [excellent tutorial](https://blog.engineyard.com/2014/frontend-dependencies-management-part-1).
3. Install all required gulp modules - [excellent tutorial](https://blog.engineyard.com/2014/frontend-dependencies-management-part-2).
5. Start app from build folder by index.html