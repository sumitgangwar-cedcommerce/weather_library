import logo from './logo.svg';
import './App.css';
import { Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {

  const [date , setDate] = useState('')
  const [backImg , setBackImg] = useState('https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')

  const months = {'Jan':'January', 'Feb':'February', 'Mar':'March' , 'Apr':'April', 'May':'May', 'Jun':'June', 'Jul':'July', 'Aug':'August', 'Sep':'September', 'Oct':'October', 'Nov':'November', 'Dec':'December'}
  const days = {'Sun': 'Sunday', 'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed':'Wednesday' , 'Thu':'Thursday', 'Fri':'Friday', 'Sat':'Saturday'}
  const [weather , setWeather] = useState('')

  const img = {
    'Sun': 'https://images.pexels.com/photos/585759/pexels-photo-585759.jpeg',
    'Mist' : 'https://images.pexels.com/photos/163323/fog-dawn-landscape-morgenstimmung-163323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Rain' : 'https://images.pexels.com/photos/8549415/pexels-photo-8549415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Cloud': 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Wind' : 'https://images.pexels.com/photos/1684891/pexels-photo-1684891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Drizzle':'https://www.shemazing.net/wp-content/uploads/2017/10/drizzle2_w630.jpg' 
  }

  const btnHandler = (e) => {
    e.preventDefault()
    let city = document.getElementById('city').value
    findData(city)
    
  }
  const findData = (city) =>{
    let API_KEY = "0bab7dd1bacc418689b143833220304"
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=$location=${city}`)
         .then(response => setWeather(response.data))
  }

  useEffect(()=>{
    if (weather!==''){
      let t = weather.location.localtime
      t = t.split(' ')
      t = new Date(t[0])
      t = t.toDateString()
      t = t.split(' ')
      console.log(t)
      t[2] = Number(t[2])
      let str = ''
      str+=days[t[0]] + ' ' + t[2] + ' ' + months[t[1]] + ' ' +t[3]
      setDate(str)
      if(isHave(weather.current.condition.text,'sun')) setBackImg(img.Sun)
      else if(isHave(weather.current.condition.text,'wind')) setBackImg(img.Wind)
      else if(isHave(weather.current.condition.text , 'cloud')) setBackImg(img.Cloud)
      else if(isHave(weather.current.condition.text , 'rain'))  setBackImg(img.Rain)
      else if(isHave(weather.current.condition.text , 'mist'))  setBackImg(img.Mist)
      else if(isHave(weather.current.condition.text , 'drizzle'))  setBackImg(img.Drizzle)
    }
    
  },[weather])

  const isHave  = (a , b)=>{
    a = a.toLowerCase()
    // console.log(a.match(b))
    if(a.match(b))  return true
    return false
  }

  // console.log(date)

  return (
    <div className="App" style={{backgroundImage: 'url(' + backImg + ')'}}>
      <div><form onSubmit={btnHandler} action='?'>
        <input autoFocus  id='city' placeholder="Enter your city"></input>
        <button type="submit">Find</button>
        </form></div>
      {
        weather!=='' ? <div sx={{background:'transparent'}}>
        <p className="name">{weather.location.name}, {weather.location.country}</p>
        <p className='date'>{date}</p>
        <p className='temp'>{weather.current.temp_c}° C</p>
        <p className='text'>{weather.current.condition.text}</p>
      </div> : null
      }
      
    </div>
  );
}

export default App;
