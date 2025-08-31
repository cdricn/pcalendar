import type { ScheduleDataObject } from '../lib/interface'
import styles from './schedule.module.css'
import { useState } from 'react'

export default function Schedule({data} : ScheduleDataObject) {
  const [filter, setFilter] = useState<FilterKeys>('events');
  const [selectedFilter, setSelectedFilter] = useState('eventId');
  const [target, setTarget] = useState()
  type FilterKeys = 'city' | 'events' | 'confidant_events';
  let events : FilterKeys = 'events';
  let confidant : FilterKeys = 'confidant_events';
  let city : FilterKeys = 'city';

  function handleClick(e:FilterKeys, target:any) {
    setFilter(e);
    setSelectedFilter(target.target.id);
    setTarget(target)
    console.log(target);
  }

  function scheduleDisplay() {
    if(data[filter]) {
      return <p>{data[filter]}</p>;
    } else {
      return <p>No entry.</p>;
    }
  }

  let elementWidth = document.getElementById(selectedFilter)?.offsetWidth;
  let elementHeight = document.getElementById(selectedFilter)?.offsetHeight;
  if (elementHeight) { elementHeight = elementHeight - 10; }

  const highlightOnClick = {
    width: elementWidth,
    height: elementHeight,
    backgroundColor: 'red'
  }

  return (
    <div className={styles['schedule']}>
      <div className={styles['schedule-nav']}>
        <div className={styles['schedule-date']}>
          <p>{data.monthCode}/{data.day}</p>
        </div>
        <div className={styles['schedule-filters']}>
          <div className={styles['filter-highlight']} style={highlightOnClick}></div>
          <div id={'eventId'} className={styles['filter-button']}
            onClick={(target)=>handleClick(events, target)}>Events</div>
          <div id={'confidantId'} className={styles['filter-button']} 
            onClick={(target)=>handleClick(confidant, target)}>Confidants</div>
          <div id={'cityId'} className={styles['filter-button']}
            onClick={(target)=>handleClick(city, target)}>City</div>
          <div>Day/Night</div>
        </div>
      </div>
      <div className={styles['schedule-info']}>
        {scheduleDisplay()}
      </div>
    </div>
  )
}
