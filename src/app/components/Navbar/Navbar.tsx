import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar() {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href='/#' className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center md:text-xl font-semibold whitespace-nowrap dark:text-primary1">Project Management System</span>
        </a>
      </div>
      <div className="flex items-center space-x-6 rtl:space-x-reverse">
      <Button className='text-primary2-400 bg-primary2-100 right-5'>Login/เข้าสู่ระบบ</Button> 
        </div>
    </nav>

    // <Box sx={{ flexGrow: 1 ,display: 'flex', justifyContent: 'flex-end'}}>
    //   <AppBar position="static">
    //     <Toolbar>
    //     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //       <div className="hidden lg:flex lg:gap-x-12">
    //         <a href="/#" className="text-3xl leading-6 text-primary2-100 left-5">Project Management System</a>
    //       </div>
    //     </Typography>
    //     <Button className='text-primary2-400 bg-primary2-100 right-5'>Login/เข้าสู่ระบบ</Button>     
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}
