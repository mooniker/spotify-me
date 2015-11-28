// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/


function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q=' + keyword;
  console.log(url);
  $.getJSON(url, function(response) {
    var artists = response.artists;
    var $results = $('#results');
    if ( artists.length > 0 ) {
      $results.empty();
      $results.append('<ul>');
      for (var i in artists) {
        $results.append('<li><a href="' + artists[i].href + '">' + artists[i].name + '</a></li>');
      }
      $results.append('</ul>');
    }
  });
}


function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q=' + keyword;
  console.log(url);
  $.getJSON(url, function(response) {
    var tracks = response.tracks;
    var $results = $('#results');
    if ( tracks.length > 0 ) {
      $results.empty();
      $results.append('<ul>');
      for (var i in tracks) {
        var artists = [];
        for ( var j in tracks[i].artists ) {
          artists.push(tracks[i].artists[j].name);
        }
        $results.append('<li><a href="' + tracks[i].href + '">"' + tracks[i].name + '"</a>(' + artists.join(', ') + ')</li>');
      }
      $results.append('</ul>');
    }
  });
}


$('#search').on('submit', function(e) {
  e.preventDefault();
  console.log('Clicked submit.');
  var keyword = encodeURI( $('#search-keyword').val() );
  if( $('#search-type').val() === 'track' ) {
    searchByTrack(keyword);
  } else {
    searchByArtist(keyword);
  }
});
