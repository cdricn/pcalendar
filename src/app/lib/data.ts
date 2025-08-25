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
          storeMonths(newData)
          resolve(newData);
          //IMPORTANT: When  you get the data, sort through all of it and put 
          //each month in an array. This way, you don't ahve to loop through
          //the entire dataset EVERYTIME the user selects a different month.
        },
        error: (error: Error) => {
          console.log('Could not download data:', error);
          reject(error);
        }
      }
    )
  )
};

function storeMonths(data: CalendarData[]) {
  for (let i = 0; i<data.length; i++) {
    if(data[i].month === month) {
      days.push(data[i].day_code);
      monthArray.push(data[i]);
    }
  }
}

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