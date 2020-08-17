const toggleBtn = document.getElementById("toggle");
const textBox = document.getElementById("text-box");
const closeBtn = document.getElementById("close");
const voiceSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const main = document.querySelector("main");

//get voices stuff
let voices = [];
function voiceChange() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
}
//voicechange();
speechSynthesis.addEventListener("voiceschanged", voiceChange);

//create box stuff
const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

//create Box
function createBox(item) {
  const { image, text } = item;
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
  <img src='${image}' alt="${text}"/>
  <p class="info">${text}</p>
  `;

  //speech event
  box.addEventListener("click", () => {
    // console.log(event.target);
    // console.log(box.closest("div"));
    setTextMessage(text);
    speakText();
    //add active class
    box.closest("div").classList.add("active");
    setTimeout(() => box.closest("div").classList.remove("active"), 800);
  });

  main.appendChild(box);
}
// Init speech synth
const message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
  message.text = text;
}
function speakText() {
  speechSynthesis.speak(message);
}

//textarea stuff

readBtn.addEventListener("click", () => {
  const input = textarea.value;
  setTextMessage(input);
  speakText();
});

//event listener
toggleBtn.addEventListener("click", () => {
  textBox.classList.toggle("show");
});

closeBtn.addEventListener("click", function () {
  textBox.classList.remove("show");
});

function setVoice() {
  message.voice = voices.find((voice) => {
    console.log(voice.name + "--" + event.target.value);
    return voice.name === event.target.value;
  });
}
//voice select
voiceSelect.addEventListener("change", setVoice);
