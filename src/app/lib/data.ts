import type { ScheduleData, CsvData, CalendarData } from './interface'
import { readRemoteFile } from 'react-papaparse'

export function handleReadRemoteFile() {
  return new Promise<CalendarData>((resolve, reject)=>
    readRemoteFile('https://raw.githubusercontent.com/cdricn/pcalendar/refs/heads/main/src/app/assets/data/P5RCalendar.csv', 
      {
        download: true,
        header: true,
        complete: (results : CsvData) => {
          const newData = formatMonth(results.data);
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

function formatMonth(data: ScheduleData[]) {
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
  };

  const monthObj : CalendarData = {};
  let formattedMonth;
  
  for(const item of data) {
    formattedMonth = monthMap[item.month];
    
    if (monthObj[formattedMonth]) {
      monthObj[formattedMonth].push({...item, month: formattedMonth});
    } else {
      monthObj[formattedMonth] = [{...item, month: formattedMonth}];
    }
  }
  return monthObj;
}