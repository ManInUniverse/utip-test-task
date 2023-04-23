import { ChangeEvent, FormEvent, useState } from 'react';

import { Character } from '../../types/character';
import { genderOptions, hairColorOptions } from './NewCharacterForm.const';

import { Button } from '../Button/Button';

type Props = {
    onSubmit: (formData: Character) => void;
};

const validateForm = (formData: Character): boolean => {
    const isNameValid = formData.name.length > 1;
    const isHeightValid = formData.height.length > 0;
    const isMassValid = formData.mass.length > 0;

    return !!(isNameValid && isHeightValid && isMassValid);
};

export const NewCharacterForm = ({ onSubmit }: Props) => {
    const [formData, setFormData] = useState<Character>({
        name: '',
        height: '',
        mass: '',
        hairColor: hairColorOptions[0].value,
        gender: genderOptions[0].value,
    });

    const isFormValid = validateForm(formData);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        const target = e.target;
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setFormData({
            ...formData,
            [target.name]: target.value.replace(/\D/g, ''),
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            name: formData.name.trim(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                    Name
                </label>
                <input
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400"
                    value={formData.name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    minLength={2}
                    required
                />
            </div>
            <div>
                <label htmlFor="height" className="mb-2 block text-sm font-medium text-white">
                    Height
                </label>
                <input
                    onChange={handleNumberInputChange}
                    className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400"
                    value={formData.height}
                    type="text"
                    name="height"
                    id="height"
                    placeholder="Enter height in centimeters"
                    required
                />
            </div>
            <div>
                <label htmlFor="mass" className="mb-2 block text-sm font-medium text-white">
                    Mass
                </label>
                <input
                    onChange={handleNumberInputChange}
                    className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400"
                    value={formData.mass}
                    type="text"
                    name="mass"
                    id="mass"
                    placeholder="Enter weight in kilograms"
                    required
                />
            </div>
            <div>
                <label htmlFor="hairColor" className="mb-2 block text-sm font-medium text-white">
                    Hair color
                </label>
                <select
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pr-4 text-white placeholder-gray-400"
                    value={formData.hairColor}
                    name="hairColor"
                    id="hairColor"
                >
                    {hairColorOptions.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="gender" className="mb-2 block text-sm font-medium text-white">
                    Gender
                </label>
                <select
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pr-4 text-white placeholder-gray-400"
                    value={formData.gender}
                    name="gender"
                    id="gender"
                >
                    {genderOptions.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <Button disabled={!isFormValid} type="submit" color="green">
                Save character
            </Button>
        </form>
    );
};
