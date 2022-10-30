// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  let voicesSelect = document.getElementById('voice-select');
  let speakButton = document.getElementsByTagName('button')[0];
  let speakImage = document.getElementsByTagName('img')[0];
  let speechTextarea = document.getElementById('text-to-speak');
  let voices = [];

  function populateVoiceList() {

    voices = speechSynthesis.getVoices();

    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voicesSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function speechEvent() {

    const selectedOption = voicesSelect.selectedOptions[0].getAttribute('data-name');
    if (speechSynthesis.speaking || speechTextarea.value == '' || selectedOption == null) return;

    const speechUtterance = new SpeechSynthesisUtterance(speechTextarea.value);
    
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        speechUtterance.voice = voices[i];
      }
    }

    setSpeakingIcon();
    speechTextarea.blur();
    speechUtterance.onend = setNotSpeakingIcon;
    speechSynthesis.speak(speechUtterance);
  }
  speakButton.addEventListener('click', speechEvent);

  function setSpeakingIcon() {
    const imagePath = './assets/images/smiling-open.png';
    speakImage.setAttribute('src', imagePath);
  }

  function setNotSpeakingIcon() {
    const imagePath = './assets/images/smiling.png';
    speakImage.setAttribute('src', imagePath);
  }
  
}
