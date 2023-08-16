import * as React from 'react';
import Divider from '@mui/material/Divider';
import SearchForm from './search-form';
import SearchResults from './search-results';
//import SearchResults2 from './test-nested-2';

const SearchBox = () => {
    return (
        <div>
            <SearchForm />
            {/* <Divider />
            <SearchResults /> */}
        </div>
    )
}

export default SearchBox