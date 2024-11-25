'use client'

import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DeleteProjectModalForm } from '@/components/Modals'
import Link from 'next/link'

type Props = {
  projectId: number
  projectName: string
}

function TeacherProjectMenu(Props: Props) {
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
        id="project-menu-button"
        aria-controls={open ? 'project-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon className="text-primary1 focus:bg-slate-200" />
      </Button>
      <Menu
        id="project-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="z-0"
        MenuListProps={{
          'aria-labelledby': 'project-menu-button',
        }}
      >
        <MenuItem className="text-primary1">
          <Link href={`pre-project/update/${Props.projectId}`}>
            <EditIcon fontSize="small" className="mr-1" />
            แก้ไข
          </Link>
        </MenuItem>

        <DeleteProjectModalForm handleClose={handleClose} projectInfo={Props}>
          <MenuItem className="text-red-500">
            <DeleteIcon fontSize="small" className="mr-1" />
            ลบ
          </MenuItem>
        </DeleteProjectModalForm>
      </Menu>
    </div>
  )
}

export default TeacherProjectMenu
