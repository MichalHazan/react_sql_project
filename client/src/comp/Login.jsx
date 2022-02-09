import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [msg, setmsg] = useState("")

    const navigate = useNavigate()

    const handleClick = async () => {
        const res = await fetch('http://localhost:2001/users/login', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            }),
            credentials: "include",
        })

        const data = await res.json()
        console.log(data);
        if (data.err) {
            setmsg(data.err)
        } else {

            localStorage.username = JSON.stringify(data.user)
            localStorage.isAdmin = JSON.stringify(data.user[0].isAdmin)
            navigate('/')
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
                <h1>Login</h1>

                <TextField sx={{ m: 1 }} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setusername(e.target.value)} />


                <TextField sx={{ m: 1 }} id="outlined-basic" label="Password" type="password" variant="outlined" onChange={(e) => setpassword(e.target.value)} />

                <Button variant="contained" sx={{ m:1 }} color="secondary" onClick={handleClick}>Login</Button>
                <p>{msg}</p>
                <p>Don`t you have an account? <Link to="/register">Register now!</Link></p>
            </Box>
        </div>
    )
}
