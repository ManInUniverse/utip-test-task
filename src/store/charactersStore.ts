import { makeAutoObservable, action } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { Character } from '../types/character';
import { fetchCharacters } from '../services/api';

export type SortingConfig = {
    field: keyof Character;
    direction: 'ascending' | 'descending';
};

class CharactersStore {
    characters: Character[] = [];
    isLoading = false;
    error: string | null = null;
    sortingConfig: SortingConfig | null = null;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'CharactersStore',
            properties: ['characters', 'sortingConfig'],
            storage: window.localStorage,
        });
    }

    load() {
        this.clear();
        this.sortingConfig = null;
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

    setSortingConfig(field: keyof Character) {
        const sortingConfig = this.sortingConfig;
        let direction: SortingConfig['direction'] = 'ascending';

        if (
            sortingConfig &&
            sortingConfig.field === field &&
            sortingConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        this.sortingConfig = { field, direction };
    }

    get sortedCharacters() {
        const sortingConfig = this.sortingConfig;

        if (sortingConfig) {
            return [...this.characters].sort((a, b) => {
                if (a[sortingConfig.field] < b[sortingConfig.field]) {
                    return sortingConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortingConfig.field] > b[sortingConfig.field]) {
                    return sortingConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return this.characters;
    }
}

export const charactersStore = new CharactersStore();
