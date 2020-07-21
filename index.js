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

console.log(getFinals(fifaData));

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

function sumByProperty(data, prop){
    return data.reduce((sum, item) => sum + item[prop], 0);
}

function avgByProperty(data, prop){
    return sumByProperty(data, prop) / data.length;
}

function getAverageGoals(data) {
    return {home: avgByProperty(data, "Home Team Goals"), away: avgByProperty(data, "Away Team Goals")};
};

let avgGoals = getAverageGoals(getFinals(fifaData));
console.log(`Average goals: home ${avgGoals.home}, away ${avgGoals.away}`);

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function isWinnerOf(match, name) {
    if(name === match["Home Team Initials"] || name === match["Home Team Name"])
    { // if we're the home team...
        if(match["Home Team Goals"] > match["Away Team Goals"])
        {
            return true;
        }
        else if(match["Home Team Goals"] === match["Away Team Goals"])
        {
            return match["Win conditions"].split(" ")[0] === match["Home Team Name"]; // not a perfect match; some full names don't get fully named in win conditions, like "Germany FR"
        }
    }
    else if(name === match["Away Team Initials"] || name === match["Away Team Name"])
    { // if we're the away team...
        if(match["Away Team Goals"] > match["Home Team Goals"])
        {
            return true;
        }
        else if(match["Away Team Goals"] === match["Home Team Goals"])
        {
            return match["Win conditions"].split(" ")[0] === match["Away Team Name"];
        }
    } // if we're neither team, we obviously weren't the winner
    return false;
}

function getCountryWins(data, team) {
    return data.reduce((wins, match) => {
        if(isWinnerOf(match, team)) {wins += 1;} // the isWinnerOf logic could be written here, but I think separating it makes it more readable, and it's reuseable in case we need to check the winner of a match in another context
        return wins;
    }, 0);
    // I wasn't sure whether to read "the number of world cup wins XYZ has had" as "the number of times XYZ won a match" or "the number of times XYZ won the World Cup"
    // but I decided to implement the first, since the second is just a matter of calling the first on a smaller data set
};

console.log(`Italy has won ${getCountryWins(fifaData, "ITA")} matches at the World Cup.`);
console.log(`Italy has won ${getCountryWins(getFinals(fifaData), "ITA")} World Cups.`);

// works on whole names, too
console.log(`Italy has won ${getCountryWins(fifaData, "Italy")} matches at the World Cup.`);
console.log(`Italy has won ${getCountryWins(getFinals(fifaData), "Italy")} World Cups.`);

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    const goals = {}; // new object, which will be a dictionary - a linking of keys (team names) to values (aggregate goals)
    const appearances = {}; // as above but for team names -> appearances

    data.forEach(item => {
        if(goals[item["Home Team Name"]] == undefined)
        {
            goals[item["Home Team Name"]] = 0; // add entries if there isn't one for this team yet
            appearances[item["Home Team Name"]] = 0;
        }

        goals[item["Home Team Name"]] += item["Home Team Goals"];
        appearances[item["Home Team Name"]] ++;
        
        // repeat for away team
        if(goals[item["Away Team Name"]] == undefined)
        {
            goals[item["Away Team Name"]] = 0;
            appearances[item["Away Team Name"]] = 0;
        }

        goals[item["Away Team Name"]] += item["Away Team Goals"];
        appearances[item["Away Team Name"]] ++;
    });

    // Goals should now contain the total number of goals for each team
    console.log(goals);
    console.log(appearances);

    let maxAvgGoals = 0;
    let maxTeam = "";

    for(let i in goals)
    {
        goals[i] /= appearances[i];
        // divide each entry in goals by the corresponding number of appearances to yield an average

        if(goals[i] > maxAvgGoals)
        {
            // quick and dirty check for maximum value in the object
            // there's probably a simpler way, but since we're looping through `goals` anyway...
            maxAvgGoals = goals[i];
            maxTeam = i;
        }
    }

    return [maxTeam, maxAvgGoals];
};

const max = getGoals(getFinals(fifaData));
console.log(`${max[0]} has the highest number of goals per World Cup final (${max[1]}).`);
// this shows only the first result (Uruguay, 4.0), not others with the same value (England)

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data){
    // this is pretty much the same function as above, except for the value extracted (goals against vs. goals for)
    const goals = {}; // dictionaries-in-waiting
    const appearances = {};

    data.forEach(item => {
        if(goals[item["Home Team Name"]] == undefined)
        {
            goals[item["Home Team Name"]] = 0; // add entries if there isn't one for this team yet
            appearances[item["Home Team Name"]] = 0;
        }

        goals[item["Home Team Name"]] += item["Away Team Goals"]; // note swap for goals against
        appearances[item["Home Team Name"]] ++;
        
        // repeat for away team
        if(goals[item["Away Team Name"]] == undefined)
        {
            goals[item["Away Team Name"]] = 0;
            appearances[item["Away Team Name"]] = 0;
        }

        goals[item["Away Team Name"]] += item["Home Team Goals"]; // ditto
        appearances[item["Away Team Name"]] ++;
    });

    console.log(goals);
    console.log(appearances);

    let maxAvgGoals = 0;
    let maxTeam = "";

    for(let i in goals)
    {
        goals[i] /= appearances[i];

        if(goals[i] > maxAvgGoals)
        {
            maxAvgGoals = goals[i];
            maxTeam = i;
        }
    }

    return [maxTeam, maxAvgGoals];
};

const maxBad = badDefense(getFinals(fifaData));
console.log(`${maxBad[0]} has the highest number of goals scored against them per World Cup final (${maxBad[1]}).`);

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
