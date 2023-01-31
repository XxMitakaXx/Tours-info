import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'


const url = 'https://course-api.com/react-tours-project';


function App () {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);  

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);

    setTours(newTours);
  }

  const fetchTours = async () => {
    setLoading(true);

    try {
      const reponse = await fetch(url);
      const tours = await reponse.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(true);
        console.log(error);
    }
  }

  useEffect(() => {
    fetchTours();
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  } 
   
  if (tours.length === 0) {
    return (
      <main>
        <h2>no more tours</h2>
        <button className='btn' onClick={() => fetchTours()}>refresh</button>
      </main>
    )
  }

  return (
    <Tours tours={tours} removeTour={removeTour} />
  )
}

export default App