import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPromotion } from "../actions/promotions";

function PurchaseButton({ channel, order }) {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  

  const handlePurchase = () => {
    setShowPopup(true);
    
  };

  const handleConfirm = () => {
    // Implement purchase logic here
    setShowPopup(false);
    dispatch(createPromotion({ ...channel, type: order}))

  };

  const handleCancel = () => {
    setShowPopup(false);
  };
  

  return (
    <>
      <button
        className="w-full py-2 px-6 bg-purple-600 hover:bg-purple-800 mt-8 rounded-xl transition-colors text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:ring-offset-slate-900"
        onClick={handlePurchase}
      >
        <span className="font-medium">Purchase</span>
      </button>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-around z-10">
          <div className="bg-primary m-1 sm:m-0 rounded-lg px-8 pt-6 pb-4">
          <h1 class="text-gray-300 text-sm font-semibold mb-4 ">Purchase promotion</h1>
          <div className="flex bg-[#323537] items-center flex-row  mb-6 p-3 rounded-lg ">
                <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} className="rounded-full h-[46px] w-[46px] hover:scale-125 cursor-pointer mr-5  " />

                <div className="flex flex-col ">
                  <h4 className="font-poppins font-semibold text-sm text-white">
                    {channel.snippet.title}
                  </h4>
                  <div className="flex flex-row ">
                    <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">{channel.snippet.customUrl}</p>
                  </div>
                </div>
              </div>
            <div className="flex justify-around">
              <button
                className="text-xs mr-4 text-gray-500 hover:bg-gray-500 rounded px-2 hover:text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="text-xs font-semibold bg-purple-600 hover:bg-purple-800 text-white px-3 py-1 rounded"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PurchaseButton;
