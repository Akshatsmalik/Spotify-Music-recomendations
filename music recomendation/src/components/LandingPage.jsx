import { useState } from 'react'
import axios from 'axios'
import roomBg from '../assets/room-bg.png'
import Spotify from './Spotify'

function AlbumCarousel({ activeIndex, onSelect }) {
  const [randomTrackId, setRandomTrackId] = useState([])

  const fetchRandomList = async () => {
    try {
      const response = await axios.get("https://spotify-music-recomendations.onrender.com/random")
      const list=response.data
      // console.log(list)
      //issues so the issue is that it always stays in that single cluster and keep recomending the same songs again and again
      setRandomTrackId(response.data.trackId) 
    } catch (error) {
      console.error("Failed to fetch random track:", error)
    }

    Spotify(trackId=list)
  }

  return (
    <>
    <div>
      <Spotify/>
      <button className='bg-green-900 border-2' onClick={fetchRandomList}> GET RANDOM </button>
    </div>
    </>
  )
}

export default AlbumCarousel
