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
      playVideo(item.id.videoId);
    };

    result.appendChild(thumbnail);
    result.appendChild(title);
    result.appendChild(button);

    resultsContainer.appendChild(result);
  });
}

function playVideo(videoId) {
  var playerContainer = document.getElementById('player-container');
  playerContainer.innerHTML = '';

  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/' + videoId;
  iframe.width = 560;
  iframe.height = 315;

  playerContainer.appendChild(iframe);
}