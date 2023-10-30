const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const poinDisplay = document.querySelector('.poin'); // Tambahan: Ambil elemen poin


const characters = [
  'image8',
  'image1',
  'image2',
  'image3',
  'image4',
  'image6',
  'image9',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';
let poin = 0; // Tambahan: Variabel poin
let gameTimer; // Variabel timer permainan

const startGameTimer = () => {
  let currentTime = 35; // Waktu awal, sesuaikan dengan durasi yang Anda inginkan
  timer.innerHTML = currentTime;

  gameTimer = setInterval(() => {
    currentTime -= 1;
    timer.innerHTML = currentTime;
    if (currentTime <= 0) {
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
}

// const showVictoryModal = () => {
//   const victoryModal = document.getElementById('victoryModal');
//   const victoryPlayerName = document.getElementById('victoryPlayerName');
//   const victoryPlayerPoints = document.getElementById('victoryPlayerPoints');
//   const victoryPlayerTime = document.getElementById('victoryPlayerTime');
//   const victoryOKButton = document.getElementById('victoryOKButton');

//   victoryPlayerName.textContent = spanPlayer.innerHTML;
//   victoryPlayerPoints.textContent = poin;
//   victoryPlayerTime.textContent = timer.innerHTML;

//   victoryModal.style.display = 'block';

//   victoryOKButton.onclick = () => {
//     victoryModal.style.display = 'none';
//     location.reload();
//   }
// }

const showVictoryModal = () => {
  const victoryModal = document.getElementById('victoryModal');
  const victoryPlayerName = document.getElementById('victoryPlayerName');
  const victoryPlayerPoints = document.getElementById('victoryPlayerPoints');
  const victoryPlayerTime = document.getElementById('victoryPlayerTime');
  const victoryContinueButton = document.getElementById('victoryContinueButton');
  const victoryRestartButton = document.getElementById('victoryRestartButton');

  victoryPlayerName.textContent = spanPlayer.innerHTML;
  victoryPlayerPoints.textContent = poin;
  victoryPlayerTime.textContent = timer.innerHTML;

  victoryModal.style.display = 'block';

  victoryContinueButton.onclick = () => {
    victoryModal.style.display = 'none';
    // Di sini tambahkan logika untuk melanjutkan permainan, misalnya memuat ulang permainan.
    location.reload();
  };

  victoryRestartButton.onclick = () => {
    victoryModal.style.display = 'none';
    window.location.href = '../index.html';
  };
}


const showTimeoutModal = () => {
  const timeoutModal = document.getElementById('timeoutModal');
  const timeoutPlayerName = document.getElementById('timeoutPlayerName');
  const timeoutPlayerPoints = document.getElementById('timeoutPlayerPoints');
  const timeoutPlayerTime = document.getElementById('timeoutPlayerTime');
  const timeoutContinueButton = document.getElementById('timeoutContinueButton');
  const timeoutRestartButton = document.getElementById('timeoutRestartButton');

  timeoutPlayerName.textContent = spanPlayer.innerHTML;
  timeoutPlayerPoints.textContent = poin;
  timeoutPlayerTime.textContent = timer.innerHTML;

  timeoutModal.style.display = 'block';

  timeoutContinueButton.onclick = () => {
    timeoutModal.style.display = 'none';
    location.reload();
  };

  timeoutRestartButton.onclick = () => {
    timeoutModal.style.display = 'none';
    window.location.href = '../index.html';
  };
}
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 14) { // Sesuaikan jumlah kartu dengan yang Anda inginkan    
    setTimeout(() => {
      clearInterval(gameTimer);
      // alert(`YAY!, ${spanPlayer.innerHTML}! kamu menyelesaikan permainan ini dalam waktu ${timer.innerHTML} detik. poin yang kamu dapatkan sebesar ${poin}`);
      // location.reload();
      showVictoryModal();
    }, 500);
  }
}

const endGame = () => {
  clearInterval(gameTimer);
  // alert(`Waktu habis. Permainan berakhir ${spanPlayer.innerHTML}. Poin kamu: ${poin}`);
  // location.reload();
  showTimeoutModal();
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    poin += Math.floor(14.29); // Menggunakan Math.floor untuk membulatkan poin ke bilangan bulat
    // poin += Math.ceil(100 / 7); // Menggunakan Math.ceil untuk memastikan total mencapai atau melampaui 100
    poinDisplay.textContent = poin; // Menampilkan poin tanpa angka desimal
    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}


const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.jpeg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

// window.onload = () => {
//   spanPlayer.innerHTML = localStorage.getItem('player');
//   startGameTimer();
//   loadGame();
// }

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');


  // Tampilkan modal
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';

  // Menunda pemulaiannya hingga modal hilang
  setTimeout(() => {
    modal.style.display = 'none';

    // Mulai timer setelah modal hilang
    startGameTimer();
  }, 5000); // Ubah angka ini sesuai keinginan Anda (dalam milidetik).
  loadGame();
}