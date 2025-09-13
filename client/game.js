
// ========== Matrix Style Rainfall ==========
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

// ========== Place numbers in a circle ==========
function placeNumbersInCircle()
{
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

function startGame(startTimer, ingameTimer){
  document.getElementById('playButton').addEventListener('click',function(){
    
    const cardsElement = document.querySelector('.container');
    const countBack = document.getElementById("countback");
    const gameplayDisplay = document.querySelector('.gameplay');
    const gameTimer = document.getElementById('timer');
    
    if(cardsElement)
    {
      cardsElement.classList.replace('container', 'hiddenContainer');
      //console.log('Container class replaced.')
    }else console.error('Error, class not found!')

    // Countdown before game start
  
    for (let i = startTimer; i >= 0; i--) {
      setTimeout(() => {
        countBack.textContent = `Game starts in ${i}`;
        if(i === 0){
         countBack.style.display = "none";
         gameplayDisplay.style.display = "block";
         gameplayLogic();

      // In-game timer
      for(let j = ingameTimer; j >= 0; j--) {
        setTimeout(()=> {
            gameTimer.textContent = `${j}`
            
              if(j === 0) {
                gameTimer.style.display ='none';
                console.log('Times up! You lost');
              }
            }, (ingameTimer - j) * 1000);
          }
        }  
      }, (startTimer - i) * 1000);
    }
  });
}

// ========== Gameplay Logic ==========
function gameplayLogic() 
{
    //Array first element always 0, with ...spread generate an array with random placed 0s and 1s
    const lockedArray = [0, ...Array.from({ length:5 }, () => Math.random() < 0.5 ? 0 : 1)]
    const unlockedArray = []
    let countOnes = lockedArray.filter( number => number === 1).length;
  
    /* Changed to Array.from()
    for(let i = 1; i <= 100; i++){
        lockedArray.push(Math.random() < 0.5 ? 0 : 1);
    }
    */
  
   /* Changed to .filter()
   for(let count = 0; count < lockedArray.length; count++){
    if(lockedArray[count] === 1){
      countOnes++;
    }
   }
    */

  console.log('Ones in total ' + countOnes)

  const winnerText = document.getElementById('win');
  const outerCircle = document.querySelector('.circle-1');
  const innerCircle = document.querySelector('.circle-2');

  let currentRotation = 0;
  let currentIndex = 0;

  function handleKeyDown(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    
    switch(e.keyCode)
    {
      case 65:
        currentRotation += 5;
        currentIndex = (currentIndex - 1 + 100) % 100;
        break;

      case 68:
        currentRotation -= 5;
        currentIndex = (currentIndex + 1) % 100;
        break;
      
      case 32:
        if(lockedArray[currentIndex] === 1 && !unlockedArray.includes(currentIndex))
          {
            unlockedArray.push(currentIndex);
            innerCircle.style.borderColor = 'red';
          }

        currentRotation = 0;
        currentIndex = 0; 

        if(unlockedArray.length === countOnes)
        {
          winnerText.style.display = 'flex';
        }
        break;

        default:
          return;
    }

    outerCircle.style.transform = `rotate(${currentRotation}deg)`;
    innerCircle.style.borderColor =
      (lockedArray[currentIndex] === 1 && !unlockedArray.includes(currentIndex)) ? 'limegreen' : 'red';
    if(audio)
    {
      audio.currentTime = 0;
      audio.play();
    }
  }

  window.addEventListener('keydown', handleKeyDown);
  return unlockedArray;
}
  /*
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
        if(winnerText.style.display === 'none'){
          winnerText.style.display = 'flex'
        }
        console.log('you win')
      }
    } else return;

    outerCircle.style.transform = `rotate(${currentRotation}deg)`;

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

*/


matrixRainFall();
placeNumbersInCircle();
startGame(3,60);

//gameplayLogic();
