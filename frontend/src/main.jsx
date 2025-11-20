// frontend/src/main.jsx (أو main.tsx)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // <--- استيراد Provider
import store from './store/store.js'; // <--- استيراد Store
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* <--- ربط الـ Store */}
      <App  />
    </Provider>
  </React.StrictMode>,
);