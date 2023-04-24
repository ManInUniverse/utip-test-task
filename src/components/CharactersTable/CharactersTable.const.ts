import { Character } from '../../types/character';

type TableHeader = {
    label: string;
    field: keyof Character;
};

export const tableHeaders: TableHeader[] = [
    {
        label: 'Name',
        field: 'name',
    },
    {
        label: 'Height',
        field: 'height',
    },
    {
        label: 'Mass',
        field: 'mass',
    },
    {
        label: 'Hair color',
        field: 'hairColor',
    },
    {
        label: 'Gender',
        field: 'gender',
    },
];
