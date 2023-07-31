import { ChangeEvent, FC } from 'react';

import Search from '../assets/shared/search.png';
import classes from './SearchBar.module.css';

interface SearchBar {
  onSearch: (searchQuery: string) => void;
}

const SearchBar: FC<SearchBar> = ({ onSearch }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    onSearch(searchQuery);
  };
  return (
    <div className={classes['user-notes-wrapper__input-search-wrapper']}>
      <img
        src={Search}
        alt="Search"
        className={classes['user-notes-wrapper__input-icon']}
      />
      <input
        type="search"
        name="search"
        placeholder="Search by text..."
        className={classes['user-notes-wrapper__input-search']}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBar;
