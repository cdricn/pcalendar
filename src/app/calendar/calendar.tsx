import styles from './calendar.module.css'
import HighlightBox from '../animations/highlightBox';
import type { CalendarDays, ScheduleData } from '../lib/interface';
import { useEffect, useState } from 'react';

export default function Calendar({data, onSelect} : CalendarDays) {
  const [selectedDay, setSelectedDay] = useState('');
  const [highlightedItem, setHighlightedItem] = useState({id: '', rowIndex: ''});
  const [currentSchedule, setCurrentSchedule] = useState<ScheduleData[]>([]);
  let dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let currentDay = 0;
  useEffect(()=>{
    if (!(Object.keys(data).length === 0)) {
      setCurrentSchedule(data);
    }
  }, [data]); 

  function handleClick(e:React.MouseEvent<HTMLDivElement>) {
    let id = e.currentTarget.getAttribute("id")!;
    let rowIndex = e.currentTarget.getAttribute("data-id")!;
    setHighlightedItem({id: id, rowIndex: rowIndex});
    onSelect(Number(id));
  }

  function populateColumns(index:number) {
    let columnArray = new Array;
    if (currentSchedule.length > 0) {
      let counter = currentSchedule[currentDay].day_code;

      while (currentSchedule[currentDay].day_code <= 7) {
        if (counter > 7) break;
        columnArray.push(
          <div key={currentDay}
            id={(currentDay).toString()}
            data-id={index}
            className={styles['calendar-item']}
            style={{gridColumnStart: currentSchedule[currentDay].day_code}}
            onClick={handleClick}
          >
            <p>{currentSchedule[currentDay].day}</p>
          </div>
        );

        if (currentDay < currentSchedule.length-1) {
          currentDay++;
        } else {
          break;
        }
        counter++;
      }
    }
    
    return columnArray;
  }

  function populateRows() {
    let maxRows;
    let rowLength;
    if (currentSchedule.length > 0) {
      rowLength = currentSchedule[0].day_code == 7 ? maxRows = 6 : maxRows = 5;
    }
    const calendarRows = new Array(rowLength).fill(0);
    const rows = calendarRows.map((_, index)=>{
      return <div key={index} className={styles['calendar-row']}>{populateColumns(index)}</div>
    });

    return <>{rows}</>;
  }

  function populateCalendarHeader() {
    return (
      dayName.map((i, index)=>{
        return (
          <div key={i} className={styles['calendar-day']} 
            onClick={()=>setSelectedDay(dayName[index])}>
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
        <HighlightBox id={highlightedItem.id} rowIndex={highlightedItem.rowIndex}/>
        {populateRows()}
      </div>
    </div>
  )
}