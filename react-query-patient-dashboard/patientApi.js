import axios from "axios";

const fetchPatients = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export default fetchPatients;
