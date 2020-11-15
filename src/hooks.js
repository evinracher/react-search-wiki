import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export const useSearch = (query) => {

  const [state, setState] = useState({
    articles: [],
    status: 'IDLE',
    error: ''
  });

  const cancelToken = useRef(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    if (cancelToken.current) {
      console.log('Canceling the request');
      cancelToken.current.cancel();
    }

    cancelToken.current = axios.CancelToken.source();

    axios.get(
      `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}`,
      { cancelToken: cancelToken.current.token }
    )
      .then(function (response) {
        const parsedResponse = [];
        for (let i = 0; i < response.data[1].length; i++) {
          parsedResponse.push({
            id: response.data[3][i],
            label: response.data[1][i]
          });
        }

        setState({
          articles: parsedResponse,
          status: 'SUCCESS',
          error: ''
        });
      })
      .catch(function (error) {
        // If it was cancelled, just return
        if (axios.isCancel(error)) {
          console.log('Request was cancelled');
          return;
        }
        // handle error
        console.error(error);
        setState({
          articles: [],
          status: 'ERROR',
          error: error
        });
      })
  }, [query]);

  return state;
};

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      console.log('Putting it', value);
    }, delay);

    return () => {
      // Clear the timeout if value change
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
};