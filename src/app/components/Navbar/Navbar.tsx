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
    <nav className="flex justify-between items-center w-full top-0 border-b px-20 py-3 border-gray-200 dark:border-gray-300">
      {/* <div className="flex justify-between mx-left-20 p-4 bg-red-500"> */}
        <a href='/#' className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="md:text-xl font-semibold whitespace-nowrap dark:text-primary1">Project Management System</span>
        </a>
      <div className="flex items-center rtl:space-x-reverse ml-auto">
      <span className='md:text-sm'>
      <Button className='text-primary2-400 bg-primary2-100'>Login/เข้าสู่ระบบ</Button>
      </span>
      </div>
      {/* </div> */}
    </nav>
  );
}
