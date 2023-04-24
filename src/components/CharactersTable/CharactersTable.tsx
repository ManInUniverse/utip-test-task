import { Character } from '../../types/character';

import { tableHeaders } from './CharactersTable.const';

import { ReactComponent as SortingIcon } from '../../assets/sortingIcon.svg';

import { Spinner } from '../Spinner/Spinner';

type Props = {
    characters: Character[];
    isLoading?: boolean;
    error?: string | null;
    onAction: (character: Character) => void;
    onSort: (field: keyof Character) => void;
};

export const CharactersTable = ({ characters, isLoading, error, onAction, onSort }: Props) => {
    return (
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
            <tbody>
                {characters.length ? (
                    characters.map((character) => (
                        <tr
                            key={character.name}
                            className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600"
                        >
                            <th
                                scope="row"
                                className="whitespace-nowrap px-5 py-4 font-medium text-white"
                            >
                                {character.name}
                            </th>
                            <td className="px-5 py-4">{character.height}</td>
                            <td className="px-5 py-4">{character.mass}</td>
                            <td className="px-5 py-4">{character.hairColor}</td>
                            <td className="px-5 py-4">{character.gender}</td>
                            <td className="px-5 py-4">
                                <button
                                    className="text-red-600"
                                    onClick={() => onAction(character)}
                                    type="button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
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
    );
};
