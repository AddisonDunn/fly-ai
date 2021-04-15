import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import Grid from '@material-ui/core/Grid';
import Quote from "./Quote";
import { Container } from "@material-ui/core";
import "./ResultsPage.css";

let port_number = null;
if (process.env.NODE_ENV === "development") {
    port_number = process.env.PORT_NUMBER; // development
}
else if (process.env.NODE_ENV === "deployment") {
    port_number = process.env.PORT || 80; //production
}
const quote_query_url = "http://localhost:" + port_number + "/getLocation/";

function SearchResults() {

    let history = useHistory();

    const [error, setError] = useState(null);
    const [didSearchResultsLoad, setDidSearchResultsLoad] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [carriers, setCarriers] = useState([]);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const query = {originID: history.location.state[0],
            destinationID: history.location.state[1],
            departureDate: history.location.state[2],
            arrivalDate: history.location.state[3]
        }
        console.log(qs.stringify(query))
        fetch(quote_query_url + qs.stringify(query), {
            method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setDidSearchResultsLoad(true);
                    setQuotes(
                        result.Quotes
                    );
                    setCarriers(result.Carriers);
                    setPlaces(result.Places);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setDidSearchResultsLoad(true);
                    setError(error);
                }
            )
    }, [])

    function findCarriers(quoteCarrierIDs) {
        let airlineString = "";
        let nextCarrier = {};
        quoteCarrierIDs.forEach(carrierID => {
            if(airlineString) {
                airlineString += ", "
            }
            nextCarrier = carriers.find(carrier => carrier.CarrierId === carrierID);
            if(nextCarrier) {
                airlineString += nextCarrier.Name;
            }
            
        });
        return airlineString;
    }

    function findAirport(id) {
        let airportString = "";
        var airport = places.find(airport => airport.PlaceId === id)
        if(airport) {
            airportString += airport.Name;
            airportString += " (" + airport.IataCode + ")";
        }
        return airportString;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!didSearchResultsLoad) {
        return <div>Loading...</div>;
      } else if(quotes.length < 1) {
        return <div>"No Quotes found." </div>
      }
        else {
        return (<div>

            { console.log(quotes) }

            <Container maxWidth="md" className="resultsContainer"> 

            <Grid container direction="column" justify="center" spacing={3}>
            {/* <Grid item >
            <Quote id={quotes[0].QuoteId} minPrice={quotes[0].MinPrice} isDirect={quotes[0].Direct} />
            </Grid> */}
            {quotes.map( (elem) =>
                <Grid key={elem.QuoteId} item style={{flexGrow: 1}}>
                        <Quote 
                        minPrice={elem.MinPrice} 
                        isDirect={elem.Direct} 
                        airline={findCarriers(elem.OutboundLeg.CarrierIds)}
                        departureAirport={findAirport(elem.OutboundLeg.OriginId)}
                        arrivalAirport={findAirport(elem.OutboundLeg.DestinationId)} />
                </Grid>
              )}
            
            </Grid>

            </Container>
            </div>
        );
      }


}

export default SearchResults;