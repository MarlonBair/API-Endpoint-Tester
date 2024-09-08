import { rateLimitDuration } from "../data/apiData";
import { rateLimitSize } from "../data/apiData";

const fetchAllData = async (request, setStatusData, setLoading) => {
  setLoading(true);

  try {
    const response = await fetch(`http://localhost:8080/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'requests': JSON.stringify(request),
        'rateLimitSize': rateLimitSize,
        'rateLimitDuration': rateLimitDuration
      }
    });

    const result = await response.json();
    setStatusData(new Map(Object.entries(result)));
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false);
  }
};

const fetchData = async (request, statusData, setStatusData, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
    });

    const result = await response.json();
    if(statusData) {
      for (const [key, value] of Object.entries(result)) {
        statusData.set(key, value);
      }
      setStatusData(new Map(statusData));
    } else {
      setStatusData(new Map(Object.entries(result)));
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export {fetchData, fetchAllData};
