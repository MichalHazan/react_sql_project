import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function UpdateVacation({ vacation, setupdate }) {

    const [description, setDescription] = useState(vacation.description);
    const [location, setLocation] = useState(vacation.location);
    const [picture, setPicture] = useState(vacation.picture);
    const [price, setPrice] = useState(vacation.price);
    const [dateGo, setDateGo] = useState("");
    const [dateBack, setDateBack] = useState("");

    const [msg, setmsg] = useState("");



    const updateVac = async () => {
        const resU = await fetch(`http://localhost:2001/adminpage/update/${vacation.id}`, {
            method: "put",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            credentials: "include",
            body: JSON.stringify({ description, location, picture, dateGo, dateBack, price })


        })
        const dataU = await resU.json()
        console.log(dataU);
        if (dataU.error) {
            setmsg("somethong went wrong")
        } else {
            setmsg("update")
            setupdate(up => !up)
        }

    }
    return <div>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1 className='headline'>Edit</h1>
            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={location.toString()} label="Location" variant="outlined" onChange={(e) => setLocation(e.target.value)} />
            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={description.toString()} label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)} />
            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={picture.toString()} label="Picture" variant="outlined" onChange={(e) => setPicture(e.target.value)} />
            <TextField sx={{ m: 0.5 }} type="number" id="outlined-basic" placeholder={price.toString()} label="Price" variant="outlined" onChange={(e) => setPrice(e.target.value)} />
            <TextField sx={{ m: 0.5, p: 2 }} type="date" id="outlined-basic" label="Go" variant="outlined" onChange={(e) => setDateGo(e.target.value)} />
            <TextField sx={{ m: 0.5, p: 2 }} type="date" id="outlined-basic" label="Back" variant="outlined" onChange={(e) => setDateBack(e.target.value)} />

            <Button variant="contained" onClick={updateVac}>Update</Button>
            <p>{msg}</p>

        </Box>

    </div>;
}
