import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from "./redux/store.jsx";
import "./i18n";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="overflow-x-hidden">
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </div>
  </StrictMode>
);
