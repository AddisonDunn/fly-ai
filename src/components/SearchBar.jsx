import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./StartingPage.css";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from "react";

let port_number = null;
if (process.env.NODE_ENV === "development") {
  port_number = process.env.PORT_NUMBER; // development
}
else if (process.env.NODE_ENV === "deployment") {
  port_number = process.env.PORT || 80; //production
}
const location_query_url = "http://localhost:" + port_number + "/getLocation/";


function SearchBar(props) {

  const [error, setError] = useState(null);
  const [didLocationsLoad, setDidLocationsLoad] = useState(false);
  const [locationResults, setLocationResults] = useState([]);
  const [searchText, updateSearchText] = useState("");


  useEffect(() => {
    if(!searchText) {
      return;
    }
    fetch(location_query_url + searchText)
          .then(res => res.json())
          .then(
              (result) => {
                  setDidLocationsLoad(true);
                  setLocationResults(result.map(place => {
                    const locationQueryString = place.PlaceName + ", " + (place.RegionId? place.RegionId: place.CountryName ) + " (" + ( place.PlaceId.substring(0, place.PlaceId.length - 4))  + ")";
                    return {locationName: locationQueryString, placeID: place.PlaceId};
                  }));
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                  setDidLocationsLoad(true);
                  setError(error);
              }
          )
  }, [searchText])

  function handleInputText(event, value) {
    updateSearchText(value);
  }

  function onCitySelection(event, value) {
    if(value) {
      props.setCityID(value.placeID);
    }
    else {
      props.setCityID(null);
    }
  }

  

  return <div><Grid container className="searchBar"  justify="center" alignItems="center" direction="row">
    <Grid item>
      {(props.name === "originSearchBar") ? <FlightTakeoffIcon fontSize="large" /> : <FlightLandIcon fontSize="large" />}
    </Grid>
    <Grid item>
      <Autocomplete
        name={props.name}
        id={props.name}
        onInputChange={handleInputText}
        onChange={onCitySelection}
        options={locationResults}
        getOptionLabel={(option) => option.locationName}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label}/>}

      /></Grid>
      </Grid>
      </div>;
}

export default SearchBar;