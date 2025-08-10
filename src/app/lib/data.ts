import type { CalendarData } from './interface'
import { readRemoteFile } from 'react-papaparse'


export function handleReadRemoteFile() {
  return new Promise<CalendarData[]>((resolve, reject)=>
    readRemoteFile('https://raw.githubusercontent.com/cdricn/pcalendar/refs/heads/main/src/app/assets/data/P5RCalendar.csv', 
      {
        download: true,
        header: true,
        complete: (results : any) => {
          /* Test 
          console.log('---------------------------');
          console.log('Results:', results);
          console.log('---------------------------');
          */
          resolve(results.data)
        },
        error: (error: Error) => {
          console.log('Could not download data:', error)
          reject(error)
        }
      }
    )
  )
};