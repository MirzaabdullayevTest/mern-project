import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './Pages/AuthPage'
import { CreatePage } from './Pages/CreatePage'
import { DetailPage } from './Pages/DetailPage'
import { LinksPage } from './Pages/LinksPage'

export const useRoutes = (isAuthorisaited) => {
    if (isAuthorisaited) {  // avtorizatsiya bor bo'lsa kiradi
        return (
            <Routes>
                <Route path="/create" element={<CreatePage />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
        </Routes>
    )
}
