function initPlaylist() {
	window.tempo = 90;

	pl.create({type: 'genre-radio', genre: 'rock', bucket: ['id:rdio-US', 'tracks'], limit: true}, 
		function(data) {
			//pl.steer([{param: 'target_tempo', value: window.tempo}], 
			pl.steer([{param: 'target_tempo', value: 90}], 
				function(data) {
					if (window.tempo < 240) {
						window.tempo += 15;
					}

					pl.nextSong(1, 0,
						function(data) {
							var song = data.response.songs[0];
							R.player.play({source: song.tracks[0].foreign_id.replace("rdio-US:track:", "")});
							playHistory.songs.push({artist_name : song.artist_name, title: song.title});
							$("#results").html(_.template($("#song-hist").html(), playHistory));
						},
						function(err) {
							console.log(err);
						});
				}, 
				function(err) {
					console.log(err);
				});
		}, 
		function(err) {
			console.log(err);
		}
		);
}

function restartPlaylist(options) {
	var opt_genre, opt_tempo;

	_.each(options, function(option) {
		if (option.param === 'genre')
			opt_genre = option.value;
		else if (option.param === 'tempo') {
			opt_tempo = option.value;
			window.tempo = opt_tempo;
		}
	});

	this.pl.restart({type: 'genre-radio', genre: opt_genre, bucket: ['id:rdio-US', 'tracks'], limit: true}, 
		function(data) {
			newSong([{param: 'target_tempo', value: opt_tempo}]);
		}, 
		function(err) {
			console.log(err);
		}
		);
}

function newSong(options) {
	this.pl.steer(options, 
		function(data) {
			this.pl.nextSong(1, 0,
				function(data) {
					var song = data.response.songs[0];
					R.player.play({source: song.tracks[0].foreign_id.replace("rdio-US:track:", "")});
					playHistory.songs.push({artist_name : song.artist_name, title: song.title});
					$("#results").html(_.template($("#song-hist").html(), playHistory));
				},
				function(err) {
					console.log(err);
				});
		}, 
		function(err) {
			console.log(err);
		});
}