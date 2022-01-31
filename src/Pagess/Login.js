import React,{useState} from 'react';
import '../App.css';
import { useHistory } from 'react-router-dom';
import {collection, getDocs ,query, where} from 'firebase/firestore';
import { db } from '../firebaseConfigaration';
import { Button } from 'react-bootstrap';

const Login = ({setLogin,login}) => {
    let histry=useHistory();
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const getLogIn= async()=>{
        const connection = collection(db, 'users');
        const q = query(connection, where("email", "==",email, "&&", "password","==",password));
        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
             doc.data() //is never undefined for query doc snapshots
             if(doc.data().email===email && doc.data().password===password){
                localStorage.setItem('id', doc.id);
                localStorage.getItem('id');
                console.log(doc.id)
                console.log(localStorage.getItem('id'));
                 console.log("loin in......");
                setLogin(true);
                histry.push('/homepage')

             }
             
            
            })
    }
  return <>
            <div className='main'>
                <div className='login'>
                    <div className='main-content'>
                        <div className='card'>
                            <div className='card-body'>
                            <form>
                                <div className="row mb-3">
                                    <label  className="col-sm-2 col-form-label" aria-requiredd>Email</label>
                                    <div className="col-sm-10">
                                    <input type="email" className="form-control" id="inputEmail3" onChange={e=>setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label  className="col-sm-2 col-form-label" aria-required>Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword3"required onChange={e=>setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="container overflow-hidden">
                                    <div className="row gx-5">
                                        <div className="col">
                                        <Button  className="primary" onClick={getLogIn}>login</Button>
                                            <span className='or'>or</span>
                                        <button type="submit" className="btn btn-primary" onClick={()=>{
                                            histry.push('/registration')
                                        }}>Ragister</button>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div> 
            </div>
  </>;
};

export default Login;

