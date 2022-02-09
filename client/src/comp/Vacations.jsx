import React, { useEffect, useState } from 'react';
import VCard from './VCard';
import Box from '@mui/material/Box';
import Login from './Login';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import AddVacation from './admin/AddVacation';


export default function Vacations() {
    const [vacationsArr, setvacationsArr] = useState([]);
    const [msg, setmsg] = useState("");
    const [update, setupdate] = useState(false);

    //------ popover-------
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // ------------------------

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:2001/vacations`, {
                credentials: "include"
            })
            const data = await res.json()
            console.log(data);
            if (data.err) {
                setmsg(data.err)
            } else {
                setvacationsArr(data)
                setmsg("")
            }
        })();
    }, [update]);

    return <div>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                m: 2
            }}
        >
            {
                msg.length > 1 ? <Login /> : vacationsArr.map(vacation => <VCard key={Math.random()} setupdate={setupdate} vacation={vacation} />)
            }
            {
                localStorage.isAdmin === "1" ?
                <Fab color="primary" aria-label="add" sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16
                }}>
                    <AddIcon aria-describedby={id} variant="contained" onClick={handleClick} />
                </Fab>
                :
                <p></p>
            }
             <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <AddVacation setupdate={setupdate} />
        </Popover>
        </Box>
    </div>;
}
