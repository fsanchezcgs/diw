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
  }).done(function (response) {
    let structure = "<h1>Artists</h1>";
    console.log(response);
    response.artists.items.forEach((artist) => {
      let image;
      if (artist.images.length != 0) {
        image = artist.images[1].url;
      } else {
        image = "default_pfp.png";
      }
      structure += `<div class="card"><h1>${artist.name}</h1><h2>Popularity: ${artist.popularity}</h2><img src="${image}" alt=""></div>`;
    });
    structure += "<h1>Tracks</h1>";
    response.tracks.items.forEach((track) => {
      let image;
      if (track.album.images.length != 0) {
        image = track.album.images[1].url;
      } else {
        image = "default_pfp.png";
      }
      structure += `<div class="card"><h1>${track.name}</h1><h2>Popularity: ${track.popularity}</h2><img src="${image}" alt=""></div>`;
    });
    $("#results").html(structure);
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
    console.log(response);
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

  $("#bgetArtist").on("click", function () {
    spotify.getArtist($("#artistName").val());
  });

  $("#results").on("click", ".artistId", function () {
    spotify.getArtistById($(this).attr("data-id"));
  });
});
