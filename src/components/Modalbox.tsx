import { Fragment, useRef, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { SET_CURR_PLANET, SET_DIALOG } from '../slice/MySlice';
import { Dialog, Transition } from '@headlessui/react'
import { ResponseType } from '../types/Planet.types';
import axios from 'axios';
import { DataType } from '../types/Planet.types';

export default function Example() {
    const AllPlanets = useAppSelector(state => state.AllPlanets) as ResponseType
    const currPlanet = useAppSelector(state => state.currPlanet)
    const open = useAppSelector(state => state.DialogOpen);
    const [allData, setAllData] = useState<DataType[]>([]);
    const [isloading, setIsloading] = useState(false);
    const cancelButtonRef = useRef(null)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setIsloading(true);
        const fetchData = async () => {
            try {
                if (!currPlanet || !open) return;

                for (let index = 0; index < AllPlanets.results.length; index++) {
                    if (AllPlanets.results[index].name === currPlanet) {
                        const allResidents = AllPlanets.results[index].residents;

                        const promises = allResidents.map(async (resident) => {
                            try {
                                const res = await axios.get(resident);
                                return {
                                    name: res.data.name,
                                    height: res.data.height,
                                    mass: res.data.mass,
                                    gender: res.data.gender
                                };
                            } catch (error: any) {
                                console.error(`Error fetching data for resident ${resident}:`, error.message);
                                return null;
                            }
                        });

                        const newData = await Promise.all(promises);
                        const filteredData = newData.filter(item => item !== null);

                        setAllData(filteredData as DataType[]);
                        break;
                    }
                }
            } catch (error: any) {
                console.error("Error fetching data:", error.message);
            }
            setIsloading(false);
        };
        fetchData();
    }, [currPlanet, open]);

    const handleClose = () => {
        dispatch(SET_DIALOG(false))
        dispatch(SET_CURR_PLANET(null))
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleClose}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-500 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-zinc-400 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="font-bold leading-6 text-gray-900 text-2xl ">
                                                Residents
                                            </Dialog.Title>
                                            <div className="mt-2 flex justify-center">

                                                {isloading === true ? (<div className='' role="status">
                                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>) : allData.length > 0 ? (<table className="table-auto text-center">
                                                    <thead>
                                                        <tr>
                                                            <th className='border border-slate-600 p-5'>Name</th>
                                                            <th className='border border-slate-600 p-5'>Height</th>
                                                            <th className='border border-slate-600 p-5'>Mass</th>
                                                            <th className='border border-slate-600 p-5'>Gender</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {allData.map((item: DataType, index: number) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className='border border-slate-700 p-5'>{item.name}</td>
                                                                    <td className='border border-slate-700 p-5'>{item.height}</td>
                                                                    <td className='border border-slate-700 p-5'>{item.mass}</td>
                                                                    <td className='border border-slate-700 p-5'>{item.gender}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>) : (
                                                    <div className='lg:text-center'>
                                                        <p className='font-bold text-1xl text-gray-950'>No Data Found!</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-zinc-400 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}