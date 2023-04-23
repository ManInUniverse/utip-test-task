import { Character, CharacterDTO } from '../types/character';

export const getCharacterFromDTO = ({
    name,
    height,
    mass,
    hair_color,
    gender,
}: CharacterDTO): Character => ({
    name,
    height,
    mass,
    hairColor: hair_color,
    gender,
});
