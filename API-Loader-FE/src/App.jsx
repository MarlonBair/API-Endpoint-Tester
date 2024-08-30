import Cards from './components/Cards'
import Navbar from './components/Navbar'
import apiData from './data/apiData'
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import { fetchAllData } from './utils/fetchData';
import { transformApiData } from './utils/transformApiData';
import { useState, useEffect } from "react";
function App() {

  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (error) return <div>Error: {error.message}</div>;

  const handleClick = () => {
    const request = transformApiData(apiData);
    fetchAllData(request, setStatusData, setLoading);  
  }

  return (
    <>
      <Navbar />
      <div className='search'>
        <Button className='search-button' variant="contained" onClick={handleClick}><h2>Search All</h2><RefreshIcon></RefreshIcon></Button>
      </div>
      <Cards 
        apiData={apiData}  
        statusData={statusData} 
        setStatusData={setStatusData}
        loading={loading}
      />
    </>
  )
}

export default App
