// Quiz data Object
function QuizObject() {
  return {
    Easy: {
      Question1: {
        Question: "What color is the sky?",
        Options: ["blue", "red", "green", "yellow"],
        Answer: 1
      },
      Question2: {
        Question: "How many legs does a dog have?",
        Options: ["2", "3", "4", "5"],
        Answer: 3
      },
      Question3: {
        Question: "Which fruit is yellow?",
        Options: ["Apple", "Banana", "Grape", "Strawberry"],
        Answer: 2
      },
      Question4: {
        Question: "What do bees make?",
        Options: ["Milk", "Honey", "Bread", "Water"],
        Answer: 2
      }
    },

    Medium: {
      Question1: {
        Question: "Which planet is known as the Red Planet?",
        Options: ["Earth", "Mars", "Jupiter", "Venus"],
        Answer: 2
      },
      Question2: {
        Question: "What gas do plants breathe in?",
        Options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        Answer: 2
      },
      Question3: {
        Question: "Which ocean is the largest?",
        Options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        Answer: 3
      },
      Question4: {
        Question: "How many continents are there?",
        Options: ["5", "6", "7", "8"],
        Answer: 3
      }
    },

    Hard: {
      Question1: {
        Question: "What is the powerhouse of the cell?",
        Options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
        Answer: 3
      },
      Question2: {
        Question: "Who developed the theory of relativity?",
        Options: ["Newton", "Einstein", "Tesla", "Bohr"],
        Answer: 2
      },
      Question3: {
        Question: "What is the chemical symbol for gold?",
        Options: ["Ag", "Au", "Pb", "Pt"],
        Answer: 2
      },
      Question4: {
        Question: "Which number is the smallest prime?",
        Options: ["0", "1", "2", "3"],
        Answer: 3
      }
    }
  };
}


// History Object
function HistoryObject() {
  return {
    Sessions: []
  };
}


// Game Mode Play
function gameModePlay(modeChosen, history) {
  const quiz = QuizObject();
  const mode = quiz[modeChosen];

  let answers = [];
  let score = 0;

  let questionKeys = Object.keys(mode);

  for (let i = 0; i < questionKeys.length; i++) {
    const q = mode[questionKeys[i]];

    const userAnswer = Number(
      prompt(
        q.Question + "\n" +
        "1: " + q.Options[0] + "\n" +
        "2: " + q.Options[1] + "\n" +
        "3: " + q.Options[2] + "\n" +
        "4: " + q.Options[3] + "\n"
      )
    );

    const isCorrect = userAnswer === q.Answer;

    if (isCorrect) {
      console.log("Correct! Next question!");
      score++;
    } else {
      console.log("Incorrect! Next question!");
    }

    answers.push({
      question: q.Question,
      chosenOption: q.Options[userAnswer - 1],
      correctOption: q.Options[q.Answer - 1],
      isCorrect
    });
  }

  history.Sessions.push({
    mode: modeChosen,
    score,
    totalQuestions: questionKeys.length,
    timestamp: Date.now(),
    answers
  });

  return score;
}


// View History
function ViewHistory(history) {
  console.log(history.Sessions);
}


// Game Executor (FIXED)
function GameExecutor(whatToDo, history, modeChosen) {

  if (whatToDo === "Play") {
    const results = gameModePlay(modeChosen, history);
    console.log("Results:", results);
    GameStart(history);

  } else if (whatToDo === "See History") {

    const sessionNumber = Number(prompt("Which session number do you want to view?"));
    const session = history.Sessions[sessionNumber - 1];

    if (!session) {
      console.log("Session not found.");
    } else {
      console.log(session);
    }

    GameStart(history);

  } else {
    console.log("Option Unavailable");
    GameStart(history);
  }
}


// Game Start (FIXED)
function GameStart(history) {
  console.log("Welcome to the Quiz Game! Input an option to play!");

  let choice = prompt(
    "Type 1 to start the game.\nType 2 to view a game history session."
  );

  if (choice === "1") {

    let mode = prompt(
      "Choose a difficulty:\n1 = Easy\n2 = Medium\n3 = Hard"
    );

    if (mode === "1") mode = "Easy";
    else if (mode === "2") mode = "Medium";
    else if (mode === "3") mode = "Hard";
    else {
      console.log("Invalid difficulty. Returning to menu.");
      return GameStart(history);
    }

    GameExecutor("Play", history, mode);

  }
  else if (choice === "2") {
    GameExecutor("See History", history);
  }
  else {
    console.log("Option Invalid. Choose again.");
    GameStart(history);
  }
}


// Start the game
const history = HistoryObject();
GameStart(history);
