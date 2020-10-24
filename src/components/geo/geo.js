import React, { Component } from 'react';
import './geo.scss';
/* global google */

class Geo extends Component {
  constructor(props) {
    super(props);

    this.state = { city: '', position: null }; 
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    //this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    const cityName = place.name;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const position = {ctName: cityName, coords: {latitude: lat, longitude: lng}};
    console.log('latitude: '+position.coords.latitude+' longitude: '+position.coords.longitude);
    this.onSetCurrentPositionSuccess(position);
  }

  onCurrentPositionSubmit = () => {
    if (!navigator && !navigator.geolocation) {
      alert('Geolocation is not supported by your device');
    } else {
      navigator.geolocation.getCurrentPosition(this.onSetCurrentPositionSuccess, this.onSetCurrentPositionError);
    }
  };

  onSetCurrentPositionSuccess = (position) => {
    this.state = {
      city: '',
      position: {
        name: position.ctName, 
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }
    };

    this.handleGeoLocationFound();
  };

  onSetCurrentPositionError = () => {
    alert("Geolocation is OFF on your device.");
  };

  onCitySubmit = (event) => {

    if (this.state.city) {
      this.handlePlaceChanged();
      this.handleGeoLocationFound();
    }
  };

  onCityChange = (event) => {
    this.setState({
      city: event.target.value,
      position: null,
    });
  };


  onEnterPress(event) {
    if (this.state.city) {
      this.handlePlaceChanged();
      this.handleGeoLocationFound();
    }
   }

  handleGeoLocationFound() {
    const { city, position } = this.state;
    // set priority to search by City
    if (city) {
      this.props.onGeoChanged(city);
    } else {
      this.props.onGeoChanged(`${position.name},${position.lat},${position.lon}`);
    }
  }

  render() {
    
    return (
      <form id="location" onSubmit={this.onCitySubmit}>
        <div className="search-container">
          <input ref={this.autocompleteInput} id="autocomplete" onChange={this.onCityChange} value={this.state.city} name="city" className="city" type="text" placeholder="City"/>
          <button id="submit" type="submit" className="btn-icon">
            <i className="icon material-icons">search</i>
          </button>
        </div>
        <div className="geo-container">
          <p>or</p>
          <span>use my </span> <a className="current-position" onClick={this.onCurrentPositionSubmit}> current position</a>
        </div>
      </form>
    );
  }
}

export default Geo;
