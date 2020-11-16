import React from 'react';
import ReactAutocomplete from 'react-autocomplete';
import Input from '../Input';
import './styles.scss';

const Autocomplete = ({ articles, searchValue, onSearchChange }) => {
  return (
    <ReactAutocomplete
      items={articles}
      renderInput={Input}
      inputProps={{ placeholder: 'Input a search term' }}
      // shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
      getItemValue={item => item.label}
      renderMenu={(children, value, style) => {
        return articles && articles.length
          ? (
            <div style={{ ...style }} className="input-suggestions">
              {children}
              <a href={`/search?query=${value}`} className="search-link">
                See all results
              </a>
            </div>
          )
          : <></>;// Empty element
      }
      }
      renderItem={(item, highlighted) =>
        <div
          className="input-suggestions-item"
          key={item.id}
          style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
        >
          <a className="input-suggestions-link" href={item.id} target="_blank">{item.label}</a>
        </div>
      }
      value={searchValue}
      onChange={onSearchChange}
    />
  );
}

export default Autocomplete;
