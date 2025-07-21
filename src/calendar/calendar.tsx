import styles from './calendar.module.css'

export default function Calendar() {

  const testData = [
    {day: 'thu',
     digit: 5},
    {day: 'fri',
     digit: 6},
    {day: 'sat',
     digit: 7},
    {day: 'sun',
     digit: 1},
    {day: 'mon',
     digit: 2},
    {day: 'tue',
     digit: 3},
    {day: 'wed',
     digit: 4},
    {day: 'thu',
     digit: 5},
    {day: 'fri',
     digit: 6},
    {day: 'sat',
     digit: 7},
    {day: 'sun',
     digit: 1},
    {day: 'mon',
     digit: 2},
    {day: 'tue',
     digit: 3},
    {day: 'wed',
     digit: 4},
  ]
 
  // create temp array of size 7 with no values
  // get first index of test data
  // slice using digit of 1st index as start, and digit-7 as end
  // fill temp array with the sliced array 
  let currentDay = 0;


  function populateColumns() {
    let colArr = new Array;
    for (let i=0; i<7; ++i) {
      if (!testData[currentDay]) {
        break;
      }

      if (testData[currentDay].digit==i+1) {
        colArr.push(
          <div className={styles['calendar-item']}
            style={{gridColumnStart: testData[currentDay].digit}}
          >
            {currentDay+1}
          </div>
        )
        currentDay += 1;
      }
    }

    console.log(colArr)
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