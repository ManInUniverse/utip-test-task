import { CharacterDTO } from '../types/character';
import { getCharacterFromDTO } from './api.utils';

const BASE_URL = 'https://swapi.dev/api/people';

type ResponseDTO = {
    results: CharacterDTO[];
};

export const fetchCharacters = async () => {
    const response = await fetch(BASE_URL);
    const { results } = (await response.json()) as ResponseDTO;

    return results.map(getCharacterFromDTO);
};
