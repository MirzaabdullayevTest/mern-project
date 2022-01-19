import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from './Pages/AuthPage'
import { CreatePage } from './Pages/CreatePage'
import { DetailPage } from './Pages/DetailPage'
import { LinksPage } from './Pages/LinksPage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {  // avtorizatsiya bor bo'lsa kiradi
        return (
            <Routes>
                <Route path="/create" element={<CreatePage />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="*" element={<Navigate to='/create' />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="*" element={<AuthPage />} />
        </Routes>
    )
}
