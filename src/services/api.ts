import Axios from 'axios';

const apiRoot: string =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000/api/v2'
    : 'https://swarfarm.com/api/v2';

export default Axios.create({
  baseURL: apiRoot,
});
