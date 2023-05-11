import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createMessage } from '../actions/auth';

const HelpCenter = () => {

  const dispatch = useDispatch();
  const [messageData, setMessageData] = useState({ subject: '', email: '', message: ''});
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(createMessage({ ...messageData, name: user?.result?.name }));

    clear();
  }

  const clear = () => {
    setMessageData({ subject: '', email: '', message: ''});
  }

  return (
    <div className="isolate bg-primary px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">Contact Us</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Make sure to sign in before contact.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">   
          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-50">
              Subject
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Topic of your message"
                className="block w-full rounded-md placeholder:italic placeholder:text-slate-400 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-50">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Enter your email so we can contact you back."
                className="block w-full rounded-md placeholder:italic placeholder:text-slate-400 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
              />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-50">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md placeholder:italic placeholder:text-slate-400 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
              />
            </div>
          </div>
          
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  )
}

export default HelpCenter