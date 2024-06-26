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
const volumeIcon = document.getElementById("volumeIcon");
const showPlayList = document.querySelector(".showPlayList");
const playlist = document.querySelector(".playlist");

let songNumber = 0;
let intervalID02;
let album = [
  {
    id: 1,
    name: "Banjaara",
    bg: "img14.jpg",
    singer: "Ankit Tiwari, Mithoon",
    song: "song14.mp3",
  },
  {
    id: 2,
    name: "Tum Hi Aana",
    bg: "img5.jpg",
    singer: "Jubin Nautiyal",
    song: "song5.mp3",
  },
  {
    id: 3,
    name: "Ye Jism Hai To Kya",
    bg: "img1.jfif",
    singer: "Ali Azmat",
    song: "song1.mp3",
  },
  {
    id: 4,
    name: "Main Agar - Tubelight",
    bg: "img2.jpg",
    singer: "Atif Aslam",
    song: "song2.mp3",
  },
  {
    id: 5,
    name: "Dil Diyan Gallan",
    bg: "img3.jpg",
    singer: "Atif Aslam",
    song: "song3.mp3",
  },
  {
    id: 6,
    name: "Tujhe Kitna Chahne Lage",
    bg: "img4.jpg",
    singer: "Arijit Singh",
    song: "song4.mp3",
  },
  {
    id: 7,
    name: "Noor E Khuda",
    bg: "img6.jpg",
    singer: "Adnan Sami, Shankar Mahadevan",
    song: "song6.mp3",
  },
  {
    id: 8,
    name: "Let Me Down Slowly",
    bg: "img7.jpg",
    singer: "Alec Benjamin",
    song: "song7.mp3",
  },
  {
    id: 9,
    name: "Unstoppable",
    bg: "img8.jfif",
    singer: "Sia",
    song: "song8.mp3",
  },
  {
    id: 10,
    name: "Lovely",
    bg: "img9.jpg",
    singer: "Billie Eilish, Khalid",
    song: "song9.mp3",
  },
  {
    id: 11,
    name: "Pasoori",
    bg: "img10.jpg",
    singer: "Ali Sethi, Shae Gill",
    song: "song10.mp3",
  },
  {
    id: 12,
    name: "Pardes Katenda",
    bg: "img11.jpg",
    singer: "Adnan Dhool",
    song: "song11.mp3",
  },
  {
    id: 13,
    name: "Kaun Tujhe Yun Pyar Karega",
    bg: "img12.jpg",
    singer: "Palak Muchhal",
    song: "song12.mp3",
  },
  {
    id: 14,
    name: "Faded",
    bg: "img13.jpg",
    singer: "Alan Walker, Iselin Solheim",
    song: "song13.mp3",
  },
];

const setSong = (songNumber) => {
  audio.src = `Songs/${album[songNumber].song}`;
  songName.textContent = album[songNumber].name;
  singerName.textContent = album[songNumber].singer;
  profileImage.src = `Images/${album[songNumber].bg}`;

  audio.addEventListener("loadedmetadata", () => {
    currentVolume.value = audio.volume;
    timeLine.max = audio.duration;
    timeLine.value = audio.currentTime;
    const minutes = Math.floor(audio.duration / 60);
    const secs = Math.floor(audio.duration % 60);
    durationTime.textContent = `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  });
};
setSong(songNumber);

const startInterval = () => {
  intervalID02 = setInterval(() => {
    timeLine.value = audio.currentTime;
    if (audio.currentTime < 10) {
      crrTime.textContent = `0:0${Math.floor(audio.currentTime)}`;
    }
    if (audio.currentTime >= 10 && audio.currentTime < 60) {
      crrTime.textContent = `0:${Math.floor(audio.currentTime)}`;
    }
    if (audio.currentTime >= 60) {
      const minutes = Math.floor(audio.currentTime / 60);
      const secs = Math.floor(audio.currentTime % 60);
      crrTime.textContent = `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    }
  }, 1000);
};

play_pause.addEventListener("click", () => {
  if (play.src.includes("circle-play-solid.svg")) {
    startInterval();
    profileImage.classList.add("animate");
    audio.play();
    play.src = "./Images/circle-pause-solid.svg";
  } else {
    clearInterval(intervalID02);
    profileImage.classList.remove("animate");
    play.src = "./Images/circle-play-solid.svg";
    audio.pause();
  }
});

prev.addEventListener("click", () => {
  profileImage.classList.remove("animate");
  songNumber == 0 ? (songNumber = album.length - 1) : songNumber--;
  setSong(songNumber);
  play.src = "./Images/circle-play-solid.svg";
});

next.addEventListener("click", () => {
  profileImage.classList.remove("animate");
  songNumber == album.length - 1 ? (songNumber = 0) : songNumber++;
  setSong(songNumber);
  play.src = "./Images/circle-play-solid.svg";
});

timeLine.addEventListener("change", () => {
  audio.currentTime = timeLine.value;
});

currentVolume.addEventListener("input", () => {
  audio.volume = currentVolume.value;
  if (audio.volume === 0) {
    volumeIcon.setAttribute("name", "volume-mute");
  } else if (audio.volume <= 0.5) {
    volumeIcon.setAttribute("name", "volume-low");
  } else {
    volumeIcon.setAttribute("name", "volume-high");
  }
});

showPlayList.addEventListener("click", () => {
  playlist.classList.toggle("active");
});

const displayPlaylist = (songs) => {
  songs.forEach((elem) => {
    const card = document.createElement("div");
    card.className = "card";
    // card.firstChild.className.add("selected")
    card.innerHTML = `
      <img src="Images/${elem.bg}" alt="img">
      <div class="detail">
        <span>${elem.name}</span>
        <span>${elem.singer}</span>
      </div>
      <div class="playSong">
        <ion-icon name="play-circle" class="playIcon"></ion-icon>
      </div>`;
       playlist.appendChild(card);
   playlist && playlist.firstElementChild.classList.add("selected")

    card.addEventListener("click", () => {
      setCurrentSong(elem, card);
    });
  });
};

const setCurrentSong = (currentSong, clickedCard) => {
  console.log(currentSong)
  const indexOfCurrSong = album.indexOf(currentSong);
  setSong(indexOfCurrSong);
  play.src = "./Images/circle-pause-solid.svg";
  profileImage.classList.add("animate");
  audio.play();
  startInterval();

  const prevSelectedCard = document.querySelector(".card.selected");
  if (prevSelectedCard) {
    prevSelectedCard.classList.remove("selected");
    const prevPlayIcon = prevSelectedCard.querySelector(".playIcon");
    if (prevPlayIcon) {
      prevPlayIcon.setAttribute("name", "play-circle");
    }
  }

  clickedCard.classList.add("selected");
  const playIcon = clickedCard.querySelector(".playIcon");
  if (playIcon) {
    playIcon.setAttribute("name", "pause");
  }
};

// Initially display the full playlist
displayPlaylist(album);
