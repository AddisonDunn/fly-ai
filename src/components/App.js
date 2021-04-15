import './App.css';
import StartingPage from "./StartingPage";
import SearchPage from "./SearchPage";
import {
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header>  */}
      {/* <StartingPage /> */}
      <Switch>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route exact path="/">
          <StartingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
