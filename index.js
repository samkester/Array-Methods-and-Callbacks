import { fifaData } from './fifa.js';
console.log(fifaData);

console.log("it's working");
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

for(let i = fifaData.length - 1; i >= 0; i--)
{
    if(fifaData[i].Year === 2014 && fifaData[i].Stage === "Final")
    {
        console.log(`Home: ${fifaData[i]["Home Team Name"]}`);
        console.log(`Away: ${fifaData[i]["Away Team Name"]}`);
        console.log(`Home goals: ${fifaData[i]["Home Team Goals"]}`);
        console.log(`Away goals: ${fifaData[i]["Away Team Goals"]}`);
        console.log(`Winner: ${fifaData[i]["Win conditions"]}`);
    }
}

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(item => item.Stage == "Final");
};

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(getFinals) {
    return getFinals(fifaData).map(item => item.Year);
};

console.log(getYears(getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function winnerOf(match) {
    if(match["Home Team Goals"] > match["Away Team Goals"])
    {
        return match["Home Team Name"];
    }
    else if(match["Away Team Goals"] > match["Home Team Goals"])
    {
        return match["Away Team Name"];
    }
    else
    {
        return match["Win conditions"].split(" ")[0]; // divides the win condition string into words and takes the first
    }
}

function getWinners(getFinals) {
    return getFinals(fifaData).map(item => winnerOf(item));
};

console.log(getWinners(getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(getYears, getWinners, getFinals) {
    // this isn't possible without passing in the getFinals, since neither of the other functions actually defines it
    const winners = getWinners(getFinals);
    return getYears(getFinals).map((item, index) => `In ${item}, ${winners[index]} won the World Cup.`);
};

function getWinnersByYearBetter(getFinals) {
    // the easier route is just to use a single template literal
    return getFinals(fifaData).map(item => `In ${item.Year}, ${winnerOf(item)} won the World Cup.`);
};

console.log(getWinnersByYear(getYears, getWinners, getFinals));
console.log(getWinnersByYearBetter(getFinals));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(/* code here */) {

    /* code here */

};

getAverageGoals();

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

};

getCountryWins();


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
