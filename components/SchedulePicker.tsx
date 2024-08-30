import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function SchedulePicker() {
    const saveDate = () => {
        console.log('date saved')
    }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label="Schedule Service" />
      </DemoContainer>
      <button className='blue p-2 text-white' onClick={saveDate}>Save Date</button>
    </LocalizationProvider>
  );
}
