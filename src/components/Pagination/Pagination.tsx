import { ReactComponent as ArrowLeftIcon } from '../../assets/arrowLeftIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/arrowRightIcon.svg';

type Props = {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
};

export const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
    return (
        <nav className="flex items-center justify-end">
            <span className="mr-10 text-sm text-gray-400">
                Page<span className="mx-2 font-semibold text-white">{currentPage}</span>of
                <span className="ml-2 font-semibold text-white">{totalPages}</span>
            </span>
            <button
                type="button"
                className="ml-0 block rounded-l-lg border border-gray-700 bg-gray-800 px-3 py-2 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-800 disabled:hover:text-gray-400"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span className="sr-only">Previous</span>
                <ArrowLeftIcon width={20} height={20} />
            </button>
            <button
                type="button"
                className="ml-0 block rounded-r-lg border border-gray-700 bg-gray-800 px-3 py-2 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-800 disabled:hover:text-gray-400"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span className="sr-only">Next</span>
                <ArrowRightIcon width={20} height={20} />
            </button>
        </nav>
    );
};
