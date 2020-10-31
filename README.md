a# wanderlust

Part of the Codeacademy frontend projects.

Objective:

Using fetch, async, and await, you’ll request information from the  [Foursquare API](https://developer.foursquare.com/)  and  [OpenWeather API](https://openweathermap.org/current)  to create a travel website.

Wanderlust can be found <a href="https://soniacweb.github.io/wanderlust">here</a>

# Technologies
- JavaScript ES6, ES7, ES8 (Async functions)
- JQuery
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

renderVenues that calls the .forEach() method on the $venueDivs array. This is an array of venue ids the in index.html where information will be rendered and returned in the response from the Foursquare API.

I started by creating a const venue to represent the individual venue object inside of the `.forEach()` callback - saving the current venue at venues[index] to this variable.

Create a venueIcon const to save the value of the object representing the venue icon. This is accessible as the icon property of the first element in the array of categories of the venue object.

```
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;

    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

```

constructed the full source URL for the venue icon. The venueIcon has a prefix and suffix field used to construct a source path. i constructed the HTML string to add the new venue using append() method. 

# connecting renderVenues() function to the data fetched by getVenues().

In the executeSearch() function towards the bottom of main.js, getVenues() and getForecast() are already being called.

Chain a .then() method to getVenues(). .then()‘s callback function should take a single parameter, venues, and return renderVenues(venues)

```
const executeSearch = () => {
  ...
  getVenues().then(venues => renderVenues(venues))
  ...
}

```

# Helper functions for rendering

createVenueHTML() has been provided to construct the HTML string to display the venue information. 

*further challanges*
Render more than 3 venues
Include additional information about each venue from the response.
For a real challenge, try fetching venue photos. This will require an additional request for venue details for each venue, as the photo information is not returned in the initial request.

