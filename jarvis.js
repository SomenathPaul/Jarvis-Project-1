const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const text_box = document.getElementById("text-box");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1.3;
  text_speak.volume = 1;
  text_speak.pitch = 6;
  text_speak.lang = "en-US";

  window.speechSynthesis.speak(text_speak);
}
const user = "sir";

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour > 12 && hour < 17) {
    speak("Good Afternoon master...");
  } else {
    speak("Good Evening sir...");
  }
}
// current time and date
let mid_dateTime = document.getElementById("mid_dateTime");
const date = new Date();
mid_dateTime.innerText = date;

//joke api function
const url = "https://v2.jokeapi.dev/joke/Any";

let getJoke = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      const catagory = item.category;
      const joke = item.setup;
      const delivery = item.delivery;
      speak("let me think... ");
      setTimeout(function () {
        text_box.innerText =
          joke + "  ->  " + delivery + " [ :) " + catagory + " ]";
      }, 2000);
      speak(joke);
      if (delivery != null) speak(". Answer is, " + delivery);
      speak(", by the way, this is a" + catagory + "joke");
    });
};
//data.weather[0].description
// weather api function
const weather = () => {
  const city = "Kolkata";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=apikey`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const name = data.name;
      const temperature = Number(data.main.temp - 273.15).toFixed(2);
      const feels_like = Number(data.main.feels_like - 273.15).toFixed(2);
      const sky = data.weather[0].description;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const weather_details = `Temperature in ${name} is ${temperature} Celsius, Feels like ${feels_like}, Weather description "${sky}", and Atmospheric Pressure ${pressure}, Humidity is ${humidity}, and Wind Speed ${windSpeed} kilometre per hour`;
      speak("Analysing today's Weather report...");
      setTimeout(function () {
        text_box.innerText = weather_details;
      }, 3000);
      speak(weather_details);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
};

// window.addEventListener("load", () => {
//   speak("System online, I'm activated!");
//   wishMe();
// });

btn.addEventListener("click", () => {
  // content.textContent = "Listening....";
  recognition.start();
  btn.innerHTML = '<i class="fa-solid fa-ear-listen"></i>';
  var sound = document.getElementById("mic_sound");
  sound.play();
});

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;

let capturedText = "";  // Variable to store captured text

recognition.onresult = function (event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  capturedText = transcript; // Append captured text to variable
  content.textContent = capturedText; // Display captured text
  // takeCommand(capturedText);

  const API_KEY = "apikey";
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
      text_box.textContent = data.choices[0].message.content.trim();
      speak(data.choices[0].message.content.trim());
    })
    .catch(() => {
      text_box.textContent = "Oops! Something went wrong. Please try again.";
      speak("Oops! Something went wrong. Please try again.");
    });
};
// speech recognition error message
recognition.onerror = function (event) {
  content.textContent = "Error occurred in recognition: " + event.error;
};
recognition.onend = function () {
  startButton.textContent = "Start Recording";
};


// function takeCommand(message) {
//   if (message.includes("hey") ||
//       message.includes("hello") ||
//       message.includes("hi") ||
//       message.includes("hello jarvis")) {
//     speak("Hello sir, How May I Help You?");
//   } else if (message.includes("jarvis")) {
//     speak("Yes sir");
//   } else if (message.includes("how are you")) {
//     speak("I'm great sir, how about you");
//   } else if (
//     message.includes("i am good") ||
//     message.includes("great") ||
//     message.includes("i am fine")) {
//     speak("That's great");
//     speak("there is anything I assist you sir");
//   } else if (
//     message.includes("hold jarvis") ||
//     message.includes("hold on jarvis") ||
//     message.includes("hold on") ||
//     message.includes("wait for a second jarvis")
//   ) {
//     speak("okay" + user + " i'll waiting");
//   } else if (
//     message.includes("who are you") ||
//     message.includes("tell me about yourself") ||
//     message.includes("tell me somthing about you") ||
//     message.includes("describe yourself") ||
//     message.includes("who is jarvis")) {
//     speak("Okay" + user + ",first of all, I am Jarvis. I am a vertual artificial intelligence. My purpose is to assist and provide information to the best of my ability. If you have any questions or need help with something, feel free to ask!");
//   } else if (
//     message.includes("love you") ||
//     message.includes("i love you") ||
//     message.includes("love you too") ||
//     message.includes("i love you too")) {
//     speak("Thank you," + user + "I appreciate your sentiment, but it's important to clarify that I am just a machine, I don't have feelings. However, I'm here to help provide information according to your command.");
//   } else if (message.includes("thank you jarvis")) {
//     speak("Welcome Sir");
//   } else if (
//     message.includes("i am not talking to you jarvis") ||
//     message.includes("jarvis i am not talking to you")
//   ) {
//     speak("Sorry Sir, keep continue");
//   }

//   //  Date and Time
//   else if (
//     message.includes("time") ||
//     message.includes("tell me the time jarvis") ||
//     message.includes("tell me the exact time")
//   ) {
//     const time = new Date().toLocaleString(undefined, {
//       hour: "numeric",
//       minute: "numeric",
//     });
//     const finalText = time;
//     speak("Time is:" + finalText);
//   } else if (
//     message.includes("date") ||
//     message.includes("today's date") ||
//     message.includes("tell me the date jarvis") ||
//     message.includes("tell me the current date")) {
//     const date = new Date().toLocaleString(undefined, {
//       month: "short",
//       day: "numeric",
//     });
//     const finalText = date;
//     speak("Today's Date is:" + finalText);
//   }

//   //  Social Media
//   else if (message.includes("open google")) {
//     window.open("https://google.com", "_blank");
//     speak("Opening Google...");
//   } else if (message.includes("open youtube")) {
//     window.open("https://youtube.com", "_blank");
//     speak("Opening Youtube...");
//   } else if (message.includes("open facebook")) {
//     window.open("https://facebook.com", "_blank");
//     speak("Opening Facebook...");
//   } else if (message.includes("open instagram")) {
//     window.open("https://instagram.com", "_blank");
//     speak("Opening Instagram...");
//   }

//   // Open System Apps
//   else if (message.includes("Open Calculator")) {
//     window.open("Calculator:///");
//     const finalText = "Opening Calculator";
//     speak(finalText);
//   } else if (message.includes("Open Whatsapp")) {
//     window.open("Whatsapp:///");
//     speak("Opening WhatsApp...");
//   }

//   // commands through API call
//   else if (
//     message.includes("tell me a joke") ||
//     message.includes("tell me another joke") ||
//     message.includes("one more joke")
//   ) {
//     getJoke();
//   } else if (
//     message.includes("tell me the weather details") ||
//     message.includes("tell me the weather") ||
//     message.includes("what is the weather today") ||
//     message.includes("todays weather")) {
//     weather();
//   }
// }

// diffrent tab sounds functions
let sendMsg = document.getElementById("sendMsg");
sendMsg.addEventListener("click", () => {
  // send message sound
  var Btn_sound = new Audio(
    "./Technology sounds/mixkit-cybernetic-technology-affirmation-3116.wav"
  );
  Btn_sound.play();
});

let jarvisSpeetch = document.getElementById("jarvisSpeetch");
jarvisSpeetch.addEventListener("click", () => {
  // jarvis speech mp3
  var Btn_sound = new Audio("./mp3/Jarvis.mp3");
  Btn_sound.play();
});

function tabSound() {
  // tab sound
  var Btn_sound = new Audio(
    "./Technology sounds/mixkit-modern-technology-select-3124.wav"
  );
  Btn_sound.play();
}

// keypress function
document.addEventListener("keypress", function (event) {
  makeSound(event.key);
});

function makeSound(key) {
  switch (key) {
    case "Enter":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-cybernetic-technology-affirmation-3116.wav"
      );
      audio_A.play();
      break;

    case "a":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "b":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "c":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "d":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "e":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "f":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "g":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "h":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "i":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "j":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "k":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "l":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "m":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "n":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "o":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "p":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "q":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "r":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "s":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "t":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "u":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "v":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "w":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "x":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "y":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
    case "z":
      var audio_A = new Audio(
        "./Technology sounds/mixkit-modern-technology-select-3124.wav"
      );
      audio_A.play();
      break;
  }
}
