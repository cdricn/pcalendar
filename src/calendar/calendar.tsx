import styles from './calendar.module.css'

export default function Calendar() {

  const testData = [
    {day: 5},
    {day: 6},
    {day: 7},
    {day: 1},
    {day: 2},
    {day: 3},
    {day: 4},
    {day: 5},
    {day: 6},
    {day: 7},
    {day: 1},
    {day: 2},
    {day: 3},
    {day: 4},
  ]

  const row = new Array(5).fill(0)
  let count = 0;

  function populateColumns() {
    let tempArr = new Array;

    while(count < testData.length) {

      for (let col=0; col<7; ++col) {
        if (testData[col].day > 7) {
          break;
        }
        count += 1;
        
        tempArr.push(
          <div className={styles['test']}
            style={{gridColumn: testData[col].day}}
          >
            {count}
          </div>
        )
      }
    }
    return tempArr
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
        {
          row.map(()=>{
            return (
              <div className={styles['calendar-columns']}>
                {populateColumns()}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}