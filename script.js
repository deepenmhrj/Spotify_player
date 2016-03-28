$(function() {
	var $spotifySearch = $('#spotify-search');

	var $track = $('#track');

	var $results = $('#results');

	var $trackTemplate = _.template($('#track-template').html());

	$spotifySearch.on('submit', function(event){
		event.preventDefault();		//prevents the url to open

		$results.empty();

		var searchQuery = $track.val();

		var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchQuery;

		$.get(searchUrl,function(data){
			var trackResults = data.tracks.items;

			if (trackResults.length > 0){
				_.each(trackResults, function(result, index){
					var trackData={
						albumArt: result.album.images.length>0 ? result.album.images[0].url : null,
						albumName: result.album.name,
						artist: result.artists[0].name,
            track: result.name,
            url: result.preview_url,
            full_url: result.artists[0].external_urls.spotify
					};
					$results.append($trackTemplate(trackData));
				});
			}else{
        $results.append("No results found!! </br> Try another searchword.");
      }
		});
	});
});