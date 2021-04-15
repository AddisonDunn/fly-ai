import SearchBarContainer from "./SearchBarContainer";
import NavigationBar from "./NavigationBar";
import Grid from '@material-ui/core/Grid';
import "./core.css";
import Container from '@material-ui/core/Container';
import "./StartingPage.css";
import { useMediaQuery } from 'react-responsive'



function StartingPage() {

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

  return (
    <div>
      <NavigationBar />
      <header> <h1 class> Know the best flight price, quickly. </h1></header>
      <Container className={"startingPageMiddle" + (isMobile?" startingPageMobile":"")}>
        <SearchBarContainer isMobile={isMobile}/>
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
