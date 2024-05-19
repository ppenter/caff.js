
import React from 'react';
import { Routes, Route } from 'react-router';
import PAGE_0 from '../src/app/page.tsx';
import LAYOUT_0 from '../src/app/layout.tsx';

export default function App(props){
    return(
        <Routes>
        
            <Route path="/" element={
                <LAYOUT_0><PAGE_0 {...props} /></LAYOUT_0>
            }>
                
            </Route>
        
        </Routes>
    )
}

