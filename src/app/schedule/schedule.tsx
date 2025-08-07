import styles from './schedule.module.css'

export default function Schedule() {

  return (
    <div className={styles['schedule']}>
      <div className={styles['schedule-nav']}>
        <div className={styles['schedule-date']}>
          <p>8/10 Wed</p>
        </div>
        <div className={styles['schedule-filters']}>
          <div>Events</div>
          <div>Confidants</div>
          <div>Jobs</div>
          <div>Day/Night</div>
        </div>
      </div>
      <div className={styles['schedule-info']}>
        
      </div>
    </div>
  )
}
