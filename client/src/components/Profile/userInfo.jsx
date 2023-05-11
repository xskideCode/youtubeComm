import React, { useEffect, useState } from "react";
import { Avatar, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles, { layout } from '../../style';
import Form from "./Form";
import { fetchuser, updateToggle } from "../../actions/auth";

const UserInfo = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const toggle = useSelector((state) => state.auth.toggle);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [toggle])

  useEffect(() => {
    dispatch(fetchuser(user))
    setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, 1500);
  }, [])
  
  
  const dispatch = useDispatch();

  return (
    <div class="overflow-hidden bg-zinc-800 shadow rounded-3xl">
      <div class="px-4 py-5 sm:px-6">
        <h3 class={`${styles.heading3} text-base font-semibold leading-6`}>
          User Info
        </h3>
        <p class={`${styles.paragraph}mt-1 max-w-2xl text-sm text-slate-300`}>
          Personal info and options to manage it.
        </p>
      </div>
      <div class="border-y border-gray-200">
        <dl>
        <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class={`${styles.paragraph} text-sm text-slate-300`}>Photo</dt>
            <dd class={`${styles.paragraph} mt-1 text-sm sm:col-span-2 sm:mt-0`}>
              <Avatar alt={user.result.name} src={user.result.picture} sx={{ bgcolor: '#aa00ff' }} >{user.result.name.charAt(0)}</Avatar>
            </dd>
          </div>
          <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class={`${styles.paragraph} text-sm text-slate-300`}>Full name</dt>
            <dd class={`${styles.paragraph} mt-1 text-sm sm:mt-0`}>
              {user.result.name}
            </dd>
            <button class="outline-none font-semibold text-purple-600" onClick={() => dispatch(updateToggle("name"))}>Update</button>
            {(toggle === 'name') && (
              <Form
                name="name"
                label="Name"
              />
            )}
          </div>
          <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class={`${styles.paragraph} text-sm text-slate-300`}>Email address</dt>
            <dd class={`${styles.paragraph} mt-1 text-sm sm:mt-0`}>
              {user.result.email}
            </dd>
            <button class="outline-none font-semibold text-purple-600" onClick={() => dispatch(updateToggle("email"))}>Update</button>
            {(toggle === 'email') && (
              <Form
                name="email"
                label="Email"
              />
            )}
          </div>
        </dl>
      </div>
      <div class="px-4 py-5 sm:px-6">
        <h3 class={`${styles.heading3}text-base font-semibold leading-6 `}>
          Contact Info
        </h3>
        <p class={`${styles.paragraph}mt-1 max-w-2xl text-sm text-slate-300`}>
          You can make some of this info visible to others so they can reach you easily.
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class={`${styles.paragraph} text-sm text-slate-300`}>Email</dt>
            <dd class={`${styles.paragraph} mt-1 text-sm sm:mt-0`}>
             {user.result?.contacts?.emails}
            </dd>
            <button class="outline-none font-semibold text-purple-600" onClick={() => dispatch(updateToggle("contactEmail"))}>Update</button>
            {(toggle === 'contactEmail') && (
              <Form
                name="contactEmail"
                label="contactEmail"
              />
            )}
          </div>
          <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class={`${styles.paragraph} text-sm text-slate-300`}>Social</dt>
            <dd class={`${styles.paragraph} mt-1 text-sm sm:mt-0`}>
              Instagram
            </dd>
            <button class="outline-none font-semibold text-purple-600" onClick={() => dispatch(updateToggle("instagram"))}>Update</button>
            {(toggle === 'instagram') && (
              <Form
                name="instagram"
                label="instagram"
              />
            )}
            <dd class={`${styles.paragraph} mt-1 text-sm sm:col-end-3 sm:mt-0`}>
              Facebook
            </dd>
            <button class="outline-none font-semibold text-purple-600" onClick={() => dispatch(updateToggle("facebook"))}>Update</button>
            {(toggle === 'facebook') && (
              <Form
                name="facebook"
                label="facebook"
              />
            )}
            <dd class={`${styles.paragraph} mt-1 text-sm sm:col-end-3 sm:mt-0`}>
              Tiktok
            </dd>
            <button class="outline-none font-semibold text-purple-600" onClick={() => dispatch(updateToggle("tiktok"))}>Update</button>
            {(toggle === 'tiktok') && (
              <Form
                name="tiktok"
                label="tiktok"
              />
            )}
            <dd class={`${styles.paragraph} mt-1 text-sm sm:col-end-3 sm:mt-0`}>
              Twitter
            </dd>
            <button class="outline-none font-semibold text-purple-600" onClick={() => dispatch(updateToggle("twitter"))}>Update</button>
            {(toggle === 'twitter') && (
              <Form
                name="twitter"
                label="twitter"
              />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UserInfo;
