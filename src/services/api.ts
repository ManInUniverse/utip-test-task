import { Character, CharacterDTO } from '../types/character';
import { getCharacterFromDTO } from './api.utils';

const BASE_URL = 'https://swapi.dev/api/people';

type ResponseDTO = {
    results: CharacterDTO[];
};

export const fetchCharacters = async () => {
    const responses = await Promise.all([
        fetch(`${BASE_URL}/?page=1`),
        fetch(`${BASE_URL}/?page=2`),
        fetch(`${BASE_URL}/?page=3`),
    ]);
    const data = (await Promise.all(responses.map((response) => response.json()))) as ResponseDTO[];

    return data.reduce(
        (characters, { results }) => characters.concat(results.map(getCharacterFromDTO)),
        [] as Character[]
    );
};
