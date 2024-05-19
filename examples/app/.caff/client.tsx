
        import React from 'react';
        import { hydrateRoot } from 'react-dom/client';
        import { BrowserRouter } from 'react-router-dom';
        import App from './App.tsx';
    
        const root = hydrateRoot(document.getElementById('root') as any, 
          <BrowserRouter>
          <App {...(window as any)?.__INITIAL__DATA__}/>
          </BrowserRouter>  
        );

