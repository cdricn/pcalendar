import type { CalendarData } from './interface'
import { readRemoteFile } from 'react-papaparse'


export function handleReadRemoteFile() {
  return new Promise<CalendarData[]>((resolve, reject)=>
    readRemoteFile('https://raw.githubusercontent.com/cdricn/pcalendar/refs/heads/main/src/app/assets/data/P5RCalendar.csv', 
      {
        download: true,
        header: true,
        complete: (results : any) => {
          const newData = formatMonth(results.data);
          resolve(newData);
        },
        error: (error: Error) => {
          console.log('Could not download data:', error);
          reject(error);
        }
      }
    )
  )
};

function formatMonth(data: CalendarData[]) {
  const monthMap : { [key: string] : string } = {
    'april': 'APR',
    'may': 'MAY',
    'june': 'JUN',
    'july': 'JUL',
    'august': 'AUG',
    'september': 'SEP',
    'october': 'OCT',
    'november': 'NOV',
    'december': 'DEC',
    'january': 'JAN',
    'february': 'FEB',
    'march': 'MAR',
  }

  return (
    data.map((item, index) => {
      const formattedMonth = monthMap[data[index].month];
      return {
        ...item,
        month: formattedMonth,
      }
    })
  )

}