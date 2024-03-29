import { SET_CURR_INDEX, SET_ALL_PLANETS } from '../slice/MySlice'
import { useAppSelector, useAppDispatch } from "../app/store";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
export default function Example() {
    const totalLength = useAppSelector(state => state.totalLength)
    const currIndex = useAppSelector(state => state.currIndex)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch()
    const onPrev = () => {
        if (currIndex > 1) {
            setIsLoading(true);
            axios
                .get(`https://swapi.dev/api/planets/?page=${currIndex - 1}&format=json`)
                .then(res => {
                    dispatch(SET_CURR_INDEX(currIndex - 1))
                    dispatch(SET_ALL_PLANETS(res.data))
                    setIsLoading(false);
                })
                .catch(e => console.log(e.message));
        }
    }
    const onNext = () => {
        if (currIndex < totalLength) {
            setIsLoading(true)
            axios
                .get(`https://swapi.dev/api/planets/?page=${currIndex + 1}&format=json`)
                .then(res => {
                    dispatch(SET_CURR_INDEX(currIndex + 1))
                    dispatch(SET_ALL_PLANETS(res.data))
                    setIsLoading(false);
                })
                .catch(e => console.log(e.message));
        }
    }
    return (
        <>
            {isLoading === true && <div className="flex justify-center " role="status">
                <svg aria-hidden="true" className="inline w-20 h-20 mb-5 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>}
            <div className="flex justify-center my-2">
                <nav className="inline-flex space-x-5" aria-label="Pagination">
                    <button onClick={onPrev} className={`relative inline-flex items-center rounded-md mr-1 px-2 py-2  bg-zinc-${currIndex === 1 ? '800 hover:bg-zinc-800' : '700'} hover:bg-zinc-500 transition-all `}>
                        <span className="sr-only">Previous</span>
                        <FaChevronLeft className="h-5 w-5 text-zinc-100" aria-hidden="true" />
                    </button>
                    <button onClick={onNext} className={`relative inline-flex items-center rounded-md mr-1 px-2 py-2  bg-zinc-${currIndex === totalLength ? '800 hover:bg-zinc-800' : '700'} hover:bg-zinc-500 transition-all `}>
                        <span className="sr-only">Next</span>
                        <FaChevronRight className="h-5 w-5 text-zinc-100" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </>
    )
}