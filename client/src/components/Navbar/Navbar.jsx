import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Button, Drawer, Toolbar, Typography, Tooltip, IconButton, Menu, MenuItem, Box, InputBase } from "@mui/material";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

import { close, logo2, menu } from '../../assets';
import { navLinks } from '../../constants';
import styles from '../../style';
import { Search } from "@mui/icons-material";
import { getVideosBySearch } from "../../actions/videos";


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = () => {

  const [toggle, setToggle] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState('');

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');

        setUser(null);
        setAnchorElUser(null);
        setToggle((prev) => !prev);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
          const decodedToken = decode(token);

          if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const openProfile = () => {
      navigate(`/profile/${user?.result?.sub || user?.result?._id}`);

      setAnchorElUser(null);
      setToggle((prev) => !prev);
    };

    const openPricing = () => {
      navigate(`/pricing`);

      setAnchorElUser(null);
      setToggle((prev) => !prev);
    };

      const [state, setState] = React.useState({
        right: false,
      });
      const anchor = 'top'
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const searchPost = () => {
        if(search.trim()) {
          dispatch(getVideosBySearch({ search }));
          navigate(`/videos/search?searchQuery=${search || 'none'}`);
        } else {
          navigate("/");
        }
      }
  
      const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };
      
    
      const list = (anchor) => (
        <Box
          sx={{ width: 'auto', justifyItems: 'center' }}
          role="presentation"
          //onClick={toggleDrawer(anchor, false)}
          //onKeyDown={toggleDrawer(anchor, false)}
        >          
          <div className="bg-primary items-center justify-between sm:w-[350px] w-[300px] flex rounded-lg shadow-lg mt-4 p-2 mx-auto sticky" >
            <div>
                <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer" onClick={toggleDrawer(anchor, false)}>
                    <svg className="h-4 w-4 text-gray-500 rotate-90 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <input className="font-bold rounded-full w-full py-2 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Search" onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)}/>
                <div className="bg-gray-600 p-2 hover:bg-secondary cursor-pointer mx-2 rounded-full" onClick={searchPost}>
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </Box>
      );

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <nav className="w-full flex py-6 justify-between items-center navbar">
        <Link to="/">
          <img src={logo2} alt="surge" className="w-[134px] h-[62px]"/>
          </Link>

          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <li>
              <Link to="/" className="font-poppins font-normal cursor-pointer mr-10 text-[16px] text-white hover:text-violet-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/videos" className="font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white hover:text-violet-600">
                Videos
              </Link>
            </li>            
            <li>
              <Link to="/channels" className="font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white hover:text-violet-600">
                Channels
              </Link>
            </li>            
            <Toolbar>
            <IconButton size="large" aria-label="search" color="white" sx={{ marginRight: 2 }} onClick={toggleDrawer(anchor, true)}>
              <Search />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              PaperProps={{
                sx: {
                  backgroundColor: "rgba(30, 30, 30, 0.9)",
                  alignItems: "center",
                  p: 2
                }
              }}
              variant="persistent"
            >
              {list(anchor)}
            </Drawer>
                {user ?(
                    <div className="flex space-x-4">
                        {/* <Avatar alt={user.result.name} sx={{ width: '1.5em', height: '1.5em' }} src= {user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography style={{color: 'white', fontFamily: 'poppins', display: 'flex', alignItems: 'center',}} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className="bg-purple-700" onClick={logout} >Logout</Button> */}
                        <Box sx={{ flexGrow: 0 }}>
                          <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                              <Avatar alt="{user.result.name}" src={user.result.picture} sx={{ bgcolor: '#aa00ff' }} >{user.result.name.charAt(0)}</Avatar>
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
                            
                              <MenuItem key="Profile" onClick={openProfile}>
                                <Typography textAlign="center">Profile</Typography>
                              </MenuItem>

                              <MenuItem key="Pricing" onClick={openPricing}>
                                <Typography textAlign="center">Promotions</Typography>
                              </MenuItem>

                              <MenuItem key="Logout" onClick={logout}>
                                <Typography textAlign="center">Logout</Typography>
                              </MenuItem>
                            
                          </Menu>
                        </Box>
                    </div>
                ) : (
                  <Link to="/auth">
                    <button className={`py-2 px-4 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none ${styles} rounded-[10px]`}>Sign in</button>
                  </Link>
                )}
            </Toolbar>
          </ul>
            {/* {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} ${index === navLinks.length - 1 ? 'text-secondary' : 'text-white'} `}
              >
                <a href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))} 
          </ul> */}          
          <div className="sm:hidden flex flex-1 justify-end items-center">
          <IconButton size="large" aria-label="search" color="white" sx={{ marginRight: 2 }} onClick={toggleDrawer(anchor, true)}>
              <Search />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              PaperProps={{
                sx: {
                  backgroundColor: "rgba(30, 30, 30, 0.9)",
                  alignItems: "center",
                  p: 2
                }
              }}
              variant="persistent"
            >
              {list(anchor)}
            </Drawer>
            <img 
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle((prev) => !prev)} 
            />

            <div
              className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-20`}
            >
              <ul className="list-none flex flex-col justify-end items-center flex-1">
                <li className="mb-4">
                  <Link to="/" onClick={() => setToggle((prev) => !prev)} className="font-poppins font-normal cursor-pointer text-[16px] text-white hover:text-violet-600">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/videos" onClick={() => setToggle((prev) => !prev)} className="font-poppins font-normal cursor-pointer mb-4 text-[16px] text-white hover:text-violet-600">
                    Videos
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/channels" onClick={() => setToggle((prev) => !prev)} className="font-poppins font-normal cursor-pointer mb-4 text-[16px] text-white hover:text-violet-600">
                    Channels
                  </Link>
                </li>
                <li>
                    {user ?(
                      
                        <div className="flex flex-col items-center ">
                          <Link to={`/profile/${user?.result?.sub || user?.result?._id}`} onClick={() => setToggle((prev) => !prev)} className="font-poppins font-normal justify-center cursor-pointer mb-4 text-[16px] text-white hover:text-violet-600">
                            My Profile
                          </Link>
                          <Link to={`/pricing`} onClick={() => setToggle((prev) => !prev)} className="font-poppins font-normal justify-center cursor-pointer mb-4 text-[16px] text-white hover:text-violet-600">
                            Promotions
                          </Link>
                          <Button variant="contained" sx={{bgcolor: '#aa00ff'}} onClick={logout} >Logout</Button> 
                            {/* <Avatar alt={user.result.name} src= {user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                            <Typography style={{display: 'flex', alignItems: 'center',}} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className="bg-purple-700" onClick={logout} >Logout</Button> */}
                        </div>
                    ) : (
                      <Link to="/auth" onClick={() => setToggle((prev) => !prev)} className={` font-poppins font-medium text-[16px] text-secondary`}>
                        Sign in
                      </Link>
                    )}
                </li>
              </ul>

            </div>

          </div>

        </nav>
      </div>
    </div>
  )
}

export default Navbar