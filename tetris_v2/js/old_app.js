function initPlaylist() {
	pl.create({type: 'genre-radio', genre: 'rock', bucket: ['id:rdio-US', 'tracks'], limit: true}, 
		function(data) {
			pl.steer('target_tempo', window.tempo, 
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

function restartPlaylist() {
	window.tempo = 90;

	this.pl.restart({type: 'genre-radio', genre: 'rock', bucket: ['id:rdio-US', 'tracks'], limit: true}, 
		function(data) {
			newSong();
		}, 
		function(err) {
			console.log(err);
		}
		);
}

function newSong() {
	this.pl.steer('target_tempo', window.tempo, 
		function(data) {
			if (window.tempo < 240) {
				window.tempo += 15;
			}

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