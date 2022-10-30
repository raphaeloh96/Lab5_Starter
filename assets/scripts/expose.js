// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  setHornImageAudioEvent();
  setAudioVolumeEvent();
}

function setHornImageAudioEvent() {

  const imageDirectory = './assets/images/'
  const audioDirectory = './assets/audio/'
  
  const imageMap = {
    'air-horn': 'air-horn.svg',
    'car-horn': 'car-horn.svg',
    'party-horn': 'party-horn.svg'
  };

  const audioMap = {
    'air-horn': 'air-horn.mp3',
    'car-horn': 'car-horn.mp3',
    'party-horn': 'party-horn.mp3'
  };

  const altTextMap = {
    'air-horn': 'Air Horn',
    'car-horn': 'Car Horn',
    'party-horn': 'Party Horn'
  };

  const jsConfetti = new JSConfetti();

  let hornSelect = document.getElementById('horn-select');
  let hornImage = document.getElementsByTagName('img')[0];
  let hornAudio = document.getElementsByTagName('audio')[0];
  let hornButton = document.getElementsByTagName('button')[0];
  let hornType = ''

  function setSrc(e) {
    hornType = e.target.value;
    hornImage.setAttribute('src', imageDirectory + imageMap[e.target.value]);
    hornImage.setAttribute('alt', altTextMap[e.target.value]);
    hornAudio.setAttribute('src', audioDirectory + audioMap[e.target.value]);
  }
  hornSelect.addEventListener('input', setSrc);

  function playAudio() {
    if (hornType == '') return;
    if (hornType == 'party-horn') jsConfetti.addConfetti();
    hornAudio.play();
  }
  hornButton.addEventListener('click', playAudio);
}


function setAudioVolumeEvent() {

  const iconsDirectory = './assets/icons/'

  let hornVolumeSlider = document.getElementById('volume');
  let volumeImage = document.getElementsByTagName('img')[1];
  let hornAudio = document.getElementsByTagName('audio')[0];

  let currentVolume = 50;
  let currentVolumeLevel = '33-66';


  const volumeIconMap = {
    '0': 'volume-level-0.svg',
    '1-32': 'volume-level-1.svg',
    '33-66': 'volume-level-2.svg',
    '67-100': 'volume-level-3.svg'
  };

  const volumeIconAltTextMap = {
    '0': 'Volume Level 0',
    '1-32': 'Volume Level 1',
    '33-66': 'Volume Level 2',
    '67-100': 'Volume Level 3'
  };

  function setVolumeImage(e) {
    hornVolumeSlider.setAttribute('value', e.target.value);
    currentVolume = hornVolumeSlider.getAttribute('value');

    if (currentVolume == 0) { currentVolumeLevel = '0'; } else
    if (currentVolume < 33) { currentVolumeLevel = '1-32'; } else
    if (currentVolume < 67) { currentVolumeLevel = '33-66'; } else
    { currentVolumeLevel = '67-100'; }
    
    volumeImage.setAttribute('src', iconsDirectory + volumeIconMap[currentVolumeLevel]);
    volumeImage.setAttribute('alt', volumeIconAltTextMap[currentVolumeLevel]);
    hornAudio.volume = currentVolume / 100;
  }
  hornVolumeSlider.addEventListener('input', setVolumeImage)
}



