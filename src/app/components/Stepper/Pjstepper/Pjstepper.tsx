'use client'
import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'
import Box from '@mui/material/Box';

const steps = [
      'ใบขอสอบ2.0',
      'ใบซ้อมนำเสนอ3.0',
      'ใบประเมินคณะกรรมการ4.0',
      'ใบส่งชิ้นงาน5.0',
      'ส่งปริญญานิพนธ์'
  ];
type Props = {
    step: number
  }
  const ProjCard = ({ step }: Props) => {
    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Box>
    )
  }