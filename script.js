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
			console.log(trackResults);

			if (trackResults.length > 0){
				_.each(trackResults, function(result, index){
					
					//testing results
					$results.append($trackTemplate({name:result.name}));

				});

			};
		});
	});
});