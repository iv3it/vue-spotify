import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'

let userStore = useUserStore();
let token = userStore.token;

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    playerData: {
      visible: false,
    },
    is_paused: true,
    player: null,
    device_id: null,
    currentTrackInfo: null,
  }),
  getters: {
    
  },
  actions: {
    setAudioPlayer() {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Spotify Player',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });

        this.device_id = null;
        this.player = player;
        
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          this.device_id = device_id;
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.connect();

        player.addListener('player_state_changed', ( isActive => {
          player.getCurrentState().then( currentState => { 
            if(!currentState) {
              this.is_paused = currentState.paused;
            } else {
              this.currentTrackInfo = currentState.track_window.current_track;
              this.is_paused = currentState.paused;
            }
          });
        }))
      };
    },

    async playSong(contentType, playlistId, offsetValue) {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "context_uri": "spotify:" + contentType + ":" + playlistId,
          "offset": {
            "position": offsetValue
          },
          "position_ms": 0
        }),
      });

      this.playerData.visible = true;
    },

    async playOneSong(trackId) {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ "uris": ["spotify:track:" + trackId ]}),
      });

      this.playerData.visible = true;
    },
  }
})