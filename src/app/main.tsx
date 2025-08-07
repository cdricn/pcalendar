import styles from './main.module.css'
import Calendar from './calendar/calendar'
import Schedule from './schedule/schedule'
import { fetchCalendarData } from './lib/data'
import { useEffect, useState } from 'react'
import { readRemoteFile, usePapaParse } from 'react-papaparse'

export default function Main() {
  // import test data depending on month selected. Default is data from April, the 1st month
  // Pass digits to Calendar component to form its structure
  // Pass object data to schedule to display stuff based on selected number 
  const [data, setData] = useState([])
  const [month, setMonth] = useState('APR')

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
    ]
    return months.map((i, index)=>{
      return (
        <li key={index} onClick={()=>setSelectedMonth(i)}>{i}</li>
      )
    })
  }
  
  function setSelectedMonth(e:string) {
    setMonth(e)
    console.log(month)
  }

  const handleReadRemoteFile = () => {
    readRemoteFile('https://raw.githubusercontent.com/cdricn/pcalendar/refs/heads/main/src/app/assets/data/P5RCalendar.csv', {
      download: true,
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
      },
    });
  };

  

  return (
    <main className={styles['main-container']}>
      <div className={styles['main-wrapper']}>
        <h1 onClick={()=>handleReadRemoteFile()}>Calendar</h1>
        <div className={styles['content-wrapper']}>
          <div className={styles['calendar-container']}>
            <ul className={styles['calendar-months']}>
              {populateMonths()}
            </ul>
            {/*<Calendar />*/}
          </div>
          <div className={styles['schedule-container']}>
            <Schedule />
          </div>
        </div>
      </div>
    </main>
  )
}
