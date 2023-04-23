import { makeAutoObservable, action } from 'mobx';
import { Character } from '../types/character';
import { fetchCharacters } from '../services/api';

class CharactersStore {
    characters: Character[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    load() {
        this.clear();
        this.isLoading = true;
        this.error = null;
        fetchCharacters()
            .then(
                action('loadSuccess', (characters) => {
                    this.characters = characters;
                })
            )
            .catch(
                action('loadFailed', () => {
                    this.error = 'Failed to load data!';
                })
            )
            .finally(action('loadFinished', () => (this.isLoading = false)));
    }

    clear() {
        this.characters = [];
    }

    add(newCharacter: Character) {
        const isCharacterExist = this.characters.some(({ name }) => name === newCharacter.name);

        if (!isCharacterExist) {
            this.characters.push(newCharacter);
        } else {
            throw new Error('Character with this name is already exist');
        }
    }

    delete(character: Character) {
        const targetCharacter = this.characters.find(({ name }) => name === character.name);

        if (targetCharacter) {
            const targetCharacterIndex = this.characters.indexOf(targetCharacter);
            this.characters.splice(targetCharacterIndex, 1);
        }
    }
}

export const charactersStore = new CharactersStore();
