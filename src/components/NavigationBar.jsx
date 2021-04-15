import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
// import MenuIcon from '@material-ui/core/MenuIcon';
import "./NavigationBar.css";

function NavigationBar() {

    return <div><AppBar position="static">
    <Toolbar variant="regular" className="navigationBar">
      {/* <IconButton edge="start" className={""} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      
      <Typography className="title" variant="h6" color="inherit">
        My Fly
      </Typography>
      {/* <Typography className="navItem" variant="h6" color="inherit">
        Donate
      </Typography>
      
      <Typography className="navItem" variant="h6" color="inherit">
        Learn more
      </Typography>
      <IconButton aria-label="settings" edge="end" color="inherit"><SettingsIcon />
      </IconButton> */}
    </Toolbar>
  </AppBar>
  </div>
}

export default NavigationBar;