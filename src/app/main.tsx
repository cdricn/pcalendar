import styles from './main.module.css';
import Calendar from './calendar/calendar';
import Schedule from './schedule/schedule';
import { handleReadRemoteFile } from './lib/data';
import { useEffect, useState } from 'react';
import type { CalendarData, ScheduleData } from './lib/interface';

export default function Main() {
  // import test data depending on month selected. Default is data from April, the 1st month
  // Pass digits to Calendar component to form its structure (DONE)
  // Make calendar component return the clicked day and pass that to main
  // Pass object data to schedule to display stuff based on selected number 
  const [data, setData] = useState<CalendarData>({});
  const [month, setMonth] = useState('APR');
  const [daysArray, setDaysArray] = useState<Array<number>>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleData[]>([])
  const [displayLoading, setDisplayLoading] = useState({
    calendar: true,
    schedule: true
  });
  
  useEffect(()=>{
    if(Object.keys(data).length === 0) {
      async function getCsvFile() {
        const CsvFile = await fetchData();
        setData(CsvFile);
        setDisplayLoading(prev=>{return {...prev, calendar: false} });
      }
      getCsvFile();
    }
    else {
      setSelectedMonth(month);
    }
  }, [data, month]);

  function getSelectedDay(returnedDay: number) {
    if(returnedDay>selectedSchedule.length) {
      setSelectedDay(30);
      console.log('overflow',selectedDay)
    }
    else {
      setSelectedDay(returnedDay);
      console.log('ok',selectedDay)
    }
  }

  function setSelectedMonth(newMonth:string) {
    setMonth(newMonth);
    const monthArray: ScheduleData[] = [];
    let days = []
    for (let i = 0; i<data[newMonth].length; i++) {
      days.push(data[newMonth][i].day_code);
      monthArray.push(data[newMonth][i]);
    }
    setSelectedSchedule(monthArray);
    setDisplayLoading(prev=>{return {...prev, schedule: false} });
    setDaysArray(days);
    //console.log(daysArray)
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
              displayLoading.calendar ? <div className={styles['loading']}></div> : 
              <Calendar data={selectedSchedule} onSelect={getSelectedDay}/>
            }
          </div>
          <div className={styles['schedule-container']}>
            { displayLoading.schedule ? null : <Schedule data={selectedSchedule[selectedDay]}/>}
          </div>
        </div>
      </div>
    </main>
  )
}
// 