import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4MDQ0MTQ2LCJpYXQiOjE3NDI4NjAxNDYsImp0aSI6IjllMTc5Y2NmYTk4ZTQ4NzA4NDI2ZWIxMGVkMTM3MWZmIiwidXNlcl9pZCI6Ijg2NjBlZWJjLTY2ZWEtNGIxMC1iN2ViLTVhYjI0OTE2YTQyOSJ9.vqPQsRp5dnuQM_42k5qx_OGouQsog1sFpsV4ubw1BcU'
  }
});

export default client;