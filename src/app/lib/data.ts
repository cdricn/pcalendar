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
  const monthNameFormat : { [key: string] : string } = {
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
    const monthCodeFormat : { [key: string] : number } = {
    'APR': 4,
    'MAY': 5,
    'JUN': 6,
    'JUL': 7,
    'AUG': 8,
    'SEP': 9,
    'OCT': 10,
    'NOV': 11,
    'DEC': 12,
    'JAN': 1,
    'FEB': 2,
    'MAR': 3,
  };

  const monthObj : CalendarData = {};
  let formattedMonth;
  let monthCode;
  
  for(const item of data) {
    formattedMonth = monthNameFormat[item.month];
    monthCode = monthCodeFormat[formattedMonth];
    
    if (monthObj[formattedMonth]) {
      monthObj[formattedMonth].push({...item, month: formattedMonth, monthCode: monthCode});
    } else {
      monthObj[formattedMonth] = [{...item, month: formattedMonth, monthCode: monthCode}];
    }
  }
  return monthObj;
}