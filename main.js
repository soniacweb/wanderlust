import { clientId, clientSecret, url, imgUrl, openWeatherKey, weatherUrl } from './apiKeys.js'

// Page Elements
const $input = $('#city')
const $submit = $('#button')
const $destination = $('#destination')
const $container = $('.container')
const $venueDivs = [$('#venue1'), $('#venue2'), $('#venue3'), $('#venue4'), $('#venue5'), $('#venue6'), $('#venue7'), $('#venue8'), $('#venue9'), $('#venue10'), $('#venue11'), $('#venue12'), $('#venue13'), $('#venue14'), $('#venue15')]
const $weatherDiv = $('#weather1')
// const $imageDiv = $('#image')
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Add AJAX functions here:
const getVenues = async () => {
  const limit = 'limit=15'
  const city = $input.val()
  const urlToFetch = `${url}${city}&${limit}&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`
  try {
    const response = await fetch(urlToFetch) 
    if (response.ok) {
      const jsonResponse = await response.json()
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue)
      console.log(venues)
      return venues
    }
  } catch (error) {
    console.log(error)
  }
}

//Shuffle Venues
const shuffle = (venueslist)=> {
  //method called shuffle for the venue array. The method returns a randomly sorted array of all the venue objects.
  let value = venueslist.length
  //while venue is not empty
  while (value > 0){
  //pick random venue
    const order = Math.floor(Math.random() * value)
    //reduce venue list
    value--

    //swap last element
    const temp = venueslist[value]
    venueslist[value] = venueslist[order]
    venueslist[order] = temp
    // console.log(venueslist)
  }
  return venueslist
}

//get photos from forsquareapi
const getPhotos = async(venueId) => {
  const url2ToFetch = `${imgUrl}${venueId}/photos?&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`
  try {
    const response = await fetch(url2ToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      // const photos = jsonResponse.response.venue.photos.groups[1].items[0].prefix + 'width960' + jsonResponse.response.venue.photos.groups[1].items[0].suffix
      const photos = `https://fastly.4sqi.net/img/general/200x200${jsonResponse.response.photos.items[0].suffix}`
      console.log(photos)
      return photos
    }
  } catch (err){
    console.log(err)
  }
}
    
const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`
  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      // console.log(jsonResponse)
      return jsonResponse
    }
  } catch (error) {
    console.log(error)
  }
}
//div elements
const createVenueHTML = (name, location, iconSource, photos) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <img src=${photos}/>
  <p>${location.address}</p>
  <p>${location.postalCode}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`
}

// const createVenuePhotoHTML = (imgSource) => {
//   return `<h3>Photo:</h3>
//   <img class="venuephoto" src="${imgSource.venuePhotoSrc}"/>
//   <p>${imgSource}</p>
// `
// }

const createWeatherHTML = (currentDay) => {
  // console.log(currentDay)
  return `<h2>${weekDays[(new Date()).getDay()]}</h2>
		<h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
		<h2>Condition: ${currentDay.weather[0].description}</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0)


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(async ($venue, index) => {

    // Add your code here:
    const venue = venues[index]
    const photos = await getPhotos(venue.id)
    console.log(photos)
    const venueIcon = venue.categories[0].icon
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
    const venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, photos)
    $venue.append(venueContent)
    
  })
  $destination.append(`<h2>${venues[0].location.city}</h2>`)
}

const renderForecast = (day) => {
  // Add your code here:
  const weatherContent = createWeatherHTML(day)
  $weatherDiv.append(weatherContent)
}



const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty())
  $weatherDiv.empty()
  $destination.empty()
  $container.css('visibility', 'visible')
  getVenues().then(venues =>renderVenues(shuffle(venues)))
  // getPhotos().then(photos => // renderVenues(photos));
  getForecast().then(forecast => renderForecast(forecast))
  return false
}

$submit.click(executeSearch)



