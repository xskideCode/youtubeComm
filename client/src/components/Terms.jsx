import React from 'react'
import styles, { layout } from './../style';
import { terms } from "./../constants"
import { Divider } from '@mui/material';

const Terms = () => {
  return (
    <div className="pb-4">
        <h2 className={`${styles.heading4}`}>Terms of Service</h2>
        <Divider />
        {terms.map((term, i) => (
        <div key={i}>
        <h2 className={`${styles.heading3} md:px-0 px-2`}>{term.id} {term.name}</h2>
        <p className={`${styles.paragraph} max-w-[98%] md:px-0 px-2 xs:text-[14px] text-[13px]`}>{term.p}
        </p>
      </div>
      ))}
    </div>
  )
}

export default Terms