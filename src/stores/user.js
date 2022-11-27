import { defineStore } from 'pinia'
import { client_id } from '@/env.js';

export const useUserStore = defineStore({
  id: 'token',
  state: () => ({
    token: "",
    loggedIn: false,
    playlists: Object,
    playlist: Object,
    favouriteList: Object,
    searchResults: Object,
    album: Object,
    userProfile: Object,
    userName: String,
    recentlyPlayed: Object,
    checkedFavouriteTracks: Array,
  }),
  getters: {
    
  },
  actions: {
    getDuration(element) {
      const seconds = Math.floor((element / 1000) % 60);
      const minutes = Math.floor((element / (60 * 1000)) % 60);
      const hours = Math.floor((element / (3600 * 1000)) % 3600);
    
      return `${hours == 0 ? '' : hours < 10 ? hours : hours + ':'}${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    },
    
    getTracksIds(element) {
      return element.items.map(x => x.track.id);
    },

    getAlbumTracksIds(element) {
      return element.items.map(x => x.id);
    },

    logIn() {
      let scopes = [
        'user-read-recently-played', 
        'playlist-read-collaborative',
        'user-read-email',
        'user-top-read',
        'playlist-modify-public',
        'user-library-modify',
        'user-read-currently-playing',
        'user-library-read',
        'playlist-read-private',
        'user-read-private',
        'playlist-modify-private',
      ];
    
      let redirect_uri = 'http://127.0.0.1:5173/';
      let state = Math.random().toString(20).slice(2);
      sessionStorage.setItem('stateKey', state);
    
      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scopes);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);
    
      location.href = url;
    },

    async getUserPlaylists() {
      let query = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        }
      });

      let data = await query.json();
      this.playlists = data;
    },

    async getPlaylistsItems(playlistId, offset) {
      if(offset < 1) {
        let query = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          }
        });
  
        let data = await query.json();
        data.items.forEach(element => element.track.duration_ms = this.getDuration(element.track.duration_ms));
        this.playlist = data;

        let tracksIds = this.getTracksIds(data);
        this.checkedFavouriteTracks = await this.checkisFavourite(tracksIds);

      } else {
        let query = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          }
        });
  
        let data = await query.json();
        data.items.forEach(element => element.track.duration_ms = this.getDuration(element.track.duration_ms));
        this.playlist.items = [...this.playlist.items, ...data.items];

        let tracksIds = this.getTracksIds(data);
        let checkIsTrackFav = await this.checkisFavourite(tracksIds);
        this.checkedFavouriteTracks = [...this.checkedFavouriteTracks, ...checkIsTrackFav];
      }
    },

    async getUserFavourite(offset) {
      if(offset < 1) {
        let query = await fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          }
        });
  
        let data = await query.json();
        data.items.forEach(element => { 
          element.track.duration_ms = this.getDuration(element.track.duration_ms);
          element.isFavourite = true;
        });
        this.favouriteList = data;
      } else {
        let query = await fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          }
        });
  
        let data = await query.json();
        data.items.forEach(element => { 
          element.track.duration_ms = this.getDuration(element.track.duration_ms);
          element.isFavourite = true;
        });
        this.favouriteList.items = [...this.favouriteList.items, ...data.items];
      }
    },

    async checkisFavourite(id) {
      let query = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        }
      })
      let data = await query.json();
      
      return data;
    },
    
    async addFavouriteTrack(id) {
      await fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        }
      })
    },

    async deleteFavouriteTrack(id) {
      await fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        }
      })
    },

    async toggleFavourite(id, itemIndex) {
      let isFav = await this.checkisFavourite(id);

      if(isFav[0]) {
        this.deleteFavouriteTrack(id);
        this.checkedFavouriteTracks[itemIndex] = !this.checkedFavouriteTracks[itemIndex];
      } else {
        this.addFavouriteTrack(id);
        this.checkedFavouriteTracks[itemIndex] = !this.checkedFavouriteTracks[itemIndex];
      }
    },

    async searchForItems(serarchQuery) {
      let query = await fetch(`https://api.spotify.com/v1/search?q=${serarchQuery}&type=track,album,playlist&limit=8`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        }
      })
      let data = await query.json();
      data.tracks.items.forEach(element => element.duration_ms = this.getDuration(element.duration_ms));
      this.searchResults = data;
    },

    async getAlbumItems(albumId, offset) {
      if(offset < 1) {
        let query = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?offset=${offset}&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          }
        });
  
        let data = await query.json();
        data.items.forEach(element => element.duration_ms = this.getDuration(element.duration_ms));
        this.album = data;

        let tracksIds = this.getAlbumTracksIds(data);
        this.checkedFavouriteTracks = await this.checkisFavourite(tracksIds);

      } else {
        let query = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?offset=${offset}&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          }
        });
  
        let data = await query.json();
        data.items.forEach(element => element.duration_ms = this.getDuration(element.duration_ms));
        this.album.items = [...this.album.items, ...data.items];

        let tracksIds = this.getAlbumTracksIds(data);
        let checkIsTrackFav = await this.checkisFavourite(tracksIds);
        this.checkedFavouriteTracks = [...this.checkedFavouriteTracks, ...checkIsTrackFav];
      }
    },

    async getUserProfileData() {
      let query = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        }
      });

      let data = await query.json();
      this.userProfile = data;
      this.userName = data.display_name;
    },

    async getRecentlyPlayed() {
      let query = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        }
      });

      let data = await query.json();
      data.items.forEach(element => element.track.duration_ms = this.getDuration(element.track.duration_ms));
      this.recentlyPlayed = data;

      let tracksIds = this.getTracksIds(data);
      this.checkedFavouriteTracks = await this.checkisFavourite(tracksIds);
    },
  }
})