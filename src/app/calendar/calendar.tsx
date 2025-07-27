import styles from './calendar.module.css'
import { testData } from './testData';

export default function Calendar() {
  let currentDay = 0;

  function populateColumns() {
    let colArr = new Array;
    for (let i=0; i<7; ++i) {
      if (!testData[currentDay]) {
        break;
      }

      if (testData[currentDay].day_code==i+1) {
        colArr.push(
          <div className={styles['calendar-item']}
            style={{gridColumnStart: testData[currentDay].day_code}}
          >
            <p>{currentDay+1}</p>
          </div>
        )
        currentDay += 1;
      }
    }
    
    return colArr
  }

  function populateRows() {
    let rowSize = testData[0].day_code == 7 ? 6 : 5
    const row = new Array(rowSize).fill(0)
    const rows = row.map(()=>{
      return <div className={styles['calendar-row']}>{populateColumns()}</div>
    })

    return <>{rows}</>
  }
  
  return (
    <div className={styles['calendar']}>
      <div className={styles['calendar-days']}>
        <div className={styles['calendar-day']}><p>Sun</p></div>
        <div className={styles['calendar-day']}><p>Mon</p></div>
        <div className={styles['calendar-day']}><p>Tue</p></div>
        <div className={styles['calendar-day']}><p>Wed</p></div>
        <div className={styles['calendar-day']}><p>Thu</p></div>
        <div className={styles['calendar-day']}><p>Fri</p></div>
        <div className={styles['calendar-day']}><p>Sat</p></div>
      </div>
      <div className={styles['calendar-rows-container']}>
        {populateRows()}
      </div>
    </div>
  )
}