import React, { useState, useEffect } from "react";
import { Grid, TextField, styled} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateUser, updateToggle, fetchuser } from "../../actions/auth";
import styles, { layout } from '../../style';
import Input from "./Input";

const initialState = { firstName: '', lastName: '', email: '', contacts:{ emails: '', socials:{ instagram: '', facebook: '', tiktok: '', twitter: ''}}}

const CssTextField = styled(TextField)({
    
  "& .MuiInputBase-root": {
    color: 'white',
  },
  "& .MuiInputLabel-root":{
    color: 'grey',
  },
  '& label.Mui-focused': {
    color: 'deepPurple-700',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'indigo',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'deepPurple-900',
    },
  },
});

const Form = ({ name, label, type }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    dispatch(fetchuser(user))
    var names = user.result.name.split(' ');
    var firstName = names[0];
    var lastName = names[names.length - 1];

    setFormData({ firstName: firstName, lastName: lastName , email: user.result.email, contacts:{ emails: user.result.contacts?.emails, socials:{ instagram: user.result.contacts?.socials?.instagram, facebook: user.result.contacts?.socials?.facebook, tiktok: user.result.contacts?.socials?.tiktok, twitter: user.result.contacts?.socials?.twitter}}})

    setCurrentId(user.result._id);
    console.log(currentId);
    
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(currentId, formData));
    console.log(formData);
    dispatch(updateToggle(""))
  
  };

  const handleCancel = () => {
    dispatch(updateToggle(""))
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="overflow-hidden fixed inset-0 m-auto sm:w-2/5 w-4/5 h-2/5 p-4 bg-zinc-900 shadow-lg rounded-3xl">
      <form
        style={{ width: "100%", marginTop: "24px" }}
        onSubmit={handleSubmit}
      >
          <h3 class={`${styles.heading3} text-base capitalize pl-1 font-semibold mb-3 leading-6`}>
            {name}
          </h3>
        <Grid className="sm:pr-20" container spacing={2} direction="column" justifyContent="center" alignItems="stretch">
          {(name === 'name') && (

            <>
            <CssTextField name="FirstName" variant="outlined" label="First Name" style={{margin: '8px'}} fullWidth value={formData.firstName}  color="secondary" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            <CssTextField name="LastName" variant="outlined" label="Last Name" style={{margin: '8px'}} fullWidth value={formData.lastName} color="secondary" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
              {/* <Input
                name="firstName"
                label="First Name"
                handleChange={handleChange}
                autofocus
                half
              />
              <Input
                name="lastName"
                label="Last Name"
                handleChange={handleChange}
                half
              /> */}
            </>
          )}
          {(name === 'email') && (
            <CssTextField name="Email" variant="outlined" label="Email" style={{margin: '8px'}} fullWidth value={formData.email} color="secondary" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          )}
          {(name === 'contactEmail') && (
            <CssTextField name="emails" variant="outlined" label="Contact Email" style={{margin: '8px'}} fullWidth value={formData.contacts?.emails} color="secondary" onChange={(e) => setFormData({ ...formData, contacts: {...formData.contacts, emails: e.target.value }})} />
          )}
          {(name === 'instagram') && (
            <CssTextField name="instagram" variant="outlined" label="Instagram" style={{margin: '8px'}} fullWidth value={formData?.contacts?.socials?.instagram} color="secondary" onChange={(e) => setFormData({ ...formData, contacts: {...formData.contacts, socials: {...formData.contacts.socials, instagram: e.target.value }}})} />
          )}
          {(name === 'facebook') && (
            <CssTextField name="facebook" variant="outlined" label="Facebook" style={{margin: '8px'}} fullWidth value={formData?.contacts?.socials?.facebook} color="secondary" onChange={(e) => setFormData({ ...formData, contacts: {...formData.contacts, socials: {...formData.contacts.socials, facebook: e.target.value }}})} />
          )}
          {(name === 'tiktok') && (
            <CssTextField name="tiktok" variant="outlined" label="Tiktok" style={{margin: '8px'}} fullWidth value={formData?.contacts?.socials?.tiktok} color="secondary" onChange={(e) => setFormData({ ...formData, contacts: {...formData.contacts, socials: {...formData.contacts.socials, tiktok: e.target.value }}})} />
          )}
          {(name === 'twitter') && (
            <CssTextField name="twitter" variant="outlined" label="Last Name" style={{margin: '8px'}} fullWidth value={formData?.contacts?.socials?.twitter} color="secondary" onChange={(e) => setFormData({ ...formData, contacts: {...formData.contacts, socials: {...formData.contacts.socials, twitter: e.target.value }}})} />
          )}
          
        </Grid>
        <div className="flex justify-end">
        <button class="outline-none font-semibold text-purple-600" onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit} className={`p-auto m-4 bg-purple-700 font-poppins font-semibold text-[15px] drop-shadow-xl w-16 h-8 text-white outline-none rounded-[12px]`}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
