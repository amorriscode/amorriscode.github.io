const sideNav = document.getElementById('side-nav');
const mainGrid = document.getElementById('main-grid');

const introSection = document.getElementById('intro');
const introContainer = introSection.getElementsByClassName('section-container')[0];

const brandDivider = introSection.getElementsByClassName('divider')[0];
const brandDividerBoundingBox = brandDivider.getBoundingClientRect();
const brandAmorrisContainer = introContainer.getElementsByClassName('amorris')[0];

const brandCodeContainer = introContainer.getElementsByClassName('code')[0];
const brandCodeContainerBoundingBox = brandCodeContainer.getBoundingClientRect();

const positiveImpactContainer = introContainer.getElementsByClassName('positive-impact')[0];
const positiveImpactContainerBoundingBox = positiveImpactContainer.getBoundingClientRect();
const madeWithCodeContainer = introContainer.getElementsByClassName('made-with-code')[0];
const triangles = document.getElementsByClassName('triangle');

const goForAScroll = document.getElementById('go-for-a-scroll');
const goForAScrollLetters = goForAScroll.getElementsByClassName('letter');

const glitchables = document.getElementsByClassName('glitchable');

// Randomize
const getRandomZeroToMax = max => Math.floor(Math.random() * max);

// Fake horizontal scroll
let xOffset = 0;

// Clip path math
const getClipPathOffset = (boundingBox) => {
  let clipPathOffset = '0px';
  if (window.innerWidth - xOffset < brandDividerBoundingBox.x) {
    clipPathOffset = '85%';
  } else if (window.innerWidth - xOffset < boundingBox.right) {
    clipPathOffset = `${Math.abs(window.innerWidth - xOffset - boundingBox.right)}px`;
  }

  return clipPathOffset;
}

// Fade intro text
const introTimeline = new TimelineMax();
introTimeline.pause()
  .add(TweenMax.to(brandAmorrisContainer, 1, { opacity: 0 }).delay(0.5), 0)
  .add(TweenMax.to(positiveImpactContainer, 1, { opacity: 0 }).delay(0.5), 0)
  .add(TweenMax.to(madeWithCodeContainer, 1, { opacity: 0 }).delay(0.5), 0);

// Change vertical scroll to horizontal
document.addEventListener('mousewheel', event => {
  xOffset += event.deltaY * 2;
  xOffset = xOffset < 0 ? 0 : xOffset;

  // Adjust divider height
  const computedHeight = (xOffset !== 0)
    ? `${xOffset * 2}px`
    : '20px';
  brandDivider.style.setProperty('height', computedHeight);

  // Adjust divider position from top
  const computedDividerPosition = (xOffset !== 0)
    ? `-${xOffset - 10}px`
    : '0px';
  brandDivider.style.setProperty('top', computedDividerPosition);

  // Move the intro out of the way
  const computedIntroContainerPosition = (window.innerWidth - xOffset < brandDividerBoundingBox.x)
    ? `${window.innerWidth - xOffset - 117}px`
    : '25vw';
  introContainer.style.setProperty('left', computedIntroContainerPosition);

  // Clip go for a scroll section
  const goForAScrollClipPath = `inset(0 ${xOffset}px 0 0)`;
  goForAScroll.style.setProperty('clip-path', goForAScrollClipPath);
  
  // Clip code in brand section
  const brandClipPathOffset = getClipPathOffset(brandCodeContainerBoundingBox);
  const brandClipPath = `inset(0 ${brandClipPathOffset} 0 0)`;
  brandCodeContainer.style.setProperty('clip-path', brandClipPath);

  // Clip intro section
  const introClipPathOffset = getClipPathOffset(positiveImpactContainerBoundingBox);
  const introClipPath = `inset(0 ${introClipPathOffset} 0 0)`;
  positiveImpactContainer.style.setProperty('clip-path', introClipPath);
  madeWithCodeContainer.style.setProperty('clip-path', introClipPath);

  // Progress the introScene
  if (window.innerWidth - xOffset < brandDividerBoundingBox.x) {
    introTimeline.totalProgress(xOffset / 1000 - 1);
  } else {
    introTimeline.totalProgress(0);
  }

  // Adjust the side nav positioning
  const computedSideNavPositioning = (xOffset < window.innerWidth - 50)
    ? `${xOffset - (window.innerWidth - 50)}px`
    : '0';
  sideNav.style.setProperty('left', computedSideNavPositioning);

  // Made the divider absolutely positioned
  if (computedSideNavPositioning === '0') {
    brandDivider.style.setProperty('position', 'fixed');
    brandDivider.style.setProperty('left', '50px');
  } else {
    brandDivider.style.setProperty('left', '0');
    brandDivider.style.setProperty('position', 'absolute');
  }
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

const neonLetterColors = ['#A6F673', '#1F1837'];

setInterval(() => {
  const goForAScrollDeadLetter = goForAScrollLetters[getRandomZeroToMax(goForAScrollLetters.length - 1)];

  const flickeringLetter = setInterval(() => {
    const color = neonLetterColors[getRandomZeroToMax(neonLetterColors.length)];
    const textShadow = (color !== '#1F1837')
      ? `0 0 ${getRandomZeroToMax(10)}px #61FF00`
      : 'none';

    goForAScrollDeadLetter.style.setProperty('color', color);
    goForAScrollDeadLetter.style.setProperty('text-shadow', textShadow);
  }, getRandomZeroToMax(100));

  setTimeout(() => {
    clearTimeout(flickeringLetter);
  
    goForAScrollDeadLetter.style.setProperty('color', neonLetterColors[0]);
    goForAScrollDeadLetter.style.removeProperty('text-shadow');
  }, 1000);
  
}, getRandomZeroToMax(4000));

