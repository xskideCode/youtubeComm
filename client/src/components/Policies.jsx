import React from 'react'
import styles, { layout } from './../style';
import { policies } from "./../constants"
import { Divider } from '@mui/material';

const Policies = () => {
  return (
    <div className="pb-4">
        <h2 className={`${styles.heading4}`}>Policies </h2>
        <Divider />
        {policies.map((policy, i) => (
        <div key={i}>
        <p className={`${styles.paragraph} max-w-[90%] mt-5 md:px-0 px-2 xs:text-[14px] text-[13px]`}>{policy.p}
        </p>
      </div>
      ))}
    </div>
  )
}

export default Policies