var audioContext = new (window.AudioContext || window.webkitAudioContext)();

function search() {
  var searchQuery = document.getElementById('search-input').value;
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + searchQuery + '&key=AIzaSyD2YC897SE46ZnDmKLv-IpbwLXy2hz9cmY';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayResults(data.items);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}

function displayResults(items) {
  var resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';

  items.forEach(function(item) {
    var result = document.createElement('div');
    result.classList.add('result');

    var thumbnail = document.createElement('img');
    thumbnail.src = item.snippet.thumbnails.default.url;

    var title = document.createElement('h3');
    title.textContent = item.snippet.title;

    var button = document.createElement('button');
    button.textContent = 'Play';
    button.onclick = function() {
      playAudio(item.id.videoId);
    };

    result.appendChild(thumbnail);
    result.appendChild(title);
    result.appendChild(button);

    resultsContainer.appendChild(result);
  });
}

function playAudio(videoId) {
  var playerContainer = document.getElementById('player-container');
  playerContainer.innerHTML = '';

  var audioElement = document.createElement('audio');
  audioElement.controls = true;
  
  var source = document.createElement('source');
  source.src = 'https://www.youtube.com/watch?v=' + videoId;
  source.type = 'audio/mp3';

  audioElement.appendChild(source);
  playerContainer.appendChild(audioElement);

  audioElement.addEventListener('canplay', function() {
    var sourceNode = audioContext.createMediaElementSource(audioElement);
    var gainNode = audioContext.createGain();
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    audioElement.play();
  });
}