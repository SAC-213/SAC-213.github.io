let playlist = [];
let current_index = 0;

async function playlist_init() {
    try {
        const response = await fetch('playlist.json');
        playlist = await response.json();

        player_update();
    }
    catch (error) {
        console.error("Couldn't initialize playlist", error);
    }
}

function player_update() {
    const song = playlist[current_index];

    const music_player_bg = document.getElementById('music_player_bg');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const main_page_bg = document.getElementById('main_page_bg');

    const thumbnail = `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`;
    const song_name = song.title;
    const artist_name = song.artist;

    music_player_bg.style.backgroundImage = `url('${thumbnail}')`;
    title.textContent= `${song_name}`;
    artist.textContent = `${artist_name}`;

    main_page_bg.style.backgroundImage = `url('${thumbnail}')`;
}

window.addEventListener('DOMContentLoaded', () => {
    playlist_init();
});