import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { facebook, instagram, tiktok, twitter, email } from "../assets";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Contacts({channel}) {
    
  const [showContact, setShowContact] = useState('');


  const toggleEmail = () => {
    setShowContact('email');
  };
  const toggleInstagram = () => {
    setShowContact('instagram');
  };
  const toggleFacebook = () => {
    setShowContact('facebook');
  };
  const toggleTiktok = () => {
    setShowContact('tiktok');
  };
  const toggleTwitter = () => {
    setShowContact('twitter');
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-purple-800">
          User
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleEmail();
                    }}
                  className={classNames(
                    active ? 'bg-gray-700 text-gray-100' : 'text-gray-300',
                    'flex flex-row gap-4 items-center w-full px-4 py-2 text-sm'
                  )}
                >
                    <img 
                        src={email}
                        alt="email"
                        className={`w-[23px] h-[21px] object-contain cursor-pointer`}           
                    />
                  Email
                  {(showContact=== 'email') && (
                        <div className="absolute right-7 top-8 z-30 origin-top-right rounded-sm p-2 bg-gray-800">
                        {channel.contacts?.emails || 'No email provided'}
                        </div>
                    )}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => {
                        e.preventDefault();
                        toggleInstagram();
                    }}
                  className={classNames(
                    active ? 'bg-gray-700 text-gray-100' : 'text-gray-300',
                    'flex flex-row gap-4 items-center w-full px-4 py-2 text-sm'
                  )}
                >
                    <img 
                        src={instagram}
                        alt="instagram"
                        className={`w-[21px] h-[21px] object-contain cursor-pointer`}           
                    />
                  Instagram
                  {(showContact=== 'instagram') && (
                        <div className="absolute right-7 top-8 z-30 origin-top-right rounded-sm p-2 bg-gray-800">
                        {channel.contacts.socials?.instagram || 'No instagram page provided'}
                        </div>
                    )}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => {
                        e.preventDefault();
                        toggleFacebook();
                    }}
                  className={classNames(
                    active ? 'bg-gray-700 text-gray-100' : 'text-gray-300',
                    'flex flex-row gap-4 items-center w-full px-4 py-2 text-sm'
                  )}
                >
                    <img 
                        src={facebook}
                        alt="facebook"
                        className={`w-[21px] h-[21px] object-contain cursor-pointer`}           
                    />
                  Facebook
                  {(showContact=== 'facebook') && (
                        <div className="absolute right-7 top-8 z-30 origin-top-right rounded-sm p-2 bg-gray-800">
                        {channel.contacts.socials?.facebook || 'No facebook page provided'}
                        </div>
                    )}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => {
                        e.preventDefault();
                        toggleTiktok();
                    }}
                  className={classNames(
                    active ? 'bg-gray-700 text-gray-100' : 'text-gray-300',
                    'flex flex-row gap-4 items-center w-full px-4 py-2 text-sm'
                  )}
                >
                    <img 
                        src={tiktok}
                        alt="tiktok"
                        className={`w-[21px] h-[21px] object-contain cursor-pointer`}           
                    />
                  Tiktok
                  {(showContact=== 'tiktok') && (
                        <div className="absolute right-7 top-8 z-30 origin-top-right rounded-sm p-2 bg-gray-800">
                        {channel.contacts.socials?.tiktok || 'No tiktok handle provided'}
                        </div>
                    )}
                </button>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleTwitter();
                    }}
                    className={classNames(
                      active ? 'bg-gray-700 text-gray-100' : 'text-gray-300',
                      'flex flex-row gap-4 items-center w-full px-4 py-2 text-sm'
                    )}
                  >
                    <img 
                        src={twitter}
                        alt="twitter"
                        className={`w-[21px] h-[21px] object-contain cursor-pointer`}           
                    />
                    Twitter
                    {(showContact=== 'twitter') && (
                        <div className="absolute right-7 top-8 z-30 origin-top-right rounded-sm p-2 bg-gray-800">
                        {channel.contacts.socials?.twitter || 'No twitter handle provided'}
                        </div>
                    )}
                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
