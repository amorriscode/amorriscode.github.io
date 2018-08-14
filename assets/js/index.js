const sideNav = document.getElementById('side-nav');
const mainGrid = document.getElementById('main-grid');

const brandDivider = document.getElementById('intro').getElementsByClassName('divider')[0];
const introContainer = document.getElementById('intro').getElementsByClassName('section-container')[0];
const positiveImpactContainer = introContainer.getElementsByClassName('positive-impact')[0];
const madeWithCodeContainer = introContainer.getElementsByClassName('made-with-code')[0];
const triangles = document.getElementsByClassName('triangle');

const aboutSection = document.getElementById('about');

const goForAScroll = document.getElementById('go-for-a-scroll');
const goForAScrollLetters = goForAScroll.getElementsByClassName('letter');

const glitchables = document.getElementsByClassName('glitchable');

// Randomize
const getRandomZeroToMax = max => Math.floor(Math.random() * max);

// Change vertical scroll to horizontal
document.addEventListener('mousewheel', event => {
  const scrollAmount = event.deltaY || event.deltaX;
  window.scroll(window.pageXOffset + scrollAmount, 0); 
  event.preventDefault();

  // Adjust divider height
  const computedHeight = (window.pageXOffset !== 0)
    ? `${window.pageXOffset * 2}px`
    : '20px';
  brandDivider.style.height = computedHeight;

  // Adjust divider position from top
  const computedDividerPosition = (window.pageXOffset !== 0)
    ? `-${window.pageXOffset - 10}px`
    : '0px';
  brandDivider.style.top = computedDividerPosition;

  // Move the intro out of the way
  const computedIntroContainerPosition = (window.pageXOffset > 967)
    ? `${aboutSection.offsetLeft - window.pageXOffset - 112}px`
    : '25vw';
  introContainer.style.left = computedIntroContainerPosition;

  // Clip go for a scroll section
  const goForAScrollClipPath = `inset(0 ${window.pageXOffset}px 0 0)`;
  goForAScroll.style.setProperty('clip-path', goForAScrollClipPath);

  // Clip intro section
  const introClipPath = (window.pageXOffset < 967)
    ? `inset(0 ${window.pageXOffset - (introContainer.offsetLeft + 18)}px 0 0)`
    : 'inset(0 85% 0 0)';
  positiveImpactContainer.style.setProperty('clip-path', introClipPath);
  madeWithCodeContainer.style.setProperty('clip-path', introClipPath);

  // Adjust the side nav positioning
  const computedSideNavPositioning = (window.pageXOffset < window.innerWidth - 50)
    ? `${window.pageXOffset - (window.innerWidth - 50)}px`
    : '0';
  sideNav.style.left = computedSideNavPositioning;

  const computedSideNavBorderRight = (computedSideNavPositioning === '0')
    ? '2px solid #A6F673'
    : 'none';
  sideNav.style['border-right'] = computedSideNavBorderRight;
});

const possibleCharacters = [
  'A','B','C','D','E','F','G',
  'H','I','J','K','L','M','N',
  'O','P','Q','R','S','T','U',
  'V','W','X','Y','Z'
];

const possibleClipPaths = [
  'polygon(0 38%, 66% 44%, 100% 82%, 0 63%)',
  'polygon(0 42%, 100% 42%, 100% 88%, 0 88%)',
  'polygon(0 38%, 100% 0, 100% 42%, 0 63%)',
  'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
  'polygon(0 68%, 21% 67%, 31% 100%, 0 100%)',
  'polygon(45% 0, 100% 0%, 100% 100%, 44% 100%)',
];

setInterval(() => {
  const randomGlitch = glitchables[getRandomZeroToMax(glitchables.length)];
  const originalValue = randomGlitch.innerHTML;

  // Only swap the letters sometimes
  let letterSwapper;
  if (getRandomZeroToMax(100) % 2 === 0) {
    letterSwapper = setInterval(() => { 
      randomGlitch.innerHTML = possibleCharacters[getRandomZeroToMax(possibleCharacters.length)];
     }, 50);
  }

  const clipPathSwapper = setInterval(() => {
    randomGlitch.style.setProperty('clip-path', possibleClipPaths[getRandomZeroToMax(possibleClipPaths.length)]);
  }, 100)

  // Randomize the positioning of the glitch
  randomGlitch.style.setProperty('--glitch1-random-x', `${getRandomZeroToMax(10)}px`);
  randomGlitch.style.setProperty('--glitch1-random-y', `${getRandomZeroToMax(10)}px`);
  randomGlitch.style.setProperty('--glitch2-random-x', `-${getRandomZeroToMax(10)}px`);
  randomGlitch.style.setProperty('--glitch2-random-y', `-${getRandomZeroToMax(10)}px`);

  randomGlitch.classList.add('glitch');

  // Set back to normal letter
  setTimeout(() => {
    clearInterval(letterSwapper);
    clearInterval(clipPathSwapper);

    randomGlitch.innerHTML = originalValue;
    randomGlitch.style.setProperty('clip-path', 'none');
  }, 300);
  
  // Remove glitchy CSS
  setTimeout(() => {
    randomGlitch.classList.remove('glitch');
  }, getRandomZeroToMax(5000));
}, 1000);

// Shitty lights
setInterval(() => {
  brandDivider.style.setProperty('box-shadow', `0 0 ${getRandomZeroToMax(10)}px 0px #61FF00`);
  goForAScroll.style.setProperty('text-shadow', `0 0 ${getRandomZeroToMax(10)}px #61FF00`);
}, 50);

const neonLetterColors = ['#A6F673', 'black'];

setInterval(() => {
  const deadLetter = goForAScrollLetters[getRandomZeroToMax(goForAScrollLetters.length - 1)];

  const flickeringLetter = setInterval(() => {
    const color = neonLetterColors[getRandomZeroToMax(neonLetterColors.length)];
    const textShadow = (color !== 'black')
      ? `0 0 ${getRandomZeroToMax(10)}px #61FF00`
      : 'none';

    deadLetter.style.setProperty('color', color);
    deadLetter.style.setProperty('text-shadow', textShadow);
  }, getRandomZeroToMax(100));

  setTimeout(() => {
    clearTimeout(flickeringLetter);

    deadLetter.style.setProperty('color', neonLetterColors[0]);
    deadLetter.style.setProperty('text-shadow', `0 0 ${getRandomZeroToMax(10)}px #61FF00`);
  }, 1000);
  
}, getRandomZeroToMax(4000));

