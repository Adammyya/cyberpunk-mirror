export function speakResponse(text, language = navigator.language) {
  if (!window.speechSynthesis) {
    console.error("Speech Synthesis not supported");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = language;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}