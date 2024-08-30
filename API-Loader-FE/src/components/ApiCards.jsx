import CircleIcon from '@mui/icons-material/Circle';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { transformNameData } from '../utils/transformApiData';
import { fetchData } from '../utils/fetchData';

const ApiCards = ({ className, apiName, body, statusData, setStatusData, loading }) => {
  const [isLoading, setIsLoading] = useState(false);

  function getDate() {
    const dt = new Date();
    return dt.toLocaleString();
  }

  const handlePlayClick = () => {
    const request = transformNameData(className, apiName, body);
    fetchData(request, statusData, setStatusData, setIsLoading);
  };

  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return 'lightgreen'; // Good requests
    if (statusCode === 429)  return 'orange'; // Too Many Requests
    return 'red'; // All other status codes
  };
;

  return (
    <div className="api-call-card">
      <div className='api-call-card-name'>
        <h3>{apiName}</h3>
        <IconButton
            disabled={isLoading}
            onClick={handlePlayClick}
          >
            {loading || isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <RefreshIcon />
            )}
          </IconButton>
      </div>

      {loading && <CircularProgress size={24} />}

      {
        !loading && statusData && statusData.get(apiName) && 
        <div className="api-call-card-status">
          <time>{getDate()}</time>
          <h4>{statusData.get(apiName)}</h4>
          <CircleIcon htmlColor={getStatusColor(statusData.get(apiName))} />
        </div>
      }

    </div>
  );
};

export default ApiCards;