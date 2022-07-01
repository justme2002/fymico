import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ComicContext } from './store/ComicReducer/context';
import UserProvider from './store/UserReducer/context';
import SearchInput from './store/SearchInput/context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <UserProvider>
          <SearchInput>
            <ComicContext>
              <App />
            </ComicContext>
          </SearchInput>
        </UserProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
