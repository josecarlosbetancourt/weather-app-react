'use strict'
function setup() {
  const rootElement = document.getElementById('root')
  ReactDOM.render(
    <WeatherApp />,
    rootElement
  )
};

class WeatherApp extends React.Component {
  state = { city: '', weatherInfo: {}, errMessage: '' }; //initializing the empty state
  WEATHERAPI = "https://api.openweathermap.org/data/2.5/weather";
  APIKEY = "d60b020c16a4011a00c3a8823ced04bb";
  IMGURL = img => `http://openweathermap.org/img/wn/${img}@4x.png`;
  // firstLetterUppCase = message => `${message.toUpperCase()}`;

  /**
 * The getWeather function is called to fetch the info from the Api
 * the city is gotten from the state and added to the URL plus the key
 * If the code is not 200 the error message will show and the weatherInfo 
 * in the state will be empty as well
 * 
 * Otherwise weherInfo will be equal to the info object and the errMessage will be cleared
 * 
 * 
 */
  getWeather = (e) => {
    e.preventDefault()
    const { city } = this.state;

    fetch(`${this.WEATHERAPI}?q=${city}&appid=${this.APIKEY}&units=metric`)
      .then((data) => data.json())
      .then(info => {
        if (+info.cod !== 200) {
          this.setState({ errMessage: info.message, weatherInfo: '' })
        } else {
          this.setState({ weatherInfo: info, errMessage: '' })
        }
      })
  }

  //Sets the city to what is being typed in the input
  cityUpdate = e => this.setState({ city: e.target.value })

  /**
 * In the render function the weatherInfo and the errMessage are gotten from the state
 * And the div container is returned
 * 
 * Inside the form is the input for the city that calls cityUpdate
 * while the user types until the form is submitted and getWeather is called
 * 
 * Inside the weather-info div the WeatherInfo class is called with weatherInfo as props
 * It returns all the <p> that contain the weather info
 * 
 * Then the imagie is gotten from the IMGURL passing the value of the icon to add it to the url
 * 
 * There is a <p> that will show the error message if necessary   
 * 
 * 
 */
  render() {
    const { weatherInfo, errMessage } = this.state;

    return (
      <div className="container">
        <h1>City Weather App</h1>
        <form onSubmit={this.getWeather}>
          <label> Search City:
            <input id="city" type="text" name="name" onChange={this.cityUpdate} />
          </label>
          <input id="city-input" type="submit" value="Get Weather" />
        </form>

        {/* This checks if the object is not empty using a ternary operator */}
        {Object.keys(weatherInfo).length ?
          (
            // <></> to return just one parent element
            <div>
              <div className="weather-info">
                <p>{`Today's weather is ${(weatherInfo.weather[0].description).toUpperCase()} with a Temperature of ${weatherInfo.main.temp}`} &deg;C</p>
                <p>{`Feels Like: ${weatherInfo.main.feels_like}`} &deg;C</p>
                <p>{`Min Temperature: ${weatherInfo.main.temp_min}`} &deg;C</p>
                <p>{`Max Temperature: ${weatherInfo.main.temp_max}`} &deg;C</p>
              </div>
              <img src={this.IMGURL(weatherInfo.weather[0].icon)} alt="weather icon" />
            </div>
          )
          : ''
        }
        <p className="errorMsg">{(errMessage).toUpperCase()}</p>
        <footer>
          <p> &copy; Jose Carlos Betancourt, 2020.
                    Weather API from: <a href="https://api.openweathermap.org">Open Weather Map</a>
          </p>
        </footer>
      </div>
    )
  };
};

setup();