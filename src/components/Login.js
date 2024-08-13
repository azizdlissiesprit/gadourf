import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { fetchUsers } from '../api/fetchUsers';

const Login = ({ setAuthenticated, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const users = await fetchUsers();
      const user = users.find((user) => user.name.split(' ')[0] === username );
      if (user) {
        
        setUser(user);
        setAuthenticated(true);
        navigate('/');
      } else {
        alert('Invalid credentials');
        
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('An error occurred during login');
      setAuthenticated(true);
        navigate('/');
      
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
