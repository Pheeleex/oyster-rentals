import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface DatePickerWithDynamicDotsProps {
  field: any;
  bookings: Date[]; // Array of booked dates
}

const DynamicDatePicker: React.FC<DatePickerWithDynamicDotsProps> = ({ field, bookings }) => {
  // Function to check how many bookings exist for the selected day
  const getBookingCountForDate = (date: Date) => {
    return bookings.filter(booking => booking.toDateString() === date.toDateString());
  };

  // In render, ensure dots don't exceed 4
  return (
    <div className="date-picker-with-dots">
      <DatePicker
        selected={field.value ? new Date(field.value) : new Date()}
        onChange={date => field.onChange(date)}
        dayClassName={date => {
          const bookingCount = getBookingCountForDate(date).length;
          return bookingCount > 0 ? 'has-bookings' : '';
        }}
        renderDayContents={(day, date) => {
          const bookingCount = getBookingCountForDate(date);
          return (
            <div className="day-with-dots">
              <span>{day}</span>
              <div className="dots-container">
                {bookingCount.slice(0, 4).map((_, index) => (
                  <span key={index} className="dot"></span>
                ))}
              </div>
            </div>
          );
        }}
        className="custom-datepicker"
      />
    </div>
  );
};

export default DynamicDatePicker;
