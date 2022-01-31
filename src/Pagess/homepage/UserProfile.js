import React, { useState } from 'react';
import { storage } from '../../firebaseConfigaration';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import validator from 'validator'

const UserProfile = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
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
    const [NewpasswordError, setNewPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                    console.log("File available at", downloadURL);
                });
            }
        );
    };
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
    const validatePhone = (value) => {
        if (value.length != null && value.length >= 8 && phone.length <= 10) {
            setPhoneError('')
            setPhone(value)
        }
        else {
            setPhoneError('name should be minimum 8 and maximum 10 ')

        }
    }
    const validateOldPassword = (value) => {
        if (value.length != null && value.length >= 8) {
            setPassword(value);
            setPasswordError('')
        }
        else {
            setPasswordError('name should be minimum 8 chars')
        }
    }
    const validateNewPassword = (value) => {

        if (value.length != null && value.length >= 8) {
            setNewPassword(value)
            setNewPasswordError('')
        }
        else {
            setNewPasswordError('name should be minimum 8 chars')
        }
    }

    return <>
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src={url} /><span class="font-weight-bold">ajay</span><span class="text-black-50">ajay@mail.com.my</span><span> </span></div>
                </div>
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile Settings</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">FirstName</label><input type="text" id="form3Example1m" className="form-control " onChange={e => validateName(e.target.value)} autoComplete='on' required /></div>
                            <div class="col-md-6"><label class="labels">LastName</label><input type="text" id="form3Example1n" className="form-control " onChange={e => validateLastName(e.target.value)} autoComplete='on' required /></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Mobile Number</label><input type="number" id="form3Example9" className="form-control " autoComplete='on' required onChange={e => validatePhone(e.target.value)} /></div>
                            <div class="col-md-12"><label class="labels">OldPassword</label><input type="password" className="form-control " onChange={e => validateOldPassword(e.target.value)} autoComplete='on' required /></div>
                            <div class="col-md-12"><label class="labels">NewPassword</label><input type="password" id="form3Example99" className="form-control " autoComplete='on' required onChange={e => validateNewPassword(e.target.value)} /></div>
                            <div class="col-md-12"><label class="labels">UpdateProfilePhoto</label><form onSubmit={formHandler}>
                                <input type="file" className="input" />
                                <button type="submit">Upload</button>
                            </form>
                                <h8>Uploading done {progress}%</h8>
                            </div>
                            <div class="col-md-12"><label class="labels">Email ID</label><input type="email" className="form-control" id="inputEmail3" onChange={e => validateEmail(e.target.value)} required /></div>
                            <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{emailError}</span>
                        </div>
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default UserProfile;
