export type PlanetType = {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: string[],
    films: string[],
    created: string,
    edited: string,
    url: string
}
export type ResponseType = {
    count: number,
    next: string | null,
    previous: string | null,
    results: PlanetType[]
}
export type initialStateType = {
    AllPlanets: ResponseType | null,
    currPlanet: string | null,
    DialogOpen: boolean,
    currIndex: number,
    totalLength: number
}
export type DataType = {
    name: string,
    height: string,
    mass: string,
    gender: string
}
export type PlanetProp = {
    key: number,
    planet: PlanetType
}