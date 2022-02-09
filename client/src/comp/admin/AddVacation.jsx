import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function AddVacation({ setupdate }) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [price, setPrice] = useState("");
  const [dateGo, setDateGo] = useState("");
  const [dateBack, setDateBack] = useState("");

  const [msg, setmsg] = useState("");



  const addVac = async () => {

    console.log("in update");

    const resU = await fetch(`http://localhost:2001/adminpage/add`, {
      method: "post",
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      credentials: "include",
      body: JSON.stringify({ description, location, picture, dateGo, dateBack, price })


    })
    const dataU = await resU.json()
    console.log(dataU);
    if (dataU.err) {
      setmsg(dataU.err)
    } else {
      setmsg("added")
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
      <h1 className='headline'>Add New Vacation</h1>
      <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={location.toString()} label="Location" variant="outlined" onChange={(e) => setLocation(e.target.value)} />
      <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={description.toString()} label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)} />
      <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={picture.toString()} label="Picture" variant="outlined" onChange={(e) => setPicture(e.target.value)} />
      <TextField sx={{ m: 0.5 }} type="number" id="outlined-basic" placeholder={price.toString()} label="Price" variant="outlined" onChange={(e) => setPrice(e.target.value)} />
      <TextField sx={{ m: 0.5, p: 2 }} type="date" id="outlined-basic" placeholder={dateGo} label="Go" variant="outlined" onChange={(e) => setDateGo(e.target.value)} />
      <TextField sx={{ m: 0.5, p: 2 }} type="date" id="outlined-basic" placeholder={dateBack} label="Back" variant="outlined" onChange={(e) => setDateBack(e.target.value)} />

      <Button variant="contained" onClick={addVac}>Add</Button>
      <p>{msg}</p>

    </Box>

  </div>;
}

