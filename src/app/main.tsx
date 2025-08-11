import styles from './main.module.css';
import Calendar from './calendar/calendar';
import Schedule from './schedule/schedule';
import { handleReadRemoteFile } from './lib/data';
import { useEffect, useState } from 'react';
import type { CalendarData } from './lib/interface';

export default function Main() {
  // import test data depending on month selected. Default is data from April, the 1st month
  // Pass digits to Calendar component to form its structure
  // Pass object data to schedule to display stuff based on selected number 
  const [data, setData] = useState<CalendarData[]>([]);
  const [month, setMonth] = useState('APR');
  const [daysArray, setDaysArray] = useState<Array<number>>([]);

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
    for (let i = 0; i<data.length; i++) {
      if(data[i].month === month) {
      }
    }
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
              data.length > 0 ? <Calendar days={[0]}/> : 
              <div className={styles['loading']}></div>
            }
          </div>
          <div className={styles['schedule-container']}>
            { data.length > 0 ? <Schedule data={data[0]}/> : null }
          </div>
        </div>
      </div>
    </main>
  )
}
