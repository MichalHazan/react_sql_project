import React from 'react'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const MichalTheme = createTheme({
    palette: {
      primary: {
        main: '#311b92',
      },
    },
  });

const pages = ['Home', 'About'];
const settings = ['myVacations', 'Logout'];
export default function Header() {
    // ---------------------MUI-------------------
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // ---------------------------------------------
    // -------routing---------
    const navigate = useNavigate()
    const travelTo = (dest) => {
        navigate('/' + dest)
    }
    // -----------------------
    const logout = async () => {
        const res = await fetch('http://localhost:2001/users/logout', {
            method: "delete",
            credentials: "include",
        })

        const data = await res.json()

        if (data.err) {
            alert(data.err)
        } else {
            localStorage.clear()
            navigate('/login')
        }
        console.log(data);
    }

    return (
        <div className='header'>
             <ThemeProvider theme={MichalTheme}>
            <AppBar position="static" >
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, cursor: 'pointer', display: { xs: 'none', md: 'flex' } }}
                            onClick={() => travelTo("")}

                        >
                            Michal Hazan
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => { travelTo(page) }}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            Michal Hazan
                        </Typography>


                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() => travelTo(page)}

                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Uemy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {
                                    localStorage.username ?
                                        settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography onClick={() => {
                                                    if (setting === "Logout") {
                                                        logout()
                                                    } else {
                                                        travelTo(setting)
                                                    }
                                                }
                                                } textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))
                                        :
                                        <div>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography onClick={() => travelTo("login")}> Login </Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography onClick={() => travelTo("register")}> Register </Typography>
                                            </MenuItem>
                                        </div>

                                }

                            </Menu>
                        </Box>


                    </Toolbar>
                </Container>
            </AppBar>
            </ThemeProvider>
        </div>
    )
}
