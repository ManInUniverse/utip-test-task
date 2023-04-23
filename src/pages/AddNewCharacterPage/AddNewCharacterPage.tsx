import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Character } from '../../types/character';
import { AppRoute } from '../../const';
import { charactersStore } from '../../store/charactersStore';

import { ReactComponent as SuccessIcon } from '../../assets/successIcon.svg';
import { ReactComponent as AlertIcon } from '../../assets/alertIcon.svg';

import { NewCharacterForm } from '../../components/NewCharacterForm/NewCharacterForm';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';

export const AddNewCharacterPage = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState<'addedSuccess' | 'characterExist' | null>(null);

    const handleFormSubmit = (newCharacter: Character) => {
        try {
            charactersStore.add(newCharacter);
            setModal('addedSuccess');
        } catch {
            setModal('characterExist');
        }
    };

    const handleModalClose = () => {
        setModal(null);
    };

    return (
        <section className="flex items-start py-10">
            <h1 className="sr-only">Add new character</h1>
            <Link
                to={AppRoute.Main}
                className="mr-20 flex items-center gap-5 rounded-lg border border-yellow-300 px-3 py-2 text-yellow-300 transition hover:bg-yellow-400 hover:text-white"
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
                <span className="sr-only">Back to the Main page</span>
            </Link>
            <div className="w-[350px]">
                <NewCharacterForm onSubmit={handleFormSubmit} />
            </div>
            <Modal isOpen={modal === 'addedSuccess'}>
                <div className="flex flex-col items-center">
                    <SuccessIcon width={60} height={60} className="mb-5 text-gray-200" />
                    <p className="mb-10">New character successfully created!</p>
                    <div className="flex gap-5">
                        <Button onClick={() => navigate(AppRoute.Main)} type="button" color="green">
                            Ok
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={modal === 'characterExist'}>
                <div className="flex flex-col items-center">
                    <AlertIcon width={60} height={60} className="mb-5 text-gray-200" />
                    <p className="mb-10">Character with this name is already exist!</p>
                    <div className="flex gap-5">
                        <Button onClick={handleModalClose} type="button" color="yellow">
                            Ok
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};
