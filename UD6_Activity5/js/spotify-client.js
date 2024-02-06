let client_id = "dd511365149b41a39118b7044d143429";
let client_secret = "6f67fb683be64f0f8ca4693300ff82e8";
let access_token = "11dFghVXANMlKmJXsNCbNl";

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = "https://api.spotify.com/";
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + "v1/search?type=artist,track&q=" + artist,
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .done(function (response) {
      let structure = "";
      console.log(response);
      response.artists.items.forEach((artist) => {
        let image;
        if (artist.images.length != 0) {
          image = artist.images[1].url;
        } else {
          image = "default_pfp.png";
        }
        structure += `<div class="card"><h1>${artist.name}</h1><h2>Popularity: ${artist.popularity}</h2><img src="${image}" id="${artist.id}" class="clickMe"><span>Type: Artist</span></div>`;
      });
      response.tracks.items.forEach((track) => {
        let image;
        if (track.album.images.length != 0) {
          image = track.album.images[1].url;
        } else {
          image = "default_pfp.png";
        }
        structure += `<div class="card"><h1>${track.name}</h1><h2>Popularity: ${track.popularity}</h2><img src="${image}" class="clickMe"><span>Type: Track</span></div>`;
      });
      $("#results").html(structure);
      $(".clickMe").on("click", function (e) {
        let spotify = new Spotify();
        spotify.getArtistById(e.target.id);
      });
    })
    .fail(function () {
      $("#results").html("");
    });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + "v1/artists/" + artistId + "/albums",
    headers: {
      Authorization: "Bearer " + access_token,
    },
  }).done(function (response) {
    let structure = "";
    console.log(response);
    response.items.forEach((album) => {
      let image;
      if (album.images.length != 0) {
        image = album.images[1].url;
      } else {
        image = "default_pfp.png";
      }
      structure += `<div class="card"><h1>${album.name}</h1><h2>Total Tracks: ${album.total_tracks}</h2><img src="${image}" id="${album.id}" class="clickMe"><span>Release Date: ${album.release_date}</span></div>`;
    });
    $("#results").html(structure);
    $("#artistName").val("");
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Basic " + btoa(client_id + ":" + client_secret)
      );
    },
    dataType: "json",
    data: { grant_type: "client_credentials" },
  }).done(function (response) {
    access_token = response.access_token;
  });

  let spotify = new Spotify();

  $("#artistName").on("keyup", function () {
    spotify.getArtist($("#artistName").val());
  });
});
