import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Layout } from './components/Layout/Layout';
import { AddNewCharacterPage } from './pages/AddNewCharacterPage/AddNewCharacterPage';
import { AppRoute } from './const';

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
