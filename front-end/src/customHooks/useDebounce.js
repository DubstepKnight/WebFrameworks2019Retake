import React, {useState, useEffect} from 'react';

const useDebounce = (value, delay) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    // console.log("start");
    // console.log(value, delay);
  
    useEffect(() => {
      // This is the effect that runs when the hook is used
      // this hook starts a timer for a delay time in milliseconds
        const handler = setTimeout(() => {
          // this function gets executed once timer ends
          setDebouncedValue(value);
        }, delay);
        return () => {
          // this is the cleanup function that clears the timeout
          // it is needed to reset the the timer
          clearTimeout(handler);
        };
        // If the value does not change, the effect will not be executed
      }, [value] 
      );
      
    // console.log(debouncedValue);
    return debouncedValue;
  };
  export default useDebounce;