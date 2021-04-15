import SearchBarContainer from "./SearchBarContainer";
import NavigationBar from "./NavigationBar";
import Grid from '@material-ui/core/Grid';
import "./core.css";
import Container from '@material-ui/core/Container';
import "./StartingPage.css";




function StartingPage() {
  return (
    <div>
      <NavigationBar />
      <header> <h1> Know the best flight price, quickly. </h1></header>
      <Container className="startingPageMiddle">
        <SearchBarContainer />
      </Container>
      <Container className="startingPageEnd" >
        <Grid container direction="row"  justify="center" >
          <Grid item>
            <span>&#169; Copyright {new Date().getUTCFullYear()} Fly-AI</span>
          </Grid>
        </Grid>
      </Container>

    </div>
  );
}

export default StartingPage;