# Mastermind Game

## Description

The Mastermind Game is a classic code-breaking game where the player attempts to guess a sequence of randomly selected numbers (0-7). The game provides feedback after each guess to help the player deduce the correct sequence.

## Features

- User can pick difficulty levels from 4-digit to 8-digit numbers.
- Randomly generated sequence of numbers from 0 to 7
- User can add more players
- Each user will have 10 attempts to solve the Mastermind game
- Number of attempts remaining shown before each attempt
- Feedback provided after each guess
- User has the ability to view the history of guesses and their feedback
- User has the ability to view the hint for each-digit once
- User can also view the current playing time
- Score is updated once a user solves
- Shows overall playing time and player(s) with highest score

## In-Game Useful Commands

While guessing for the randomly generated number, player can also take advantage of below commands:

- `history` - view the history of guesses and their feedback
- `hint` - view the hint for each-digit once
- `time` - view the current playing time
- `getCode` - case sensitive. View the code to solve

[Go Back to Reading the Game](#playing-game)

## Making the Application

I first approached my project using procedural programming design without thinking about the project design and structure. Although LinkedIn probably uses different programming languages for different projects and functionalities, after doing a quick research, I was informed that Java was the company's primary backend programming language. I have no background in using Java, but found out that Java heavily relies on objected-oriented programming principles and features. I wasn't too familiar with using class/OOP while studying Web Dev, but I've decided to learn more about OOP and try to implement OOP design in the project and made changes to it.

> I wanted to first separate the user interface (console.logs) and the backend code. `inside frontend directory GameUI.js.` I decided to use a class and within that class, have methods for different UIs such as: logging start message, different responses to a user input, time played etc. I've also used class for the Game and Players in the backend. Creating instance of a Game to keep track of the overall game and having fields for the level of the game, the code to solve, and playing times (start and end). Also includes methods such as starting the time, creating the code that user(s) need to solve, calculating the playing time. For Player, I initialized fields that would be needed for each player such as, name, score, history etc and have methods to get the player's history, getting the hint for the code, to update if the player solved the game, etc. I took this approach so that each instances of Player class can have it's own fields. I've also used ManagePlayers class to keep an array of Players `inside model directory Game.js & Player.js.`

I wanted to keep the `app.js` file short and concise for readability and keeps the codes that will run for game logic and functionalities will separated, which is in service directory. When a user runs the application by running command "npm start", the application will create an instance of Game and will start the game and also calls now method of performance object. To measure the time, I've used another built-in module "perf_hooks" which includes performance object.

> **User Input:**
> For getting user inputs, I decided to use the Node's built-in module "readline" instead of using a package like "prompt-sync". Although it looked simpler to use than the "readline", which is event-driven, asynchronous, and rely on callback function, I wanted to challenge myself. Had to use async/await for getting the inputs. I also used Promise to repeat the question when there is an empty input or doesn't pass validation. Also, when calling the userInput method the argument passed in the method will be the question asked. `UserInputs.js`

In the beginning, user will have to choose/input a difficulty level. Which will check if what the user entered is a Number and if the input is within the range of 4 to 8. Any other inputs will trigger the userInput function again. User's input for difficulty level will dynamically set the URL API endpoint. I've used axios to make HTTP request and once the response is received, I've used split, join, and trim methods to make the response in one string since the response will have 1 column of multiple numbers. This updated code will then be set in the Game instance for future accessability. I wanted the code to be in a vertical order for better readability and easier to work with. The numbers to solve will range from 0 to 7 and this information is also shown to users.`GetRandomNumber.js.`

> **Adding Players:** I've used while loop for getting the player's information to implement multi-player feature. Unless the user inputs "finish" the program will keep asking for player name and didn't include any validation methods to check the name. Only inputs the game will not accept is an empty input or empty string. `CreatePlayers.js.`

<a id="playing-game"></a>

> **Playing the Game:** Once all the player(s) are added, PlayGame function is called with following arguments: the game code, array of players, the game level, and the instance of game. So the function has access to these values in that function. I wanted to show the name of the current player and the player's remaining attempts before they try to solve the code. In this function, I also implemented other accepted inputs from the user, such as: history, hint, time, and one secret input. Please check [Useful Commands](#in-game-useful-commands) if you haven't read it earlier. `PlayGame.js` >

The PlayGame function has a while loop that will continuously as long as:

1. number of attempt is greater than 0 because once the game reaches 0 tries remaining, it will end the game due to running out of tries.
2. while the players number is not equal to the number of players solved because if all the players solved the code, there is no point of still guessing the number.

Inside this while loop, I've used the for loop to toggle between players based on the number of players and used while loop inside the for loop to validate user input. If a user inputs one of the accepted commands or user inputs a value that is not validated (value that is not a number or not the same as the level-digit number) it will not decrement the attempts by using continue to skip an iteration. Once an accepted value is received, it will run the validateCode function.

> **Validating Code:** I needed a way to keep track of 3 main things: correct numbers, correct location of the numbers, and to account for the duplicated number. I've used 2 variable to keep track of correct numbers and locations, but used an object to keep track of correct number as key and the index for that number as value to avoid counting the same number in the same index.`Validator.js.`

To validate code, I used for loop to iterate over the user guess and compare each value with the code. Checking for the location was easy, need to check if the code and user guess at `[index]` are the value if so increment correct location. To check for the correct number, if the value includes in code but isn't in the object, increment correct numbers and add the value as key and the index as value. If the same number is included, retrieve the index of last occurred of the number and add 1. Then search the next occurrence of the value starting from the incremented position, if found repeat and if not found do nothing. I utilized the object to avoid double counting. If the user solves the code, it will update the solved field for that player and the game will not ask the player to solve the game then the player object will be added to players solved array.

Once the game is over either out of attempts or all players solved the code, it will return the array of players solved and will call a method within game to calculate the player(s) with highest score and also will record the game end time. If there is no players solved, it will console.log different message, but if there players, it will list all the players with highest score.

Finally, the game will log total playing time along with an ending message.

- Programming Language: **JavaScript**
- JavaScript Runtime (Backend): **Node.js**
- Package Used: **Axios** for HTTP Request

## Try it yourself

First, please [download](https://nodejs.org/en/download) the latest (LTS) version and install `Node.js`. This will run the backend application for JavaScript.

Use Git Bash for Windows or terminal for Mac. Go to this [link](https://github.com/YoonHCho/mastermind) and clone the repo. Please refer to this [link](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) if you're not familiar with cloning a repo.

Once the repo is cloned to your directory, change the current working directory by typing `cd mastermind` and press `enter` in your Git Bash/terminal.

Install all the modules listed as dependencies by typing `npm install` and press `enter`.

Once installed, you can now run the application by typing `node app.js`
