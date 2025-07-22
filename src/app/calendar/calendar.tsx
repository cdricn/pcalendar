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
            {currentDay+1}
          </div>
        )
        currentDay += 1;
      }
    }
    
    return colArr
  }

  function populateRows() {
    const row = new Array(5).fill(0)
    const rows = row.map(()=>{
      return <div className={styles['calendar-columns']}>{populateColumns()}</div>
    })

    return <>{rows}</>
  }
  
  return (
    <div className={styles['calendar-container']}>
      <div className={styles['calendar-days']}>
        <div className={styles['calendar-item']}>Sun</div>
        <div className={styles['calendar-item']}>Mon</div>
        <div className={styles['calendar-item']}>Tue</div>
        <div className={styles['calendar-item']}>Wed</div>
        <div className={styles['calendar-item']}>Thu</div>
        <div className={styles['calendar-item']}>Fri</div>
        <div className={styles['calendar-item']}>Sat</div>
      </div>
      <div className={styles['calendar-rows']}>
        {populateRows()}
      </div>
    </div>
  )
}