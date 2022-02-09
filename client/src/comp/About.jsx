import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function About() {
  return <div>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <h1>About the Project</h1>
      <p>Hello, I`m Michal Hazan. I am a Full Stack Developer. <br/> This is a CRUD project I build with users and sql</p>
      <h3>This Project includes:</h3>
      <Typography variant="subtitle1" gutterBottom component="div">
      React Js, Node Js, Express, MySQL server, MUI Css, Saas, Session, Router...
      </Typography> 
      <h3>Things you can do</h3>
      <Typography variant="subtitle1" gutterBottom component="div" >
      <SentimentSatisfiedAltIcon/>   Register/ Login as a regular user - user can see all the vacations cards and put a follow star. <br/>
      In addition, the order of the vacations in the page is by what the login user is following. <br/>
      Also, he can see in a different page only the vacations he follows.
      </Typography> 
      <Typography variant="subtitle1" gutterBottom component="div">
      <SentimentSatisfiedAltIcon/>   Login as an Admin - admin can see all the vacations cards and he can edit or delete what he wants. <br/>
      In addition, Admin can see a Report of all the vacations that have more then one follower. <br/>
     💫 The report represents the number of followers of each vacation
      </Typography> 
    </Box>
  </div>;
}
