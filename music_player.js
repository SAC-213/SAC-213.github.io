let playlist = [];
let current_index;
let player;

function onYouTubeIframeAPIReady() {
    playlist_init();
}

async function playlist_init() {
    try {
        const response = await fetch('playlist.json');
        playlist = await response.json();
        current_index = Math.floor(Math.random() * (playlist.length));
        init_player(playlist[current_index].id);
    }
    catch (error) {
        console.error("Couldn't initialize playlist", error);
    }
}

function init_player(videoId) {
    if (!player) {
        player = new YT.Player('song_player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'rel': 0
            },
            events: {
                'onReady': () => player_update()
            }
        });
    } else {
        player.loadVideoById(videoId);
        player_update();

        const button = document.getElementById('pause_play_button');
        player.pauseVideo();
        button.textContent = "▶";
    }
}

function player_update() {
    const song = playlist[current_index];

    const music_player_bg = document.getElementById('music_player_bg');
    const title = document.getElementById('title');
    const song_player = document.getElementById('song_player');
    const artist = document.getElementById('artist');

    const main_page_bg = document.getElementById('main_page_bg');

    const thumbnail = `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`;
    const song_name = song.title;
    const artist_name = song.artist;

    music_player_bg.style.backgroundImage = `url('${thumbnail}')`;
    title.textContent = `${song_name}`;
    artist.textContent = `${artist_name}`;

    main_page_bg.style.backgroundImage = `url('${thumbnail}')`;
}

const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) {
        return;
    }
    else {
        if (button.parentElement.classList.contains('previous_button')) {
            current_index = (current_index - 1 + playlist.length) % playlist.length;
            init_player(playlist[current_index].id);
        }
        else if (button.parentElement.classList.contains('pause_play_button')) {
            const song_player_state = player.getPlayerState();

            if (song_player_state == YT.PlayerState.PLAYING) {
                player.pauseVideo();
                button.textContent = "▶";
            }
            else {
                player.playVideo();
                button.textContent = "⏸";
            }
            return;
        }
        else if (button.parentElement.classList.contains('skip_button')) {
            current_index = (current_index + 1) % playlist.length;
            init_player(playlist[current_index].id);
        }

    }
});