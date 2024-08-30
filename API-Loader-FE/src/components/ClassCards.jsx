import { useState } from 'react';
import ApiCards from './ApiCards';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { transformClassData } from '../utils/transformApiData';
import { fetchData } from '../utils/fetchData';

const ClassCards = ({ className, classData, statusData, setStatusData, loading}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayClick = (event) => {
    if(event.type === 'click') { event.stopPropagation(); }

    const request = transformClassData(classData, className);
    fetchData(request, statusData, setStatusData, setIsLoading);
  };

  return (
    <div className="class-cards">
      <div className="class-header" onClick={() => setIsExpanded(!isExpanded)} >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>{`${className.slice(0, 1).toUpperCase() + className.slice(1)} Endpoints`}</h2>
          <IconButton 
            onClick={handlePlayClick} 
            disabled={isLoading}
          >
            {loading || isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <RefreshIcon  />
            )}
          </IconButton>
        </div>
        <div>
          {isExpanded ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </div>
      </div>
      {isExpanded && (
        <div className="api-calls">
          {Object.entries(classData).map(([apiName, body]) => (
            <ApiCards 
              key={apiName} 
              className={className}
              apiName={apiName} 
              body={body["body"]}
              statusData={statusData} 
              setStatusData={setStatusData}
              loading={loading || isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassCards;
