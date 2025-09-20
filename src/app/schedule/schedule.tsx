import type { ScheduleDataObject } from '../lib/interface'
import styles from './schedule.module.css'
import HighlightBox from '../animations/highlightBox';
import { useState } from 'react'

type FilterKeys = 'city' | 'events' | 'confidant_events';

export default function Schedule({data} : ScheduleDataObject) {
  const [filter, setFilter] = useState<FilterKeys>('events');
  const [selectedFilter, setSelectedFilter] = useState('');
  
  function handleClick(e:React.MouseEvent<HTMLDivElement>) {
    let id : FilterKeys = e.currentTarget.getAttribute("id")! as FilterKeys;
    setFilter(id);
    setSelectedFilter(id);
  }

  function scheduleDisplay() {
    return data[filter] ? <p>{data[filter]}</p> : <p>No entry.</p>
  }

  return (
    <div className={styles['schedule']}>
      <div className={styles['schedule-nav']}>
        <div className={styles['schedule-date']}>
          <p>{data.monthCode}/{data.day}</p>
        </div>
        <div className={styles['schedule-filters']}>
          <HighlightBox target={selectedFilter} />
          <div id={'eventId'} 
            className={styles['filter-button']}
            onClick={handleClick}>
              Events
          </div>
          <div id={'confidantId'} 
            className={styles['filter-button']} 
            onClick={handleClick}>
              Confidants
          </div>
          <div id={'cityId'} 
            className={styles['filter-button']}
            onClick={handleClick}>
              World
          </div>
          <div>Day/Night</div>
        </div>
      </div>
      <div className={styles['schedule-info']}>
        {scheduleDisplay()}
      </div>
    </div>
  )
}
