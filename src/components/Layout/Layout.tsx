import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <main className="mx-auto w-[1200px] flex-grow p-6">
                <Outlet />
            </main>
        </div>
    );
};
