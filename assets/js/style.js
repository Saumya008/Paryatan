let sky = document.getElementById("sky");
let cloud1 = document.getElementById("cloud1");
let cloud2 = document.getElementById("cloud2");
let cloud3 = document.getElementById("cloud3");
let mountFg = document.getElementById("mountFg");
let mountMg = document.getElementById("mountMg");
let mountBg = document.getElementById("mountBg");
let l2boat = document.getElementById("l2boat");
let text = document.getElementById("text");

window.addEventListener('scroll', function (e) {

  var value = window.scrollY;
  cloud1.style.top = value * 0.5 + 'px';
  cloud2.style.left = value * 0.5 + 'px';
  cloud3.style.left = value * 0.5 + 'px';
  mountBg.style.top = value * 0.5 + 'px';
  mountFg.style.left = value * 0.5 + 'px';
  mountMg.style.top = value * 0.5 + 'px';
  text.style.bottom = value * 0.5 + 'px';
  l2boat.style.left = value * 0.2 + 'px';



})

$(function () {
  AOS.init();
});




var temp = document.querySelector(".gt");
var temp1 = document.querySelector(".gt1");
var temp2 = document.querySelector(".gt2");


fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + "Amritsar" + "&appid=5ea20c34427b9975a24ca2c9d4b64486",
  )
  .then((res) => res.json())
  .then((data) => {
    var tempvalue = data["main"]["temp"];
    temp.innerHTML = "Temprature: " + (Math.floor(tempvalue - 273) + "°");

  })

fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + "Agra" + "&appid=5ea20c34427b9975a24ca2c9d4b64486",
  )
  .then((res) => res.json())
  .then((data) => {
    var tempvalue = data["main"]["temp"];
    temp1.innerHTML = "Temprature: " + (Math.floor(tempvalue - 273) + "°");

  })

fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + "Uttarakhand" + "&appid=5ea20c34427b9975a24ca2c9d4b64486",
  )
  .then((res) => res.json())
  .then((data) => {
    var tempvalue = data["main"]["temp"];
    temp2.innerHTML = "Temperature: " + (Math.floor(tempvalue - 273) + "°");

  })



//QUIZ 

var quiz = {
  data: [{
      q: "Which city of India is also known as the ‘Venice of the East’?",
      o: [
        "Varanasi, Uttar Pradesh",
        "Haridwar, Uttarakhand",
        "Rishikesh, Uttarakhand",
        "Dharamshala, Himachal Pradesh"
      ],
      a: 2
    },
    {
      q: "Which of these is a heritage & historical monument of Pink City – Jaipur?",
      o: [
        "Mehrangarh Fort",
        "Hawa Mahal",
        "Umaid Bhawan Palace",
        "Patwon Ki Haveli"
      ],
      a: 1
    },
    {
      q: "The city of Amritsar is famous for which holy destination?",
      o: [
        "Vaishnodevi Temple",
        "Golden Temple",
        "Akshardham Temple",
        "Khajuraho Temples"
      ],
      a: 1
    },
    {
      q: "By the banks of which Indian river is the tallest statue in the world located?",
      o: [
        "Ganga",
        "Brahmaputra",
        "Narmada",
        "Sutlej"

      ],
      a: 2
    },
    {
      q: "The National Song of India was composed by",
      o: [
        "Rabindranath Tagore",
        "Bankim Chandra Chatterji",
        "Iqbal",
        "Jai Shankar Prasad"
      ],
      a: 1
    }
  ],

  hWrap: null,
  hQn: null,
  hAns: null,


  now: 0,
  score: 0,

  init: () => {
    quiz.hWrap = document.getElementById("quizWrap");

    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    quiz.draw();
  },


  draw: () => {
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        quiz.select(label);
      });
      quiz.hAns.appendChild(label);
    }

  },


  select: (option) => {

    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }


    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }


    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
        quiz.hAns.innerHTML = "<input type='button' value='Try Again' onclick='quiz.reset()'>";
      }
    }, 1000);

  },

  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }

};

window.addEventListener("load", quiz.init);