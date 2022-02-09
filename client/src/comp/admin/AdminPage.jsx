import React from 'react';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

export default function AdminPage() {


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
            <h1 className='headline'>Admin page</h1>
            <Typography variant="subtitle1" gutterBottom component="div">
                You can edit or delete vactions <br/>
                Also, you can add a new vacation by clicking on the (+) button at "All Vacations" page
            </Typography>
            <ButtonGroup sx={{m:3}} variant="contained" size="large" color="secondary" aria-label="outlined primary button group">
                <Button><Link to="/report" style={{ textDecoration: 'none', color: 'white' }}>Report</Link></Button>
                <Button><Link to="/Vacations" style={{ textDecoration: 'none', color: 'white' }}>All Vacations</Link></Button>
            </ButtonGroup>
            <Typography variant="subtitle1" gutterBottom component="div">
            The report represents the number of followers of each vacation
            </Typography>

        </Box>
    </div>;
}
