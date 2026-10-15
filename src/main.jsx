import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './features/cart/CartContext';
import { CompareProvider } from './features/compare/CompareContext';
import './styles/theme.css'; import './styles/global.css'; import './styles/layout.css'; import './styles/home.css'; import './styles/store.css'; import './styles/commerce.css'; import './styles/wizard.css'; import './styles/about.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><CompareProvider><CartProvider><App /></CartProvider></CompareProvider></BrowserRouter></React.StrictMode>);
