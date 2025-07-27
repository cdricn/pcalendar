import styles from './main.module.css'
import Calendar from './calendar/calendar'
import Schedule from './schedule/schedule'

export default function Main() {

  return (
    <main className={styles['content-container']}>
      <div className={styles['calendar-container']}>
        <ul className={styles['calendar-months']}>
          <li>APR</li>
          <li>MAY</li>
          <li>JUN</li>
          <li>JUL</li>
          <li>AUG</li>
          <li>SEP</li>
          <li>OCT</li>
          <li>NOV</li>
          <li>DEC</li>
          <li>JAN</li>
          <li>FEB</li>
          <li>MAR</li>
        </ul>
        <Calendar />
      </div>
      <div className={styles['schedule-container']}>
        <Schedule />
      </div>
    </main>
  )
}
