import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';

const App = () => {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState([]);

  const fetchData = prefix => {
    const url = `http://localhost:3000/api/stocks/tickers?prefix=${prefix}`;
    return axios.get(url);
  };

  const handleChange = async e => {
    setValue(e.target.value);
    fetchData(e.target.value).then(resp => {
      const { body } = resp.data;

      setResponse(body);
    });
  };

  const mapResponse = () => {
    return response.map(obj => (
      <div>
        <span>${obj.symbol}</span>.<span>${obj.company_name}</span>
      </div>
    ));
  };

  return (
    <>
      ticker search : <input value={value} onChange={handleChange} />
      {response && mapResponse()}
    </>
  );
};

render(<App />, document.getElementById('root'));
