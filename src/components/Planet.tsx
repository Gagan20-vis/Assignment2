import { SET_CURR_PLANET, SET_DIALOG } from "../slice/MySlice";
import { PlanetProp } from "../types/Planet.types";
import { useAppDispatch } from "../app/store"
export default function Planet({ key, planet }: PlanetProp) {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(SET_CURR_PLANET(planet.name))
        dispatch(SET_DIALOG(true))
    }
    return (
        <div className="sm: bg-zinc-700 rounded-lg p-5 my-5 mx-10 space-x-5 " key={key}>
            <p className="text-3xl font-bold font-sans mb-5">{planet.name}</p>
            <div className="inline-flex">
                <p className="text-lg mb-3"><strong>Climates : </strong> </p>
                <p className="text-lg font-sans font-bold text-gray-800 italic ">{planet.climate}</p>
            </div>
            <p className="font-sans mb-3"><strong>Population : </strong>{planet.population}</p>
            <div className="flex">
                <p className="text-lg mr-2 mb-3"><strong>Terrains:</strong></p>
                <p className="text-lg font-sans font-bold text-gray-800 italic">{planet.terrain}</p>
            </div>
            <button className="p-3 bg-purple-600 text-black font-semibold font-sans rounded-lg float-right hover:bg-purple-400 transition-all" onClick={handleClick}>Residents</button>
        </div>
    )
}
