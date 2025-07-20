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
  let currIndex = 0;


  function populateColumns() {
    let colArr = new Array;
    for (let i=0; i<7; ++i) {
      if (!testData[currIndex]) {
        break;
      }

      if (testData[currIndex].digit==i+1) {
        colArr.push(
          <div className={styles['test']}>{currIndex+1}</div>
        )
        currIndex += 1;
      } else {
        colArr.push(
          <div className={styles['test2']}></div>
        )
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
        <div className={styles['test']}>Sun</div>
        <div className={styles['test']}>Mon</div>
        <div className={styles['test']}>Tue</div>
        <div className={styles['test']}>Wed</div>
        <div className={styles['test']}>Thu</div>
        <div className={styles['test']}>Fri</div>
        <div className={styles['test']}>Sat</div>
      </div>
      <div className={styles['calendar-rows']}>
        {populateRows()}
      </div>
    </div>
  )
}