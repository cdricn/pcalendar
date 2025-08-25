import styles from './main.module.css';
import Calendar from './calendar/calendar';
import Schedule from './schedule/schedule';
import { handleReadRemoteFile } from './lib/data';
import { useEffect, useState } from 'react';
import type { CalendarData } from './lib/interface';

export default function Main() {
  // import test data depending on month selected. Default is data from April, the 1st month
  // Pass digits to Calendar component to form its structure (DONE)
  // Make calendar component return the clicked day and pass that to main
  // Pass object data to schedule to display stuff based on selected number 
  const [data, setData] = useState<CalendarData[]>([]);
  const [month, setMonth] = useState('APR');
  const [daysArray, setDaysArray] = useState<Array<number>>([]);
  const [selectedDay, setSelectedDay] = useState(0)
  
  const monthArray: CalendarData[] = [];

  function getSelectedDay(returnedDay: number) {
    setSelectedDay((prev)=>prev = returnedDay)
    console.log(returnedDay)
  }

  useEffect(()=>{
    if(data.length === 0) {
      async function getCsvFile() {
        const CsvFile = await fetchData();
        setData(CsvFile);
      }
      getCsvFile();
    }
    else {
      setSelectedMonth(month);
    }
  }, [data, month]);

  function setSelectedMonth(newMonth:string) {
    setMonth(newMonth);
    let days = []
    for (let i = 0; i<data.length; i++) {
      if(data[i].month === month) {
        days.push(data[i].day_code);
        monthArray.push(data[i]);
      }
    }
    setDaysArray(days);
    console.log(monthArray);
  }

  function populateMonths() {
    const months = [
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
      'JAN',
      'FEB',
      'MAR'
    ];
    return months.map((i, index)=>{
      return (
        <li key={index} onClick={()=>setSelectedMonth(i)}>{i}</li>
      );
    });
  }

  async function fetchData() {
    return await handleReadRemoteFile()
  }

  return (
    <main className={styles['main-container']}>
      <div className={styles['main-wrapper']}>
        <h1>Calendar</h1>
        <div className={styles['content-wrapper']}>
          <div className={styles['calendar-container']}>
            <ul className={styles['calendar-months']}>
              {populateMonths()}
            </ul>
            { 
              data.length > 0 ? <Calendar days={daysArray} onSelect={getSelectedDay}/> : 
              <div className={styles['loading']}></div>
            }
          </div>
          <div className={styles['schedule-container']}>
            { data.length > 0 ? <Schedule data={data[selectedDay]}/> : null }
          </div>
        </div>
      </div>
    </main>
  )
}
