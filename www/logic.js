var ocupied = 0;
var customIndex;

var body = document.getElementsByTagName("body");
body.running = 0;

var width = window.innerWidth;
var height = window.innerHeight;
body.width = width;
body.height = height;
var dominant = Math.max(width, height);
var storage = window.localStorage;

var highScore = [];
for (var i = 0; i < 3; i++) {
  highScore[i] = storage.getItem("highScore" + (i + 1));
  if (highScore[i] == undefined) highScore[i] = 0;
}

var highScoreLabel = document.createElement("PARAGRAPH");
highScoreLabel.style.color = "white";
highScoreLabel.style.fontSize = height / 6 + "px";
highScoreLabel.style.position = "absolute";
highScoreLabel.style.margin = "auto";
highScoreLabel.style.height = height / 6;
highScoreLabel.style.top = height * 0.7 + "px";
highScoreLabel.style.left = "0px";
highScoreLabel.style.right = "0px";
highScoreLabel.style.textAlign = "center";
highScoreLabel.innerHTML = highScore[0];

var startButton = document.createElement("IMG");
startButton.setAttribute("src", "img/icons/start.png");

var playButton = document.createElement("BUTTON");
playButton.style.transform = "scale(0)";

var decoys = {};
for (var i = 0; i < 10; i++) {
  decoys[i] = 0;
}

encrypt = function(temp) {
  if (difficulty == 1) return temp;
  if (difficulty == 2) {
    var number = Math.floor(Math.random() * temp);
    if (number == 0 || number == temp) return temp;
    else return number + " + " + (temp - number);
  }
  if (difficulty == 3) {
    var sign = Math.floor((Math.random() * 27) / 9);
    if (sign == 0) {
      var number = Math.floor(Math.random() * temp);
      if (number == 0 || number == temp) return temp;
      else return number + " + " + (temp - number);
    }
    if (sign == 1) {
      var number = Math.floor(Math.random() * temp);
      if (number == 0 || number == temp) return temp;
      else return temp + number + " - " + number;
    }
    if (sign == 2) {
      var number = Math.floor(Math.random() * temp);
      if (number == 0 || number == temp) return temp;
      var tries = 0;
      while (temp % number != 0 && tries < 10) {
        number = Math.floor(Math.random() * temp);
        tries++;
      }
      if (tries == 10) return temp;
      else if (number == 1) return temp;
      return temp / number + " * " + number;
    }
    if (sign == 3) {
      var number = Math.floor(Math.random() * temp);
      if (number == 0 || number == temp) return temp;
      else return number * temp + " / " + number;
    }
  }
};

customEncrypt = function(temp) {
  if (challenges[customIndex].difficulty == 0) return temp;
  if (challenges[customIndex].difficulty == 1) {
    var number = Math.floor(Math.random() * temp);
    if (number == 0 || number == temp) return temp;
    else return number + " + " + (temp - number);
  }
  if (challenges[customIndex].difficulty == 2) {
    var sign = Math.floor((Math.random() * 26) / 9);
    if (sign == 0) {
      var number = Math.floor(Math.random() * temp);
      if (number == 0 || number == temp) return temp;
      else return number + " + " + (temp - number);
    }
    if (sign == 1) {
      var number = Math.floor(Math.random() * temp);
      if (number == 0 || number == temp) return temp;
      else return temp + number + " - " + number;
    }
    if (sign == 2) {
      var number = Math.floor(Math.random() * temp);
      if (number == 0 || number == temp) return temp;
      var tries = 0;
      while (temp % number != 0 && tries < 10) {
        number = Math.floor(Math.random() * temp);
        tries++;
      }
      if (tries == 10) return temp;
      else if (number == 1) return temp;
      return temp / number + " * " + number;
    }
  }
};

difficultyBonus = function() {
  if (difficulty == 1) return 0;
  if (difficulty == 2) return 1;
  if (difficulty == 3) return 1;
};

