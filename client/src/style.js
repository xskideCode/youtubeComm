const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",
  
    heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    heading4: "font-poppins font-semibold xs:text-[40px] text-[32px] text-white xs:leading-[54px] leading-[46.8px] w-full",
    heading3: "font-poppins font-semibold xs:text-[20px] text-[20px] text-white xs:leading-[54px] leading-[46.8px] w-full",
    paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",
  
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",

    scrollbarDark: "scrollbar-thin scrollbar-thumb-violet-700 scrollbar-track-grey-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ",
    scrollbarDark1: "scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-grey-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ",
  };
  
  export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mx-10 mx-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex items-start md:m-2 m-0 relative`,
  
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
  };
  
  export default styles;