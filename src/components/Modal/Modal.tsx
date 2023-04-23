import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    isOpen: boolean;
}>;

export const Modal = ({ isOpen, children }: Props) => {
    return (
        <div
            className={`${
                isOpen ? 'flex items-center justify-center' : 'hidden'
            } z-100 fixed left-0 right-0 top-0 h-screen w-screen overflow-hidden bg-black/70 p-4`}
        >
            <div className="relative max-h-full w-full max-w-md">
                <div className="relative rounded-lg bg-gray-800 p-6">{children}</div>
            </div>
        </div>
    );
};