var score = 0;
var running = 0;
var timeLeft = 0;
var timerLoop = 0;
var timerLabel = document.createElement("PARAGRAPH");
timerLabel.style.fontSize = height / 3 + "px";
timerLabel.style.position = "absolute";
timerLabel.style.margin = "auto";
timerLabel.style.top = height / 3 + "px";
timerLabel.style.left = "0px";
timerLabel.style.right = "0px";
timerLabel.style.textAlign = "center";

var scoreLabel = document.createElement("PARAGRAPH");
scoreLabel.style.color = "white";
scoreLabel.style.fontSize = height / 5 + "px";
scoreLabel.style.position = "absolute";
scoreLabel.style.margin = "auto";
scoreLabel.style.top = height / 4 + "px";
scoreLabel.style.left = "0px";
scoreLabel.style.right = "0px";
scoreLabel.style.textAlign = "center";

setDifficulty = function(index) {
  for (var i = 0; i < 3; i++) {
    difficultyButtons[i].style.backgroundColor = "#ECF0F1";
    difficultyButtons[i].style.color = "black";
    difficultyButtons[i].style.fontWeight = "400";
    difficultyButtons[i].style.letterSpacing = "3px";
    difficultyButtons[i].style.boxShadow = "0px 15px 30px 17px rgba(0,0,0,0)";
    difficultyButtons[i].style.transform = "translateY(0px)";
  }
  difficultyButtons[index - 1].style.color = "white";
  difficultyButtons[index - 1].style.backgroundColor = "#8E44AD";
  difficultyButtons[index - 1].style.fontWeight = "600";
  difficultyButtons[index - 1].style.letterSpacing = "3px";
  difficultyButtons[index - 1].style.boxShadow =
    "0px 15px 20px 17px rgba(0,0,0,0.45)";
  difficultyButtons[index - 1].style.transform = "translateY(4px)";

  difficulty = index;
  highScoreLabel.innerHTML = highScore[index - 1];
};

var difficultyButtons = {};
var difficulty = 1;
for (var i = 0; i < 3; i++) {
  difficultyButtons[i] = document.createElement("BUTTON");
  difficultyButtons[i].setAttribute("class", "gameButton");
  difficultyButtons[i].style.position = "absolute";
  difficultyButtons[i].style.fontWeight = "400";
  difficultyButtons[i].style.letterSpacing = "3px";
  difficultyButtons[i].style.transition = " all .1s";
  difficultyButtons[i].style.left = width * 0.05 + i * width * 0.31 + "px";
  difficultyButtons[i].style.top = height * 0.4 + "px";
  difficultyButtons[i].style.borderColor = "#ECF0F1";
  difficultyButtons[i].style.textAlign = "center";
  difficultyButtons[i].style.width = width * 0.28;
  difficultyButtons[i].style.height = height * 0.07;
  difficultyButtons[i].style.color = "black";
  difficultyButtons[i].style.backgroundColor = "#ECF0F1";
  difficultyButtons[i].style.fontSize = dominant * 0.025;
  difficultyButtons[i].setAttribute(
    "onclick",
    "setDifficulty(" + (i + 1) + ");"
  );
  difficultyButtons[i].style.border = "0px";
  difficultyButtons[i].style.borderRadius = "40px";
  difficultyButtons[i].style.boxShadow = "0px 15px 30px 17px rgba(0,0,0,0)";
  difficultyButtons[i].style.transform = "translateY(0px)";

  body[0].appendChild(difficultyButtons[i]);
}

difficultyButtons[0].style.backgroundColor = "#8E44AD";
difficultyButtons[0].style.color = "#ECF0F1";
difficultyButtons[0].style.fontWeight = "600";
difficultyButtons[0].style.letterSpacing = "3px";
difficultyButtons[0].style.boxShadow = "0px 15px 30px 17px rgba(0,0,0,0.45)";
difficultyButtons[0].style.transform = "translateY(4px)";
difficultyButtons[0].innerHTML = "EASY";
difficultyButtons[1].innerHTML = "MEDIUM";
difficultyButtons[2].innerHTML = "HARD";

