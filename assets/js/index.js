const sideNav = document.getElementById('side-nav');
const mainGrid = document.getElementById('main-grid');
const brandDivider = document.getElementById('intro').getElementsByClassName('divider')[0];
const introContainer = document.getElementById('intro').getElementsByClassName('section-container')[0];
const aboutSection = document.getElementById('about');
const glitches = document.getElementsByClassName('glitchable');
const triangles = document.getElementsByClassName('triangle');

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
  const computerIntroContainerPosition = (window.pageXOffset > 967)
    ? `${aboutSection.offsetLeft - window.pageXOffset - 112}px`
    : '25vw';
  introContainer.style.left = computerIntroContainerPosition;

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

const randomCharacters = [
  'A','B','C','D','E','F','G',
  'H','I','J','K','L','M','N',
  'O','P','Q','R','S','T','U',
  'V','W','X','Y','Z'];

setInterval(() => {
  const randomGlitch = glitches[getRandomZeroToMax(glitches.length)];
  const originalValue = randomGlitch.innerHTML;

  // Only swap the letters sometimes
  randomGlitch.innerHTML = (getRandomZeroToMax(100) % 2 === 0)
    ? randomCharacters[getRandomZeroToMax(randomCharacters.length)]
    : originalValue;

  randomGlitch.style['clip-path'] = `inset(${getRandomZeroToMax(20)}px ${getRandomZeroToMax(4)}px)`;
  randomGlitch.classList.add('glitch');

  // Set back to normal letter
  setTimeout(() => {
    randomGlitch.innerHTML = originalValue;
    randomGlitch.style['clip-path'] = 'none';
  }, 100);
  
  // Remove glitchy CSS
  setTimeout(() => {
    randomGlitch.classList.remove('glitch');
  }, 2000);
}, 1000);

// Shitty lights
setInterval(() => {
  brandDivider.style['box-shadow'] = `0 0 ${getRandomZeroToMax(10)}px 0px #61FF00`;
}, 50);

