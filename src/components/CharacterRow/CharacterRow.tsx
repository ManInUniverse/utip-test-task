import { DragEvent } from 'react';

import { Character } from '../../types/character';

type Props = {
    character: Character,
    onDragStart: (character: Character) => void
    onDrop: (character: Character) => void
    onAction: (character: Character) => void;
}

export const CharacterRow = ({ character, onDragStart, onDrop, onAction }: Props) => {
    const handleDrop = (e: DragEvent<HTMLTableRowElement>, character: Character) => {
        e.currentTarget.style.outline = 'none';
        onDrop(character);
    };

    const handleDragOver = (e: DragEvent<HTMLTableRowElement>) => {
        e.currentTarget.style.outline = '2px solid #4B5563';
        e.currentTarget.style.outlineOffset = '-2px';
    };

    const handleDragLeave = (e: DragEvent<HTMLTableRowElement>) => {
        e.currentTarget.style.outline = 'none';
    };

    return (
        <tr
            key={character.name}
            className="whitespace-nowrap backdrop:border-b border-gray-700 bg-gray-800 hover:bg-gray-600 cursor-move"
            draggable={true}
            onDragStart={() => onDragStart(character)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, character)}
            onDragLeave={handleDragLeave}
        >
            <th scope="row" className="px-5 py-4 font-medium text-white">
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
    );
};