timer = function() {
  if (timeLeft < 1) loseGame();
  else {
    timeLeft--;
    timerLabel.innerHTML = timeLeft;
  }
  //console.log(timeLeft);
};

customTimer = function() {
  if (timeLeft < 1) loseCustomGame();
  else {
    timeLeft--;
    timerLabel.innerHTML = timeLeft;
  }
  //console.log(timeLeft);
};

getDistance = function(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

check = function(x, y) {
  var temp = true;
  for (var i = 0; i < 10; i++) {
    if (decoys[i] != 0)
      if (
        getDistance(decoys[i].x, decoys[i].y, x, y) <
        Math.max(width, height) * 0.25
      )
        temp = false;
  }
  if (
    getDistance(playButton.x, playButton.y, x, y) <
    Math.max(width, height) * 0.25
  )
    temp = false;

  return temp;
};

addDecoys = function() {
  for (var i = 0; i < 10; i++) {
    if (decoys[i] != 0) {
      decoys[i].remove();
      decoys[i] = 0;
    }
  }
  var decoyNumber;

  if (score < 3) return;
  if (score > 30) decoyNumber = parseInt(Math.random() * 10);
  else decoyNumber = parseInt(Math.random() * (score / 3));

  //console.log(decoyNumber);

  for (var i = 0; i < decoyNumber; i++) {
    var avaliable = false;
    var x = 0,
      y = 0,
      tryes = 0;
    while (avaliable == false && tryes < 10) {
      x = Math.random() * (width - width * 0.5);
      y = Math.random() * (height - height * 0.5);
      avaliable = check(x, y);
      tryes++;
      console.log(tryes);
    }
    if (tryes == 10) break;
    decoys[i] = document.createElement("BUTTON");
    decoys[i].style.position = "absolute";
    decoys[i].style.transform = "scale(0)";
    decoys[i].style.left = x + "px";
    decoys[i].style.top = y + "px";
    decoys[i].x = x;
    decoys[i].y = y;
	decoys[i].style.fontSize = dominant * 0.03;
    var temp = score + (parseInt(Math.random() * 10) - 5);
    if (temp == score) temp++;
    decoys[i].innerHTML = encrypt(temp);
    decoys[i].onclick = loseGame;
    decoys[i].setAttribute("class", "gameButton");
    decoys[i].style.backgroundColor = getRandomColor();
	resize(decoys[i]);
    body[0].appendChild(decoys[i]);
  }
  setTimeout(function() {
    for (var i = 0; i < 10; i++)
      if (decoys[i] != 0) decoys[i].style.transform = "scale(1)";
  }, 1);
};

addCustomDecoys = function() {
  for (var i = 0; i < 10; i++) {
    if (decoys[i] != 0) {
      decoys[i].remove();
      decoys[i] = 0;
    }
  }
  var decoyNumber;

  if (score < 3) return;
  if (score > 30) decoyNumber = parseInt(Math.random() * 10);
  else decoyNumber = parseInt(Math.random() * (score / 3));

  //console.log(decoyNumber);

  for (var i = 0; i < decoyNumber; i++) {
    var avaliable = false;
    var x = 0,
      y = 0,
      tryes = 0;
    while (avaliable == false && tryes < 10) {
      x = Math.random() * (width - width * 0.5);
      y = Math.random() * (height - height * 0.5);
      avaliable = check(x, y);
      tryes++;
      //console.log(tryes);
    }
    if (tryes == 10) break;
    decoys[i] = document.createElement("BUTTON");
    decoys[i].style.position = "absolute";
    decoys[i].style.transform = "scale(0)";
    decoys[i].style.left = x + "px";
    decoys[i].style.top = y + "px";
    decoys[i].x = x;
    decoys[i].y = y;
	decoys[i].style.fontSize = dominant * 0.03;
    var temp = score + (parseInt(Math.random() * 10) - 5);
    if (temp == score) temp++;
    decoys[i].innerHTML = customEncrypt(temp);
    decoys[i].onclick = loseCustomGame;
    decoys[i].setAttribute("class", "gameButton");
    decoys[i].style.backgroundColor = getRandomColor();
	resize(decoys[i]);
    body[0].appendChild(decoys[i]);
  }
  setTimeout(function() {
    for (var i = 0; i < 10; i++)
      if (decoys[i] != 0) decoys[i].style.transform = "scale(1)";
  }, 1);
};

advance = function() {
  playButton.style.transform = "scale(0)";
  setTimeout(function() {
    var x = Math.random() * (width - width * 0.5);
    var y = Math.random() * (height - height * 0.5);
    playButton.style.left = x + "px";
    playButton.style.top = y + "px";
    score++;
    playButton.innerHTML = encrypt(score);
    playButton.x = x;
    playButton.y = y;
    playButton.style.backgroundColor = getRandomColor();
	resize(playButton);
    addDecoys();
	

    if (score % 3 == 0) {
      timeLeft += 3;
      timeLeft += difficultyBonus();
    }

    timerLabel.innerHTML = timeLeft;
    playButton.style.transform = "scale(1)";
  }, 100);
};

customAdvance = function() {
  playButton.style.transform = "scale(0)";
  setTimeout(function() {
    var x = Math.random() * (width - width * 0.5);
    var y = Math.random() * (height - height * 0.5);
    playButton.style.left = x + "px";
    playButton.style.top = y + "px";
    score += parseInt(challenges[customIndex].increment);
    playButton.innerHTML = customEncrypt(score);
    playButton.x = x;
    playButton.y = y;
    playButton.style.backgroundColor = getRandomColor();
    addCustomDecoys();
	resize(playButton);

    if (
      score / challenges[customIndex].increment ==
      challenges[customIndex].goal
    )
      loseCustomGame();

    if (
      (score / challenges[customIndex].increment) %
        challenges[customIndex].timeAddOn ==
      0
    ) {
      timeLeft += parseInt(challenges[customIndex].timeAdd);
    }

    timerLabel.innerHTML = timeLeft;
    playButton.style.transform = "scale(1)";
  }, 100);
};

startGame = function() {
  if (ocupied == 1) return;
  else ocupied = 1;
  if(settingsDisplayed == 1)
	  forceCloseSettings();
  for (var i = 0; i < 3; i++) difficultyButtons[i].remove();
  body[0].appendChild(timerLabel);
  helpButton.remove();
  startButton.remove();
  highScoreLabel.remove();
  settingsButton.remove();
  musicButton.remove();
  soundButton.remove();
  challengeButton.remove();
  var x = Math.random() * (width - width * 0.5);
  var y = Math.random() * (height - height * 0.5);
  playButton.innerHTML = score;
  playButton.style.position = "absolute";
  playButton.style.left = x + "px";
  playButton.style.top = y + "px";
  playButton.style.width = dominant * 0.1;
  playButton.style.height = dominant * 0.1;
  playButton.onclick = advance;
  playButton.setAttribute("class", "gameButton");
  playButton.style.fontSize = dominant * 0.03;
  playButton.style.backgroundColor = getRandomColor();
  playButton.x = x;
  playButton.y = y;

  body[0].appendChild(playButton);

  timeLeft = 6;
  timeLeft += difficultyBonus();
  timerLoop = setInterval(timer, 1000);
  timerLabel.innerHTML = timeLeft;
  setTimeout(function() {
    playButton.style.transform = "scale(1)";
  }, 100);
};

startCustomGame = function(index) {
  customIndex = index;
  displayChallalngeMenu();
  for (var i = 0; i < 3; i++) difficultyButtons[i].remove();
  body[0].appendChild(timerLabel);
  helpButton.remove();
  startButton.remove();
  highScoreLabel.remove();
  settingsButton.remove();
  challengeButton.remove();
  var x = Math.random() * (width - width * 0.5);
  var y = Math.random() * (height - height * 0.5);
  playButton.innerHTML = score;
  playButton.style.position = "absolute";
  playButton.style.left = x + "px";
  playButton.style.top = y + "px";
  playButton.style.width = dominant * 0.1;
  playButton.style.height = dominant * 0.1;
  playButton.onclick = customAdvance;
    playButton.style.fontSize = dominant * 0.03;
  playButton.setAttribute("class", "gameButton");
  playButton.style.backgroundColor = getRandomColor();
  playButton.x = x;
  playButton.y = y;

  body[0].appendChild(playButton);

  timeLeft = challenges[customIndex].initalTime;
  timerLoop = setInterval(customTimer, 1000);
  timerLabel.innerHTML = timeLeft;

  setTimeout(function() {
    playButton.style.transform = "scale(1)";
  }, 100);
};

displayHomeScreen = function() {
  body[0].appendChild(startButton);
  body[0].appendChild(helpButton);
  body[0].appendChild(highScoreLabel);
  body[0].appendChild(settingsButton);
  settingsButton.setAttribute("class","");
  body[0].appendChild(challengeButton);
  for (var i = 0; i < 3; i++) body[0].appendChild(difficultyButtons[i]);
  getRandomPallete();
};

loseGame = function() {
  clearInterval(timerLoop);
  playButton.remove();
  timerLabel.remove();
  for (var i = 0; i < 10; i++) {
    if (decoys[i] != 0) decoys[i].remove();
    decoys[i] = 0;
  }

  if (score > highScore[difficulty - 1]) {
    highScore[difficulty - 1] = score;
    storage.setItem("highScore" + difficulty, highScore[difficulty - 1]);
    highScoreLabel.innerHTML = highScore[difficulty - 1];
  }
  scoreLabel.innerHTML = score;
  score = 0;
  ocupied = 0;
  body[0].appendChild(continueButton);
  body[0].appendChild(scoreLabel);
};

loseCustomGame = function() {
  clearInterval(timerLoop);
  playButton.remove();
  timerLabel.remove();
  for (var i = 0; i < 10; i++) {
    if (decoys[i] != 0) decoys[i].remove();
    decoys[i] = 0;
  }

  if (
    score / challenges[customIndex].increment >=
    challenges[customIndex].goal
  ) {
    challenges[customIndex].sucess = true;
    challengeProgress[customIndex].style.backgroundColor = "Green";
  }

  score = 0;
  ocupied = 0;
  displayHomeScreen();
  saveChallenges();
  displayChallalngeMenu();
};

toMainMenu = function() {
  continueButton.remove();
  scoreLabel.remove();

  displayHomeScreen();
};

resize = function(temp){
	if(temp.innerHTML.length < 6){
		temp.style.width = dominant * 0.1;
		temp.style.height = dominant * 0.1;
	}
	else{
		temp.style.width = dominant * 0.15;
		temp.style.height = dominant * 0.15;
	}
}

startButton.style.position = "absolute";
startButton.style.left = (width - width * 0.25) / 2 + "px";
startButton.style.top = height * 0.5 + "px";
startButton.style.width = width * 0.25;
startButton.style.height = "auto";
startButton.onclick = startGame;

continueButton = document.createElement("Button");
continueButton.setAttribute("class", "continueButton");
continueButton.innerHTML = "CONTINUE";
continueButton.style.textAlign = "center";
continueButton.style.fontWeight = "600";
continueButton.style.position = "absolute";
continueButton.style.left = (width - width * 0.3) / 2 + "px";
continueButton.style.top = height * 0.5 + "px";
continueButton.style.width = width * 0.3;
continueButton.style.height = continueButton.style.width;
continueButton.style.fontSize = dominant * 0.03;
continueButton.onclick = toMainMenu;

displayHomeScreen();
