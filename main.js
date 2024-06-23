const audio = document.getElementById("audio");
const play_pause = document.querySelector(".play_pause");
const play = document.querySelector("#play");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const songName = document.querySelector("#songName");
const singerName = document.querySelector("#singerName");
const profileImage = document.querySelector("#profileImage");
const crrTime = document.querySelector("#crrTime");
const durationTime = document.querySelector("#duration");
const timeLine = document.querySelector("#timeLine");
const currentVolume = document.querySelector("#volume");
const volumeIcon = document.getElementById('volumeIcon');

let songNumber = 0;
let intervalID02;
const album = [
  {
    name: "Tum Hi Aana",
    bg: "img5.jpg",
    singer: "Jubin Nautiyal",
    song: "song5.mp3",
  },
  {
    name: "Ye Jism Hai To Kya",
    bg: "img1.jfif",
    singer: "	Ali Azmat",
    song: "song1.mp3",
  },
  {
    name: "Main Agar - Tubelight",
    bg: "img2.jpg",
    singer: "Atif Aslam",
    song: "song2.mp3",
  },
  {
    name: "Dil Diyan Gallan",
    bg: "img3.jpg",
    singer: "Atif Aslam",
    song: "song3.mp3",
  },
  {
    name: "Tujhe Kitna Chahne Lage",
    bg: "img4.jpg",
    singer: "Arijit Singh",
    song: "song4.mp3",
  },
  {
    name: "Noor E Khuda",
    bg: "img6.jpg",
    singer: "Adnan Sami, Shankar Mahadevan",
    song: "song6.mp3",
  },
  {
    name: "Let Me Down Slowly",
    bg: "img7.jpg",
    singer: "	Alec Benjamin",
    song: "song7.mp3",
  },
  {
    name: "Unstoppable ",
    bg: "img8.jfif",
    singer: "Sia",
    song: "song8.mp3",
  },
  {
    name: "Lovely  ",
    bg: "img9.jpg",
    singer: "Billie Eilish, Khalid",
    song: "song9.mp3",
  },
  {
    name: "Pasoori",
    bg: "img10.jpg",
    singer: "Ali Sethi, Shae Gill",
    song: "song10.mp3",
  },
  {
    name: "Pardes Katenda",
    bg: "img11.jpg",
    singer: "Adnan Dhool",
    song: "song11.mp3",
  },
  {
    name: "Kaun Tujhe Yun Pyar Karega",
    bg: "img12.jpg",
    singer: "Palak Muchhal",
    song: "song12.mp3",
  },
  {
    name: "Faded ",
    bg: "img13.jpg",
    singer: "Alan Walker, Iselin Solheim",
    song: "song13.mp3",
  },
];

// set the song
const setSong = () => {
  audio.src = `Songs/${album[songNumber].song}`;
  songName.textContent = album[songNumber].name;
  singerName.textContent = album[songNumber].singer;
  profileImage.src = `Images/${album[songNumber].bg}`;

  durationTime.textContent = audio.duration;
  audio.addEventListener("loadedmetadata", () => {
    currentVolume.value = audio.volume;
    currentVolume.value = audio.volume;
    timeLine.max = audio.duration;
    timeLine.value = audio.currentTime;
    const minutes = Math.floor(audio.duration / 60);
    const secs = Math.floor(audio.duration % 60);
    durationTime.textContent = `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  });
};
setSong();

// set the event on play_pause button
play_pause.addEventListener("click", () => {
  clearInterval(intervalID02);
  if (play.src.includes("circle-play-solid.svg")) {
    // adding the currentTime
    intervalID02 = setInterval(() => {
      timeLine.value = audio.currentTime;
      if (audio.currentTime < 10) {
        crrTime.textContent = `0:0${Math.floor(audio.currentTime)}`;
      }
      if (audio.currentTime > 10) {
        crrTime.textContent = `0:${Math.floor(audio.currentTime)}`;
      }
      if (audio.currentTime > 60) {
        const minutes = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        crrTime.textContent = `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
      }
    }, 1000);
    profileImage.classList.add("animate");
    audio.play();
    play.src = "./Images/circle-pause-solid.svg";
  } else {
    clearInterval(intervalID02);
    profileImage.classList.remove("animate");
    play.src = "./Images/circle-play-solid.svg";
    audio !== undefined && audio.pause();
  }
});

// prev song
prev.addEventListener("click", () => {
  profileImage.classList.remove("animate");
  songNumber == 0 ? (songNumber = album.length - 1) : songNumber--;
  console.log(songNumber);
  setSong();
  play.src = "./Images/circle-play-solid.svg";
});
// next song
next.addEventListener("click", () => {
  profileImage.classList.remove("animate");
  songNumber == album.length - 1 ? (songNumber = 0) : songNumber++;
  setSong();
  play.src = "./Images/circle-play-solid.svg";
});

// working with timeLine
timeLine.addEventListener("change", () => {
  audio.currentTime = timeLine.value;
});

// working with volume
// Event listener for volume control
currentVolume.addEventListener('input', () => {
    audio.volume = currentVolume.value;
    if (audio.volume === 0) {
        volumeIcon.setAttribute('name', 'volume-mute');
    } else if (audio.volume <= 0.5) {
        volumeIcon.setAttribute('name', 'volume-low');
    } else {
        volumeIcon.setAttribute('name', 'volume-high');
    }
  });