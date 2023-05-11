import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../../style"
import { categories } from "../../constants"


const Categories = () => {

  return (
      <div className={`${styles.flexCenter} ${styles.scrollbarDark} flex-row md:px-0 px-2 pt-2 pb-4`}>
          <div className={`${styles.scrollbarDark} flex-[1.5] w-full flex flex-row justify-between rounded-[7px] pb-2 px-4 overflow-x-auto bg-black-gradient md:mt-0 mt-10 `}>
            {categories.map((category, i) => (
              <Link to={`/videos/category?name=${category.name}&id=${category.id}`}>
                <div key={i} className="flex flex-row h-[46px] items-center ss:my-0 my-4 p-2 rounded-[20px] feedback-card cursor-pointer">
                  <p className="font-poppins font-medium text-[14px] leading-[27px] text-dimWhite whitespace-nowrap">
                  {category.name}
                  </p>    
                </div>
              </Link>
            ))}
          </div>
      </div>
  )
}


export default Categories