import styles from './main.module.css'
import Calendar from './calendar/calendar'
import Schedule from './schedule/schedule'
import { fetchCalendarData } from './lib/data'
import { testData } from './calendar/testData'
import { useState } from 'react'

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

  function handleTest(e:any) {

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
          </div>
          <div className={styles['schedule-container']}>
            <Schedule />
          </div>
        </div>
      </div>
    </main>
  )
}
