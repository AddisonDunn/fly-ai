
import SearchBar from "./SearchBar";
import Grid from '@material-ui/core/Grid';
import "./StartingPage.css";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import TextField from '@material-ui/core/TextField';



function SearchBarContainer(props) {

  let history = useHistory();
  const [originID, setOriginID] = useState("");
  const [destinationID, setDestinationID] = useState("");
  const [departureDate, setDepartureDate] = useState(getDate("today"));
  const [arrivalDate, setArrivalDate] = useState(getDate("week-from-today"));


  function submitSearch() {
    history.push("/search", [originID, destinationID, departureDate, arrivalDate]);
  }

  function getDate(day) {
    if(day === "today") {
      return (new Date().toISOString()).substring(0, 10);
    }
    else if (day === "week-from-today") {
      return ( new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()).substring(0, 10)
    }
  }


  return <div>
      <Grid container direction="row" justify="center" spacing={5} >
        <Grid item className="dateField">
          <TextField
            id="date"
            label="Departure date"
            type="date"
            defaultValue={getDate("today")}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setDepartureDate(event.target.value)
            }}
          />

        </Grid>

        {props.isMobile?null:<Grid item className="ghost" />}

        <Grid item className={"dateField " + (props.isMobile?" dateFieldMobile":"")}>
          <TextField
            id="date"
            label="Arrival date"
            type="date"
            defaultValue={getDate("week-from-today")}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setArrivalDate(event.target.value)
            }}
          />

        </Grid>
      </Grid>

      <Grid container direction="row" justify="center" spacing={5} >
        <Grid item>
          <SearchBar name="originSearchBar" label="Origin city" setCityID={setOriginID} />
        </Grid>
        <Grid item>
          <SearchBar name="destinationSearchBar" label="Desination city" setCityID={setDestinationID} />
        </Grid>
      </Grid>


      <Button disabled={!(originID && destinationID)} variant="contained" className="searchButton" onClick={submitSearch}> <SearchIcon className="searchIcon" /> Search for flights</Button>
  </div>;
}

export default SearchBarContainer;
