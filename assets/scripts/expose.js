// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  setHornImageAudioEvent();
  setAudioVolumeEvent();
}

function debug(val) {
  console.log(val);
}

function setHornImageAudioEvent() {

  const image_directory = './assets/images/'
  const audio_directory = './assets/audio/'
  
  const image_map = {
    'air-horn': 'air-horn.svg',
    'car-horn': 'car-horn.svg',
    'party-horn': 'party-horn.svg'
  };

  const audio_map = {
    'air-horn': 'air-horn.mp3',
    'car-horn': 'car-horn.mp3',
    'party-horn': 'party-horn.mp3'
  };

  const alt_text_map = {
    'air-horn': 'Air Horn',
    'car-horn': 'Car Horn',
    'party-horn': 'Party Horn'
  };

  const jsConfetti = new JSConfetti();

  let horn_select = document.getElementById('horn-select');
  let horn_image = document.getElementsByTagName('img')[0];
  let horn_audio = document.getElementsByTagName('audio')[0];
  let horn_button = document.getElementsByTagName('button')[0];
  let horn_type = ''

  function setSrc(e) {
    horn_type = e.target.value;
    horn_image.setAttribute('src', image_directory + image_map[e.target.value]);
    horn_image.setAttribute('alt', alt_text_map[e.target.value]);
    horn_audio.setAttribute('src', audio_directory + audio_map[e.target.value]);
  }
  horn_select.addEventListener('input', setSrc);

  function playAudio() {
    if (horn_type == '') return;
    if (horn_type == 'party-horn') jsConfetti.addConfetti();
    horn_audio.play();
  }
  horn_button.addEventListener('click', playAudio);
}


function setAudioVolumeEvent() {

  const icons_directory = './assets/icons/'

  let horn_volume_slider = document.getElementById('volume');
  let volume_image = document.getElementsByTagName('img')[1];
  let horn_audio = document.getElementsByTagName('audio')[0];

  let current_volume = 50;
  let current_volume_level = '33-66';


  const volume_icon_map = {
    '0': 'volume-level-0.svg',
    '1-32': 'volume-level-1.svg',
    '33-66': 'volume-level-2.svg',
    '67-100': 'volume-level-3.svg'
  };

  const volume_icon_alt_text_map = {
    '0': 'Volume Level 0',
    '1-32': 'Volume Level 1',
    '33-66': 'Volume Level 2',
    '67-100': 'Volume Level 3'
  };

  function setVolumeImage(e) {
    horn_volume_slider.setAttribute('value', e.target.value);
    current_volume = horn_volume_slider.getAttribute('value');

    if (current_volume == 0) { current_volume_level = '0'; } else
    if (current_volume < 33) { current_volume_level = '1-32'; } else
    if (current_volume < 67) { current_volume_level = '33-66'; } else
    { current_volume_level = '67-100'; }
    
    volume_image.setAttribute('src', icons_directory + volume_icon_map[current_volume_level]);
    volume_image.setAttribute('alt', volume_icon_alt_text_map[current_volume_level]);
    horn_audio.volume = current_volume / 100;
  }
  horn_volume_slider.addEventListener('input', setVolumeImage)
}


