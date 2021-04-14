import SearchResults from "./SearchResults";
import NavigationBar from "./NavigationBar";
import { useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


function SearchPage() {
    let history = useHistory();

    function newSearch() {
        history.push("/");
    }

    return <div>
        <NavigationBar />
        <Button variant="contained" className="backButton" onClick={newSearch}> <SearchIcon className="searchIcon" /> New Search </Button>
        <SearchResults />
    </div>;
}

export default SearchPage;