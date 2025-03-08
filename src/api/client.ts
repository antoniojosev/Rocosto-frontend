import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NjU4NTg5LCJpYXQiOjE3NDE0NzQ1ODksImp0aSI6IjE4YzY1NmFkYTMzZDQ1M2FiY2JjZjk5MWNlYjE0NTRiIiwidXNlcl9pZCI6ImQ0N2EzZmI4LTlmMGUtNDYzOC05ZGUwLTNmNzIxNmU0OTliNCJ9.A3PQsZZxuZdRb2hZjQHtHTYgILH0amEk3QUc67h6UZ0'
  }
});

export default client;