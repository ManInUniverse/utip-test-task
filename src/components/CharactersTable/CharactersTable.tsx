import { useEffect, useState } from 'react';

import { Character } from '../../types/character';
import { tableHeaders } from './CharactersTable.const';
import { charactersStore } from '../../store/charactersStore';

import { ReactComponent as SortingIcon } from '../../assets/sortingIcon.svg';

import { Spinner } from '../Spinner/Spinner';
import { Pagination } from '../Pagination/Pagination';
import { CharacterRow } from '../CharacterRow/CharacterRow';

type Props = {
    characters: Character[];
    isLoading?: boolean;
    error?: string | null;
    onAction: (character: Character) => void;
    onSort: (field: keyof Character) => void;
};

const CHARACTERS_PER_PAGE = 10;

export const CharactersTable = ({ characters, isLoading, error, onAction, onSort }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * CHARACTERS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - CHARACTERS_PER_PAGE;

    const currentCharacters = characters.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);

    useEffect(() => {
        if (!characters.length) {
            setCurrentPage(1);
        } else if (!currentCharacters.length) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }, [characters, currentCharacters]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const [draggableCharacter, setDraggableCharacter] = useState<Character | null>(null);

    const handleDrop = (currentCharacter: Character) => {
        if (draggableCharacter) {
            charactersStore.swapCharacters(draggableCharacter, currentCharacter);
        }
    };

    return (
        <>
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-700 text-xs uppercase text-gray-400">
                    <tr className="text-center">
                        {tableHeaders.map(({ label, field }) => (
                            <th key={field} scope="col" className="whitespace-nowrap px-3 py-3">
                                <div className="flex items-center">
                                    {label}
                                    {!!characters.length && (
                                        <button
                                            type="button"
                                            className="ml-1 p-1"
                                            onClick={() => onSort(field)}
                                        >
                                            <SortingIcon width={10} height={10} />
                                        </button>
                                    )}
                                </div>
                            </th>
                        ))}
                        <th scope="col" className="whitespace-nowrap px-3 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody
                    onDragEnter={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                    }}
                >
                    {currentCharacters.length ? (
                        currentCharacters.map((character) => (
                            <CharacterRow
                                key={character.name}
                                character={character}
                                onDragStart={setDraggableCharacter}
                                onDrop={handleDrop}
                                onAction={onAction}
                            />
                        ))
                    ) : (
                        <tr className="bg-gray-800">
                            {isLoading && (
                                <td
                                    colSpan={tableHeaders.length + 1}
                                    className="px-10 py-20 text-center"
                                >
                                    <Spinner size={50} />
                                </td>
                            )}
                            {error && (
                                <td
                                    colSpan={tableHeaders.length + 1}
                                    className="px-10 py-20 text-center text-red-600"
                                >
                                    Failed to load data
                                </td>
                            )}
                            {!isLoading && !error && (
                                <td
                                    colSpan={tableHeaders.length + 1}
                                    className="px-10 py-20 text-center"
                                >
                                    There is no data
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
            {characters.length > CHARACTERS_PER_PAGE && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </>
    );
};
