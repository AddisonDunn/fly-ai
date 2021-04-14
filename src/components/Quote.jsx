import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Grid, makeStyles } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import "./ResultsPage.css";



function Quote(props) {


    return <div>

        <Card className="quoteCard">
            <CardContent>

                <Grid container  spacing={2} alignItems="center">

                    <Grid item className="quoteCardItem">
                        <p className="priceText">{"$" + props.minPrice}</p>
                    </Grid>
                    <Grid item className="quoteCardItem">
                        <p> {props.airline} </p>
                        <p> - </p>
                        <p> {props.isDirect?"Direct":"Indirect"} </p>
                    </Grid>
                    <Grid item className="quoteCardItem airports">
                        <p className="airportText"> {props.departureAirport} </p>
                        <p><ArrowRightAltIcon /></p>
                        <p className="airportText"> {props.arrivalAirport} </p>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>

    </div>;

}

export default Quote;