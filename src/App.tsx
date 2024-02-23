import Planets from './components/Planets'
import Modalbox from './components/Modalbox'
import PageNavigation from './components/PageNavigation'
function App() {
  return (
    <>
    <h1 className='text-3xl lg:text-7xl text-white text-center my-5 font-mono'>Star Wars Planets</h1>
    <Planets/>
    <Modalbox/>
    <PageNavigation/>
    </>
  )
}

export default App
