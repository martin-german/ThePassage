// ========== Place numbers in a circle ==========
function placeNumbersInCircle(){
  
  const outerCircle = document.querySelector('.circle-1');
  const numbers = outerCircle.querySelectorAll('.number');
 
  numbers.forEach((number, index) =>{
    const angle = (index * 18) - 90; 
    const radius = 180;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;

    number.style.left = `calc(50% + ${x}px)`;
    number.style.top = `calc(50% + ${y}px)`;
    number.style.transform = 'translate(-50%, -50%)';
  })
}  


// ========== Gameplay Logic ==========
function unlockSave() {
    //Initialize variables
    const lockedArray = []
    const unlockedArray = []
    let countOnes = 0;
    lockedArray.push(0);

    //Push 0s and 1s to the array
    for(let i = 1; i <= 5; i++){
        lockedArray.push(Math.random() < 0.5 ? 0 : 1);
    }

   for(let count = 0; count < lockedArray.length; count++){
    if(lockedArray[count] === 1){
      countOnes++;
    }
   }

  console.log('Ones in total ' + countOnes)

  //Winner text
  const winner = document.getElementById('win');

  //Rotate logic and unlock
  let currentRotation = 0;
  let currentIndex = 0;
  const circle = document.querySelector('.circle-1');
  const innerCircle = document.querySelector('.circle-2');

  //Rotate event listener
  window.addEventListener('keydown', function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    
    if(e.keyCode === 65) { //A left
      currentRotation += 5;
      currentIndex = (currentIndex - 1 + 100) % 100; 
      console.log(currentIndex)
    } else if (e.keyCode === 68){ //D right
      currentRotation -= 5;
      currentIndex = (currentIndex + 1 ) % 100; 
      console.log(currentIndex)
    } else if (e.keyCode === 32){ //Space reset
      if (lockedArray[currentIndex] === 1 && !unlockedArray.includes(currentIndex)) {
      unlockedArray.push(currentIndex);
      innerCircle.style.borderColor = 'red';
      console.log(unlockedArray)
      }

      currentRotation = 0;
      currentIndex = 0;

      if(unlockedArray.length === countOnes){
        if(winner.style.display === 'none'){
          winner.style.display = 'flex'
        }
        console.log('you win')
      }
    } else return;

    circle.style.transform = `rotate(${currentRotation}deg)`;

    if (lockedArray[currentIndex] === 1 && !unlockedArray.includes(currentIndex)) {
    innerCircle.style.borderColor = 'limegreen';
  } else {
    innerCircle.style.borderColor = 'red';
  }

    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    
  })

  console.log(lockedArray)
  return unlockedArray;
};


function startGame(startTimer, ingameTimer){
  document.getElementById('playButton').addEventListener('click',function(){
    const cardsElement = document.querySelector('.container');

    if(cardsElement){
      cardsElement.classList.remove('container');
      cardsElement.classList.add('hiddenContainer');
      console.log('Container class deleted.')
    }else console.error('Error, class not found!')

  //Counter start
  const countBack = document.getElementById("countBack");
  const gameplayDisplay = document.querySelector('#gamePlay');

    for (let i = startTimer; i >= 0; i--) {
      setTimeout(() => {
        countBack.textContent = "Game starts in " + i;
        if(i === 0){
          //If timer ends, show the combination lock
         countBack.style.display = "none";
         gameplayDisplay.classList.remove('gamePlay');
         gameplayDisplay.style.display = "block";
         unlockSave();
        }  
      }, (startTimer - i) * 1000);
    }

    for(let i = ingameTimer; i >= 0; i--){
    setTimeout(()=>{
      //display.
      console.log(i);
      if(i === 0){
        console.log('Times up! You lost');
      }
    },(ingameTimer - i) * 1000);
  }
  });
  

  
}

//Matrix style rainfall
function matrixRainFall(){
    let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
let letters = 'アァイィウヴエカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
letters = letters.split('');

// Setting up the columns
let fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < drops.length; i++) {
    let text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 50);
}


startGame(3,60);
matrixRainFall();
//unlockSave();
