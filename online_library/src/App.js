import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Data from './DefaultData';
import { LinearProgress, Modal } from '@mui/material';
import { Box } from '@mui/system';


function App() {
  const [data , setData] = useState(Data.docs)
  const [open , setOpen] = useState(false)
  const [bar , setBar] = useState(false)

  const [book , setBook] = useState(0)



  const inputhandler = (e)=>{
    e.preventDefault();
    setBar(true);
    let txt =document.getElementById('txt').value;
    fetchRes(txt)
    
  }
  const fetchRes = (txt)=>{
    fetch(`https://openlibrary.org/search.json?q=${txt}&mode=ebooks&has_fulltext=true`)
    .then(res => res.json())
    .then(res => { if(res.numFound === 0) setData('');
                   else setData(res.docs)})
                  }

  const viewDetails = (item)=>{
    console.log(item)
    setOpen(true)
    setBook(item)
  }

  useEffect(()=>{
    setBar(false)
  },[data])
  console.log(data)


  

  return (
    <div className="App">
      <div className="navbar">
        <form onSubmit={inputhandler}>
          <input type="text" id="txt"  placeholder="Enter Book name" required></input>
          <button type="submit">Search</button>
        </form>
        {
          bar===true ? <Box sx={{ width: '100%' }}>
          <LinearProgress />
          </Box>:null
        }
      </div>
      {
        
        data === '' ?  <div className="err">No result found !!</div> : 
        <div>
          <div className="products">
            { 
              Object.keys(data).map((item , index)=>
                <div className="card" key={index} onClick={()=>viewDetails(item)}>
                  <p>
                  <img src={`https://covers.openlibrary.org/b/olid/${data[item].cover_edition_key}-M.jpg`} alt='image'></img>
                  </p>
                  <p>{data[item].title}</p>
                  
                </div>
              )
            }
          </div>
          {
            bar===false && data !== '' ? <Modal
            open={open}
            onClose={()=>setOpen(false)}
            >
            <div id="modal">
              <div className="img">
                <img src = {`https://covers.openlibrary.org/b/olid/${data[book].cover_edition_key}-M.jpg`} alt='#' />
              </div>
              <div className="content">
                <p className="title">{data[book].title}</p>
                <p className="name">by: {data[book].author_name[0]}</p>
                <p className="year">Publish year: {data[book].first_publish_year}</p>
                <p className='pages'>No. of pages: {data[book].number_of_pages_median}</p>
                <p className='link'><a target="_blank" href={`https://openlibrary.org/${data[book].key}`}>Open in GoogleBooks</a></p>
              </div>  
            </div>
            </Modal>:null
          }
        </div> 
      } 
  </div>
  )
}

export default App;
