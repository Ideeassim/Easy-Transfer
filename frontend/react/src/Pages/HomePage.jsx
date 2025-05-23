import React from 'react';
import { Typography, Paper, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';

const HomePage = () => {
    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);

    
    return (
        <div className='home-page'> 
        <div className='onhome-page'></div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px', backgroundColor: 'rgba(245, 245, 245)' }}>
                <Typography variant="h4" align="center" gutterBottom>
                   <span style={{color:'#D98E04', fontStyle:'italic'}}>Easy</span><span style={{color:'#67A665'}}>Transfer</span> 
                </Typography>
                <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" marginBottom={2} marginTop={2}>
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
                <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="password" /></Stack>
                {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> */}
            </Paper>
        </div>
    );
};

export default HomePage;