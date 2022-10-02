import axios from 'axios';

const API_URL = '/api/tft';

const getTft = async (name) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      name: name
    }
  };
  console.log(name + '1');
  const response = await axios.get(API_URL, config, name);
  console.log(response);
  return response.data;
};

const tftService = {
  getTft
};

export default tftService;
