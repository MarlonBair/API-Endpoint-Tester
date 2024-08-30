import ClassCards from "./ClassCards";

const Cards = ({ apiData, statusData, setStatusData, loading }) => {
    return (
          <div className="cards">
            {Object.entries(apiData).map(([className, classData]) => (
              <ClassCards
                key={className}
                className={className}
                classData={classData}
                statusData={statusData}
                setStatusData={setStatusData}
                loading={loading}
              />
            ))}
          </div>
    );
  };
  
  export default Cards;