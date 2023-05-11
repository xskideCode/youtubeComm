import React from 'react'

const Button = ({ styles }) => {
  return (
    <button type="button" className={`py-3 px-6 bg-purple-400 font-poppins font-semibold text-[18px] text-primary outline-none ${styles} rounded-[10px]`}>
      Join Us
    </button>
  )
}

export default Button