import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Register() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [lastName, setlastName] = useState("")
    const [firstName, setfirstName] = useState("")
    const [msg, setmsg] = useState("")

    const navigate = useNavigate()

    const handleClick = async () => {
        const res = await fetch('http://localhost:2001/users/register', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                lastName,
                firstName
            }),
            credentials: "include",
        })

        const data = await res.json()

        if (data.err) {
            setmsg(data.err)
        } else {
            localStorage.username = JSON.stringify(data.user)
            navigate('/login')
        }
        console.log(data);
    }
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h1 className='headline'>Register</h1>
                <TextField sx={{ m: 0.5 }} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setusername(e.target.value)} />
                <TextField sx={{ m: 0.5 }} id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e) => setpassword(e.target.value)} />
                <TextField sx={{ m: 0.5 }} id="outlined-basic" label="firstName" variant="outlined" onChange={(e) => setfirstName(e.target.value)} />
                <TextField sx={{ m: 0.5 }} id="outlined-basic" label="lastName" variant="outlined" onChange={(e) => setlastName(e.target.value)} />
                <Button sx={{ m: 0.5 }} variant="contained" color="secondary" onClick={handleClick}>Register</Button>
                <p>{msg}</p>
                <p>Already have an account? <Link to="/login">Login now!</Link></p>
            </Box>

        </div>
    )
}
