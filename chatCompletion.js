const startButton = document.getElementById("startRecording");
const output = document.getElementById("output");
const result = document.getElementById("text-box");
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.continuous = true;

let capturedText = ""; // Variable to store captured text

startButton.addEventListener("click", () => {
  recognition.start();
  startButton.innerHTML = '<i class="fa-solid fa-ear-listen"></i>';
});

recognition.onresult = function (event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  capturedText = transcript; // Append captured text to variable
  output.textContent = capturedText; // Display captured text

  const API_KEY = "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";
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: capturedText }],
    }),
  };

  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      result.textContent = data.choices[0].message.content.trim();
      speak(data.choices[0].message.content.trim());
    })
    .catch(() => {
      result.textContent = "Oops! Something went wrong. Please try again.";
      speak("Oops! Something went wrong. Please try again.");
    });
};

recognition.onend = function () {
  startButton.textContent = "Start Recording";
};

recognition.onerror = function (event) {
  output.textContent = "Error occurred in recognition: " + event.error;
};

// speak function
function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1.3;
  text_speak.volume = 1;
  text_speak.pitch = 6;
  text_speak.lang = "en-US";

  window.speechSynthesis.speak(text_speak);
}
