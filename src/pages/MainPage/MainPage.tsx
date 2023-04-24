import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { charactersStore } from '../../store/charactersStore';
import { AppRoute } from '../../const';
import { Character } from '../../types/character';

import logo from '../../assets/logo.png';
import { ReactComponent as AlertIcon } from '../../assets/alertIcon.svg';

import { CharactersTable } from '../../components/CharactersTable/CharactersTable';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';

export const MainPage = observer(() => {
    const navigate = useNavigate();
    const [targetCharacter, setTargetCharacter] = useState<Character | null>(null);
    const [modal, setModal] = useState<'removeData' | 'deleteCharacter' | null>(null);

    const { sortedCharacters, isLoading, error } = charactersStore;

    const handleModalClose = () => {
        setTargetCharacter(null);
        setModal(null);
    };

    const handleDataRemove = () => {
        charactersStore.clear();
        handleModalClose();
    };

    const handleActionButtonClick = (character: Character) => {
        setTargetCharacter(character);
        setModal('deleteCharacter');
    };

    const handleCharacterDelete = () => {
        if (targetCharacter) {
            charactersStore.delete(targetCharacter);
        }
        handleModalClose();
    };

    const handleSortingChange = (field: keyof Character) => {
        charactersStore.setSortingConfig(field);
    };

    return (
        <section className="grid grid-cols-2 py-8">
            <h1 className="sr-only">Utip Test Task. Star Wars Characters</h1>
            <div className="mr-[20px] flex flex-col items-center justify-self-center">
                <img src={logo} alt="Star Wars Logo" />
                <p className="mt-10 w-[400px] text-center">
                    Greetings, young Padawan. To get information about characters from the Star Wars
                    universe, click on the button below.
                </p>
                <p className="mt-5 w-[250px] text-center">And may the force be with you...</p>
                <div className="mt-7">
                    <Button
                        type="button"
                        color="yellow"
                        onClick={() => charactersStore.load()}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Load data
                    </Button>
                </div>
            </div>
            <div>
                <div className="relative overflow-x-auto rounded-lg">
                    <CharactersTable
                        characters={sortedCharacters}
                        isLoading={isLoading}
                        error={error}
                        onAction={handleActionButtonClick}
                        onSort={handleSortingChange}
                    />
                </div>
                <div className="mt-4 flex items-center justify-end gap-5">
                    <Button
                        type="button"
                        color="green"
                        onClick={() => navigate(AppRoute.AddNewCharacter)}
                    >
                        Add new character
                    </Button>
                    {!!sortedCharacters.length && (
                        <Button type="button" color="red" onClick={() => setModal('removeData')}>
                            Remove data
                        </Button>
                    )}
                </div>
            </div>
            <Modal isOpen={modal === 'removeData'}>
                <div className="flex flex-col items-center">
                    <AlertIcon width={60} height={60} className="mb-5 text-gray-200" />
                    <p className="mb-10">Are you sure you want to remove all data?</p>
                    <div className="flex gap-5">
                        <Button onClick={handleDataRemove} type="button" color="red">
                            Remove data
                        </Button>
                        <Button onClick={handleModalClose} type="button" color="yellow">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={modal === 'deleteCharacter'}>
                <div className="flex flex-col items-center">
                    <AlertIcon width={60} height={60} className="mb-5 text-gray-200" />
                    <p className="mb-10">{`Delete ${targetCharacter?.name}?`}</p>
                    <div className="flex gap-5">
                        <Button onClick={handleCharacterDelete} type="button" color="red">
                            Delete character
                        </Button>
                        <Button onClick={handleModalClose} type="button" color="yellow">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
});
