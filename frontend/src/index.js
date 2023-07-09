import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter,Routes } from 'react-router-dom';
import AuthProvider from "./StateManagement/contextapi"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
 
<React.StrictMode>
<BrowserRouter>

    <AuthProvider>
    <App />
    </AuthProvider>

</BrowserRouter>
</React.StrictMode>
)

