import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Box from '@mui/material/Box';

export default function Report() {
    const [vacationsArr, setvacationsArr] = useState([]);
    const [msg, setmsg] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:2001/adminpage/forreport`, {
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
    }, []);


    return <div>
        {
            msg.length > 1 ?
                <p>{msg}</p>
                :
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        m: 2,
                        p: 2
                    }}
                >
                    
                    <Bar
                        data={{
                            labels: vacationsArr.map(v => v.location),
                            datasets: [{
                                label: 'Followers numbers',
                                data: vacationsArr.map(v => v.followersNum),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }}
                        height={300}
                        width={500}
                    />
                </Box>
        }

    </div>;
}
