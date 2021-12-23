import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Front from './pages/Front';
import FileControl from './pages/FileControl';
import Test from './pages/Test';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Front />} />
                <Route path='/user' exact element={<FileControl />} />
                {/* <Route path='/router' exact element={<Test />} /> */}
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter