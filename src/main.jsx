import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SearchProvider } from './Context/SearchContext';
import ContentProvider from './Context/ContentContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SearchProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </SearchProvider> 
  </React.StrictMode>
);
