'use client'

import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { UpdateUserModalForm, DeleteUserModalForm } from '@/components/Modals'

type Props = {
  userId: string
  userName: string
}

function UserMenu(Props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon className="text-primary1 focus:bg-slate-200" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="z-0"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <UpdateUserModalForm handleClose={handleClose} userId={Props.userId}>
          <MenuItem className="text-primary1">
            <EditIcon fontSize="small" className="mr-1" />
            แก้ไข
          </MenuItem>
        </UpdateUserModalForm>

        <DeleteUserModalForm handleClose={handleClose} userInfo={Props}>
          <MenuItem className=" text-red-500">
            <DeleteIcon fontSize="small" className="mr-1" />
            ลบ
          </MenuItem>
        </DeleteUserModalForm>
      </Menu>
    </div>
  )
}

export default UserMenu