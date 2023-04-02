import React from "react";
import {Link} from 'react-router-dom';

const ContactCard=(props)=>{
    const {id, name, email}=props.contact;
    return(
        <div className='item'>
            <div className='content'>
                <Link to={{pathname:`/contact/${id}`, state:{contact: props.contact}}}>
                    <div className='header'>{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i className='trash alternate outline icon' 
            style={{color: "red", marginTop: "7px"}}
            onClick={()=>props.clickHandler(id)}></i>
            <Link to={{pathname:`/edit/${id}`, state:{contact: props.contact}}}>
                <i className='edit alternate outline icon' 
                style={{color: "blue", marginTop: "7px", marginLeft:"10px"}}
                ></i>
            </Link>
        </div>
    );
}

export default ContactCard;