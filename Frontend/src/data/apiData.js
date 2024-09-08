const rateLimitDuration = 10000;
const rateLimitSize = 10;

const apiData = {
  "category1": {
    "endpoint1": {
      body: null
    },
    "endpoint2": {
      body: null
    },
    "endpoint3": {
      body: {
        param1: "value1"
      },
    },
    "endpoint4": {
      body: {
        param1: "value1"
      }
    },
    "endpoint5": {
      body: {
        param1: "value1"
      }
    },
    "endpoint6": {
      body: {
        param1: "value1"
      }
    },
    "endpoint7": {
      body: {
        param1: ["value1"]
      }
    },
    "endpoint8": {
      body: {
        param1: "value1"
      }
    },
    "endpoint9": {
      body: {
        param1: true
      }
    },
    "endpoint10": {
      body: null
    },
    "endpoint11": {
      body: null
    },
    "endpoint12": {
      body: null
    }
  },
  "category2": {
    "endpoint13": {
      body: null
    },
    "endpoint14": {
      body: null
    }
  },
  "category3": {
    "endpoint15": {
      body: null
    },
    "endpoint16": {
      body: null
    },
    "endpoint17": {
      body: null
    },
    "endpoint18": {
      body: null
    },
  },
  "category4": {
    "endpoint19": {
      body: null
    }
  },
  "category5": {
    "endpoint20": {
      body: null
    },
    "endpoint21": {
      body: null
    },
    "endpoint22": {
      body: null
    }
  }
};

export default apiData;
export {rateLimitDuration, rateLimitSize};