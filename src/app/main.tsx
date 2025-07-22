import Calendar from './calendar/calendar'
import Schedule from './schedule/schedule'

export default function Main() {

  return (
    <main className='content-container'>
      <div className='calendar-container'>
        <Calendar />
      </div>
      <div className='schedule-container'>
        <Schedule />
      </div>
    </main>
  )
}
