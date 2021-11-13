const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const stop = document.querySelector(".stop");
  const outline = document.querySelector(".moving-outline line");
  const img = document.querySelector(".image-container");
  const gong = new Audio("./sounds/alarm.mp3");

  //Sounds
  // const sounds = document.querySelectorAll(".sound-picker button");
  const sounds = document.querySelectorAll(".picker-border button");

  //Rewrite H1
  $(sounds).on("click", function () {
    let valueSong = this.getAttribute("value");
    nameSound = document.querySelector(".nameSound").innerHTML = valueSong;
  });
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  
  //Get the length of the outline

  const outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      img.src = this.getAttribute("data-img");
      play.src = "./img/svg/play-icon.svg";
      // checkPlaying(song)
    });
  });

  $(".bg-ocean").on("click", function () {
    $(".image-container").css(
      "background-image",
      "url(http://127.0.0.1:5500/img/bg/Ocean-BG.png)"
    );
  });

  $(".bg-mount").on("click", function () {
    $(".image-container").css(
      "background-image",
      "url(http://127.0.0.1:5500/img/bg/Mountain-BG.png)"
    );
    $("footer").css(
      "background-color",
      "#87edfb"
    );
  });

  $(".bg-fire").on("click", function () {
    $(".image-container").css(
      "background-image",
      "url(http://127.0.0.1:5500/img/bg/Fire-BG.png)"
    );
    $("footer").css(
      "background-color",
      "#ffe291"
    );
  });

  $(".bg-storm").on("click", function () {
    $(".image-container").css(
      "background-image",
      "url(http://127.0.0.1:5500/img/bg/Strom-BG.png)"
    );
    $("footer").css(
      "background-color",
      "#0154aa"
    );
  });

  $(".bg-rain").on("click", function () {
    $(".image-container").css(
      "background-image",
      "url(http://127.0.0.1:5500/img/bg/Rainy-BG.png)"
    );
    $("footer").css(
      "background-color",
      "#04b69e"
    );
  });

  $(".bg-silent").on("click", function () {
    $(".image-container").css(
      "background-image",
      "url(http://127.0.0.1:5500/img/bg/Silent-BG.png)"
    );
    $("footer").css(
      "background-color",
      "#1ea19a"
    );
  });

  //Select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
  

  //Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Stop-Reset sound
  stop.addEventListener("click", () => {
    resetPlaying(song);
    play.src = "./img/svg/play-icon.svg";
  });

  // Create a function reset/stop sounds
  const resetPlaying = (song) => {
    song.pause();
    song.currentTime = 0;
  };

  //Create a function specific to stop and play sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      // video.play();
      play.src = "./img/svg/pause-icon.svg";
    } else {
      song.pause();
      // video.pause();
      play.src = "./img/svg/play-icon.svg";
    }
  };

  //We can animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //Animated the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animated the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      gong.play();
      song.pause();
      song.currentTime = 0;
      play.src = "./img/svg/play-icon.svg";

      // video.pause();
    }
  };


  //   $('.bg-skus').on('click', function() {
  //     $('.image-container').css('background-image', 'url(http://127.0.0.1:5500/img/bg/Mountain-BG.png)');
  // })
  // $("#datetime").datetimepicker()

};

app();
