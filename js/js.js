document.addEventListener('DOMContentLoaded', () => {

  /* ==========================
     LOGIN SCRIPT
  ========================== */

  const input = document.querySelector('.login__input');
  const button = document.querySelector('.login__button');
  const form = document.querySelector('.login-form');

  if (input && button && form) {

    const validateInput = ({ target }) => {
      if (target.value.length > 3) {
        button.removeAttribute('disabled');
      } else {
        button.setAttribute('disabled', '');
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      localStorage.setItem('player', input.value);
      window.location.href = 'play-games/';
    };

    input.addEventListener('input', validateInput);
    form.addEventListener('submit', handleSubmit);
  }

  /* ==========================
     GAME SCRIPT
  ========================== */

  const grid = document.querySelector('.grid');
  const spanPlayer = document.querySelector('.player');
  const timer = document.querySelector('.timer');
  const poinDisplay = document.querySelector('.poin');

  if (grid && spanPlayer && timer && poinDisplay) {

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
    };

    let firstCard = '';
    let secondCard = '';
    let poin = 0;
    let gameTimer;

    /* ===== TIMER ===== */
    const startGameTimer = () => {
      let currentTime = 35;
      timer.textContent = currentTime;

      gameTimer = setInterval(() => {
        currentTime--;
        timer.textContent = currentTime;

        if (currentTime <= 0) {
          clearInterval(gameTimer);
          endGame();
        }
      }, 1000);
    };

    /* ===== MODALS ===== */
    const showVictoryModal = () => {
      document.getElementById('victoryPlayerName').textContent = spanPlayer.textContent;
      document.getElementById('victoryPlayerPoints').textContent = poin;
      document.getElementById('victoryPlayerTime').textContent = timer.textContent;

      const modal = document.getElementById('victoryModal');
      modal.style.display = 'block';

      document.getElementById('victoryContinueButton').onclick = () => location.reload();
      document.getElementById('victoryRestartButton').onclick = () => {
        window.location.href = '../index.html';
      };
    };

    const showTimeoutModal = () => {
      document.getElementById('timeoutPlayerName').textContent = spanPlayer.textContent;
      document.getElementById('timeoutPlayerPoints').textContent = poin;
      document.getElementById('timeoutPlayerTime').textContent = timer.textContent;

      const modal = document.getElementById('timeoutModal');
      modal.style.display = 'block';

      document.getElementById('timeoutContinueButton').onclick = () => location.reload();
      document.getElementById('timeoutRestartButton').onclick = () => {
        window.location.href = '../index.html';
      };
    };

    /* ===== GAME LOGIC ===== */
    const checkEndGame = () => {
      const disabledCards = document.querySelectorAll('.disabled-card');
      if (disabledCards.length === characters.length * 2) {
        setTimeout(() => {
          clearInterval(gameTimer);
          showVictoryModal();
        }, 500);
      }
    };

    const endGame = () => {
      clearInterval(gameTimer);
      showTimeoutModal();
    };

    const checkCards = () => {
      const firstCharacter = firstCard.getAttribute('data-character');
      const secondCharacter = secondCard.getAttribute('data-character');

      if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        poin += Math.floor(100 / characters.length);
        poinDisplay.textContent = poin;

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
    };

    /* ===== GUARD ANTI KLIK KE-3 ===== */
    const revealCard = ({ target }) => {
      if (firstCard && secondCard) return;
      if (target.parentNode.classList.contains('reveal-card')) return;

      if (!firstCard) {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
      } else if (!secondCard) {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
      }
    };

    const createCard = (character) => {
      const card = createElement('div', 'card');
      const front = createElement('div', 'face front');
      const back = createElement('div', 'face back');

      front.style.backgroundImage = `url('../images/${character}.jpeg')`;

      card.appendChild(front);
      card.appendChild(back);

      card.addEventListener('click', revealCard);
      card.setAttribute('data-character', character);

      return card;
    };

    const loadGame = () => {
      const duplicated = [...characters, ...characters];
      const shuffled = duplicated.sort(() => Math.random() - 0.5);

      shuffled.forEach(character => {
        grid.appendChild(createCard(character));
      });
    };

    /* ===== INIT GAME ===== */
    spanPlayer.textContent = localStorage.getItem('player');

    const introModal = document.getElementById('modal');
    introModal.style.display = 'flex';

    setTimeout(() => {
      introModal.style.display = 'none';
      startGameTimer();
    }, 5000);

    loadGame();
  }
});
