type Color = 'yellow' | 'red' | 'green';

type Props = {
    color: Color;
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getColorStyle = (color: Color): string => {
    switch (color) {
        case 'yellow':
            return 'hover:bg-yellow-400 text-yellow-300 border-yellow-300 disabled:hover:text-yellow-300';
        case 'red':
            return 'hover:bg-red-600 text-red-500 border-red-500 disabled:hover:text-red-500';
        case 'green':
            return 'hover:bg-green-600 text-green-500 border-green-500 disabled:hover:text-green-500';
        default:
            return '';
    }
};

export const Button = ({ color, isLoading = false, children, ...props }: Props) => {
    return (
        <button
            className={`${getColorStyle(
                color
            )} rounded-lg border px-5 py-2.5 text-center text-sm font-medium transition hover:text-white disabled:opacity-50 disabled:hover:bg-transparent`}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};
