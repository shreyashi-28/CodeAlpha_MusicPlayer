const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const currentTimeEl = document.getElementById('currentTime');
const totalDurationEl = document.getElementById('totalDuration');

let isPlaying = false;
let songIndex = 0;

const songs = [
    {
        name: "song1",
        displayName: "Sample Song 1",
        artist: "Artist 1"
    },
    {
        name: "song2",
        displayName: "Sample Song 2",
        artist: "Artist 2"
    }
];

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audio.src = `songs/${song.name}.mp3`;
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

audio.onplay = () => isPlaying = true;
audio.onpause = () => isPlaying = false;

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

// Update progress bar
audio.ontimeupdate = () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalDurationEl.textContent = formatTime(audio.duration);
};

progress.oninput = () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
};

volume.oninput = () => {
    audio.volume = volume.value;
};

function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Initialize
loadSong(songs[songIndex]);
