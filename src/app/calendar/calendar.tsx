import styles from './calendar.module.css'
import type { CalendarDays } from '../lib/interface';

export default function Calendar({days} : CalendarDays) {
  let dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let currentDay = 0;

  function populateColumns() {
    let columnArray = new Array;
    let counter = days[currentDay];
    while (days[currentDay]<=7) {
      if (counter > 7) break;

      columnArray.push(
        <div className={styles['calendar-item']}
          style={{gridColumnStart: days[currentDay]}}
        >
          <p>{currentDay+1}</p>
        </div>
      );

      currentDay += 1;
      counter++;
    }
    return columnArray;
  }

  function populateRows() {
    let rowLength = days[0] == 7 ? 6 : 5;
    const calendarRows = new Array(rowLength).fill(0);
    const rows = calendarRows.map(()=>{
      return <div className={styles['calendar-row']}>{populateColumns()}</div>
    });

    return <>{rows}</>;
  }

  function populateCalendarHeader() {
    return (
      dayName.map((i, index)=>{
        return (
          <div key={i} className={styles['calendar-day']}>
            <p>{dayName[index]}</p>
          </div>
        );
      })
    );
  }
  
  return (
    <div className={styles['calendar']}>
      <div className={styles['calendar-header']}>
        {populateCalendarHeader()}
      </div>
      <div className={styles['calendar-rows-container']}>
        {populateRows()}
      </div>
    </div>
  )
}