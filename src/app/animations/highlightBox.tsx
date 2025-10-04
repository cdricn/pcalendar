import { useEffect, useRef, useState } from 'react';
import styles from './highlightBox.module.css'

export default function HighlightBox({id, rowIndex, size} : any) {
  const [currSize, setCurrSize] = useState(30);

  //const highlightOnClick = useRef(null);
  let highlightOnClick;
  
  useEffect(()=>{
    
  })

  if(id) {
    if(currSize < size) {id = currSize}

    let item = document.getElementById(id)!;
    let elementWidth = item.offsetWidth;
    let elementHeight = item.offsetHeight;
    let elementLeft = item.offsetLeft;
    let elementTop = rowIndex*85;

    highlightOnClick = {
      top: `${elementTop}px`,
      left: `${elementLeft}px`,
      width: elementWidth,
      height: elementHeight,
      backgroundColor: 'red',
      display: id ? 'display' : 'hidden'
    };
  }

  return (
    <div className={styles['filter-highlight']} style={highlightOnClick}></div>
  );
}