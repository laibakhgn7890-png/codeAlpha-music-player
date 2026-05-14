const songs = [

{
    title:"Humrahi ost",
    artist:"Artist One",
    src:"songs/song1.mp3"
},

{
    title:"mein ost",
    artist:"Artist Two",
    src:"songs/song2.mp3"
},

{
    title:"Muhabbat ost",
    artist:"Artist Three",
    src:"songs/song3.mp3"
}

];

let currentSong = 0;

const audio = new Audio();
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");


// Load Song

function loadSong(index){

    audio.src = songs[index].src;

    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;

}

loadSong(currentSong);


// Play / Pause

function playPause(){

    if(audio.paused){
        audio.play();
    }

    else{
        audio.pause();
    }

}


// Next Song

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();

}


// Previous Song

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();

}


// Progress Bar Update

audio.addEventListener("timeupdate", ()=>{

    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    currentTime.innerText = formatTime(audio.currentTime);
    duration.innerText = formatTime(audio.duration);

});


// Change Song Position

progress.addEventListener("input", ()=>{

    audio.currentTime = (progress.value / 100) * audio.duration;

});


// Volume Control

volume.addEventListener("input", ()=>{

    audio.volume = volume.value;

});


// Format Time

function formatTime(time){

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;

}


// Playlist

songs.forEach((song,index)=>{

    let li = document.createElement("li");

    li.innerText = song.title + " - " + song.artist;

    li.addEventListener("click", ()=>{

        currentSong = index;

        loadSong(currentSong);

        audio.play();

    });

    playlist.appendChild(li);

});


// Autoplay Next Song

audio.addEventListener("ended", ()=>{

    nextSong();

});