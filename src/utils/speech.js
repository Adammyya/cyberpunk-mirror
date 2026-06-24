export function speakResponse(
  text,
  language = "en-GB"
) {
  if (!window.speechSynthesis) {
    console.error(
      "Speech Synthesis not supported"
    );
    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  const voices =
    window.speechSynthesis.getVoices();

  const auraVoice =
    voices.find(
      (voice) =>
        voice.name ===
        "Google UK English Male"
    );

  if (auraVoice) {
    utterance.voice = auraVoice;
  }

  utterance.lang = "en-GB";

  // AURA tuning
  utterance.rate = 0.88;
  utterance.pitch = 0.82;
  utterance.volume = 1;

  window.speechSynthesis.speak(
    utterance
  );
}