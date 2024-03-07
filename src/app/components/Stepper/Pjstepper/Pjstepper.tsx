import { Stepper, Step, StepLabel } from '@mui/material'

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
        <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    )
  }