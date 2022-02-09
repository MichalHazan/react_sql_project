import React, { useEffect, useState } from 'react';
import Card from './VCard';
import Box from '@mui/material/Box';

export default function MyVacations() {
    const [vacationsArr, setvacationsArr] = useState([]);
    const [msg, setmsg] = useState("");
    const [update, setupdate] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:2001/vacations/myvacations`, {
                credentials: "include"
            })
            const data = await res.json()
            console.log(data);
            if (data.err) {
                setmsg(data.err)
            } else {
                setvacationsArr(data)
                if (data.length < 1) {
                    setmsg("You don`t follow any vacation")
                } else{ setmsg("")
            }

            }
        })();
    }, [update]);

    return <div>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
        >
            <p>{msg}</p>
            {
                vacationsArr.map(vacation => <Card key={Math.random()} setupdate={setupdate} vacation={vacation} />
                )
            }
        </Box>
    </div>;
}
