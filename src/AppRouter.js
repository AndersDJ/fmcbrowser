import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Front from './pages/Front';
import FileControl from './pages/FileControl';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Front />} />
                <Route path='/user' exact element={<FileControl/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter