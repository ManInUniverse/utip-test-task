import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute } from './const';

import { Layout } from './components/Layout/Layout';
import { MainPage } from './pages/MainPage/MainPage';
import { AddNewCharacterPage } from './pages/AddNewCharacterPage/AddNewCharacterPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Main} element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path={AppRoute.AddNewCharacter} element={<AddNewCharacterPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};
