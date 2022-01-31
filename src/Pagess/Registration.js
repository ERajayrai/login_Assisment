import React, { useState } from 'react';
import img4 from '../img4.png'
import validator from 'validator'
import { db } from '../firebaseConfigaration';
//import { getFirestore, collection, getDocs,addDoc } from 'firebase/firestore/lite';
import { collection, addDoc } from "firebase/firestore";
import { useHistory } from 'react-router-dom';
const Registration = () => {
  let histry = useHistory();
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [name, setName] = useState('');
  const [lastError, setLastError] = useState('');
  const [last, setLast] = useState('');
  const [addressError, setAddressError] = useState('');
  const [address, setAddress] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [cPasswordError, setCpasswordError] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')


  const validateEmail = (value) => {

    if (validator.isEmail(value)) {
      setEmailError('')

      setEmail(value)
    } else {
      setEmailError('Enter valid Email!')
    }
  }
  const validateName = (value) => {

    setName(value)

    if (value.length != null && value.length >= 3 && value.length <= 8) {
      setName(value)
      setNameError('')
    }
    else {
      setNameError('name should be minimum 3 and maximum 8 charecter')
    }
  }
  const validateLastName = (value) => {

    setLast(value)

    if (value.length != null && value.length >= 3 && value.length <= 8) {
      setLastError('');
      setLast(value)
    }
    else {
      setLastError('name should be minimum 3 and maximum 8 charecter')
    }
  }
  const validateAddress = (value) => {
    if (value.length != null && value.length >= 10 && value.length <= 15) {
      setAddressError('')
      setAddress(value);
    }
    else {
      setAddressError('name should be minimum 10 and maximum 15 charecter')
    }
  }
  const validatePhone = (value) => {
    if (value.length != null && value.length >= 8 && phone.length <= 10) {
      setPhoneError('')
      setPhone(value)
    }
    else {
      setPhoneError('name should be minimum 8 and maximum 10 ')

    }
  }
  const validatePassword = (value) => {
    if (value.length != null && value.length >= 8) {
      setPassword(value);
      setPasswordError('')
    }
    else {
      setPasswordError('name should be minimum 8 chars')
    }
  }
  const validateCPassword = (value) => {

    setCpassword(value)
    console.log(Cpassword)
    console.log(Cpassword.length)

    if (password === value) {
      setCpasswordError('')
      setPassword(value)
    }
    else {
      setCpasswordError('passWord is Mitchmatch ')
    }
  }

  const getRagistration = async () => {
    //setCountry("india")
    let ccc = "india"
    if (name.length === 0 || last.length === 0 || phone.length === 0 || address.length === 0 || gender.length === 0 || ccc.length === 0 || email.length === 0 || password.length === 0) {
      alert("all field is requer")
      console.log(name,
        last,
        phone,
        address,
        gender,
        country,
        email,
        password)
    } else {
      const intialValues = { firstName: name, lastName: last, email: email, password: password, gender: gender, address: address, country: country, phone: phone }
      await addDoc(collection(db, "users"), intialValues).then((res) => {
        alert("Sucessfully", res);
        histry.push('/')
      }).catch((err) => {
        alert("uncessfully", err);
      })

      console.log(name,
        last,
        phone,
        address,
        gender,
        country,
        email,
        password)
    }


  }
  return <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card card-registration my-4">
          <div className="row g-0">
            <div className="col-xl-6 d-none d-xl-block">
              <img
                src={img4}
                alt="Sample "
                className="img-fluid"

              />
            </div>
            <div className="col-xl-6">
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase">Register Here</h3>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1m" className="form-control " onChange={e => validateName(e.target.value)} autoComplete='on' required />
                      <label className="form-label" >First name</label>
                      <span style={{
                        fontWeight: 'bold',
                        color: 'red',
                      }}>{nameError}</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1n" className="form-control " onChange={e => validateLastName(e.target.value)} autoComplete='on' required />
                      <label className="form-label" >Last name</label>
                      <div><span style={{
                        fontWeight: 'bold',
                        color: 'red',
                      }}>{lastError}</span></div>
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <input type="email" className="form-control " onChange={e => validateEmail(e.target.value)} autoComplete='on' required />
                  <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{emailError}</span>
                  <label className="form-label" >Email ID</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example8" className="form-control " onChange={e => validateAddress(e.target.value)} autoComplete='on' required />
                  <label className="form-label" >Address</label>
                  <div><span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{addressError}</span></div>
                </div>

                <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">

                  <h6 className="mb-0 me-4">Gender: </h6>

                  <div className="form-check form-check-inline mb-0 me-4">
                    <input onChange={e => setGender(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="femaleGender"
                      value="Female"
                      autoComplete='on' required
                    />
                    <label className="form-check-label" >Female</label>
                  </div>

                  <div className="form-check form-check-inline mb-0 me-4">
                    <input autoComplete='on' required
                      onChange={e => setGender(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="maleGender"
                      value="male"
                    />
                    <label className="form-check-label" >Male</label>
                  </div>

                  <div className="form-check form-check-inline mb-0">
                    <input onChange={e => setGender(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="otherGender"
                      value="other"
                      autoComplete='on' required
                    />
                    <label className="form-check-label" >Other</label>
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">

                    <select className="select">
                      <option value="indaa" >India</option>
                    </select>

                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input type="number" id="form3Example9" className="form-control " autoComplete='on' required onChange={e => validatePhone(e.target.value)} />
                  <label className="form-label" >Phone</label>
                  <div><span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{phoneError}</span></div>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" className="form-control " onChange={e => validatePassword(e.target.value)} autoComplete='on' required />
                  <label className="form-label" >Password</label>
                  <div><span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{passwordError}</span></div>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example99" className="form-control " autoComplete='on' required onChange={e => validateCPassword(e.target.value)} />
                  <label className="form-label" >Conformpassword</label>
                  <div><span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{cPasswordError}</span></div>
                </div>
                <div className="d-flex justify-content-end pt-3">
                  <button type="button" className="btn btn-warning btn-lg ms-2" onClick={getRagistration}>submit</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Registration;
