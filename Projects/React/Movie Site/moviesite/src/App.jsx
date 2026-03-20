
import './App.css'

import MovieCard from './components/MovieCard'
import home from './pages/home';




const App = () => {

  const movieNumber=1;

  
  return (

    <>
     {movieNumber===1? (<MovieCard movie={{title:"Bahubali",release_date:"2018"}}/>):<MovieCard movie={{title:"RRR",release_date:"2022"}}/>} 
      {movieNumber===2 &&  
      <MovieCard movie={{title:"12th Fail",release_date:"2023"}}/>
}
    </>
  
  )
}

export default App;