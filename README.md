# wanderlust

Part of the Codeacademy frontend projects.

Objective:

Using fetch, async, and await, you’ll request information from the  [Foursquare API](https://developer.foursquare.com/)  and  [OpenWeather API](https://openweathermap.org/current)  to create a travel website.

# Technologies
- JavaScript ES6, ES7, ES8 (Async functions)
- CSS
- OpenWeather API
- Foursquare API

NB (keys stored in gitignore) however stored client ID obtained from the Foursquare API to const clientId. Same for client secret from the Foursquare API to const clientSecret.

- getVenues() into an asynchronous function that returns a Promise.
- created a variable `city` to store the user’s input field on the page with `$input.val()`.
- const called `urlToFetch`. This string will contain the combined text of the entire request URL:
- the API endpoint URL
- the user’s input city
- a limit parameter with the number of venues you wish to return (use 10)
- the client_id parameter and your client ID
- the client_secret parameter and your client secret
- the v (version) parameter and today’s date in this format: YYYYMMDD

NB: Each key-value parameter pair should be joined to the others with &. 

Try/catch statements with empty code blocks were added. 
In the try code block, I used fetch() to send a GET request `urlToFetch`. awaited the response and saved it to a variable called `response`.
The below excert demonstrates how I converted the response object to a JSON object. awaited the resolution of this method and saved it to a variable called jsonResponse. 
Having accessed the grouped venues (an array), I mapped through each object using the `.map()` iterator and saved these venues to the venues array:

```
const getVenues = async () => {
const city = $input.val()
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
try {
const response = await fetch(urlToFetch); 
if (response.ok) {
 const jsonResponse = await response.json();
 const venues = jsonResponse.response.groups[0].items.map(item => item.venue)
 console.log(venues)
 return venues;
 }
} catch(error) {
  console.log(error);
}
};

```

# Get Data from OpenWeather

RE: getForecast() function which is called from executeSearch()

getForecast() would also be an asynchronous function that returns a Promise. Similar request as above.

```
const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`
try {
const response = await fetch(urlToFetch);
if (response.ok) {
  const jsonResponse = await response.json()
  console.log(jsonResponse)
  return jsonResponse;
}
} catch(error) {
  console.log(error);
}
}

```

# Render Data From Foursquare API

