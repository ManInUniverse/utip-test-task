import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

export const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <div className="mx-auto flex w-[1200px] flex-grow flex-col items-center justify-center gap-20 p-6">
                <h1 className="text-3xl text-white">404. Page not found</h1>
                <Link
                    to={AppRoute.Main}
                    className="flex items-center gap-5 rounded-lg border border-yellow-300 px-3 py-2 text-yellow-300 transition hover:bg-yellow-400 hover:text-white"
                >
                    <svg
                        width={30}
                        height={30}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                        ></path>
                    </svg>
                    <span>Back to the Main page</span>
                </Link>
            </div>
        </div>
    );
};
