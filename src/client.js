const API_KEY = '6909bb9ae04e45d38a442bd691f55fc4';

// GET requests to News API
function getSources(success) {
  return fetch(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}

function getLatest(success) {
  return fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}

function getByQuery(query, success) {
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}

function getSource(source, success) {
  console.log(source);

  return fetch(
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}

function getByExactSources(query, sources, success) {
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}&sources=${sources}&apiKey=${API_KEY}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}

function checkStatus(response) {
  // Error handling
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  // Parsing JSON
  return response.json();
}

export { getSources, getLatest, getSource, getByQuery, getByExactSources };
