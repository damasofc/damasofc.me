import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
   apiKey: "AIzaSyBGq7DXg0gFH7trHIe-HtU6zlH0zmenJH8",
   authDomain: "damasofc-site.firebaseapp.com",
   databaseURL: "https://damasofc-site.firebaseio.com",
   projectId: "damasofc-site",
   storageBucket: "damasofc-site.appspot.com",
   messagingSenderId: "1047009700207",
   appId: "1:1047009700207:web:17ea0ffa9f988cf25f209a",
   measurementId: "G-8C18DEG1TS"
 };

firebase.initializeApp(firebaseConfig);


const Contact = (props) => {
   const [formData, setFormData] = useState({})
   const [message, setmessage] = useState('')
   const [street, setstreet] = useState('')
   const [city, setcity] = useState('')
   const [state, setstate] = useState('')
   const [name, setname] = useState('')
   const [zip, setzip] = useState('')
   const [phone, setphone] = useState('')
   const [email, setemail] = useState('')
   const [showMessage, setshowMessage] = useState(false)
   const [isError, setisError] = useState(false)
   
   const updateInput = e => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
      
   }

   const handleSubmit = event => {
      event.preventDefault()
      // enviar correo
      if(!formData.subject || !formData.message || !formData.email){
         setshowMessage(true)
         setisError(true);
         setTimeout(() => {
            setshowMessage(false);
         },4000)
         return;
      } else {
         if(!formData.subject.length > 0 || !formData.message.length > 0 || !formData.email.length > 0){
            setshowMessage(true)
            setisError(true);
            setTimeout(() => {
               setshowMessage(false);
            },4000)
            return;
         }
      }
      firebase.firestore().collection('mail').add({
         fromName: formData.name,
         fromEmail: formData.email,
         to: ['damasofc@hotmail.com','damaso1994@gmail.com'],
         message: {
            subject: 'SITIO: '+formData.subject,
            text: 'Mensaje de: '+ formData.name+'\n'+formData.message+'\nFrom: '+formData.email,
         }
      }).then(() => {
         setFormData({
            name: '',
            email: '',
            message: '',
          })
         setshowMessage(true)
         setisError(false);
         setTimeout(() => {
            setshowMessage(false);
            setisError(false);
         },4000)
      }).catch(err => {
         console.log(err);
         setshowMessage(true);
         setisError(true)
         setTimeout(() => {
            setshowMessage(false);
            setisError(false);
         },4000)
      })
    }

   useEffect(() => {
      if(props.data){
         setname(props.data.name);
         setstreet(props.data.address.street);
         setcity(props.data.address.city);
         setstate(props.data.address.state);
         setzip(props.data.address.zip);
         setphone(props.data.phone);
         setemail(props.data.email);
         setmessage(props.data.contactmessage);
       }
   })


    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form onSubmit={handleSubmit} name="contactForm">
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" value={formData.name || ''} id="contactName" name="name" onChange={updateInput}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" value={formData.email || ''} id="contactEmail" name="email" onChange={updateInput}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input type="text" defaultValue="" size="35" value={formData.subject || ''} id="contactSubject" name="subject" onChange={updateInput}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea cols="50" rows="15" value={formData.message || ''} id="contactMessage" name="message" onChange={updateInput}></textarea>
                  </div>

                  <div>
                     <button className="submit">Submit</button>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

            {showMessage && !isError &&
               <div>
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
            }
            {showMessage && isError &&
               <div>
                  <i className="fa fa-times"></i>There is an error<br />
				   </div>

            }
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>

               {/* <div className="widget widget_tweets">
                  <h4 className="widget-title">Latest Tweets</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                        This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                        Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">2 Days Ago</a></b>
                     </li>
                     <li>
                        <span>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">3 Days Ago</a></b>
                     </li>
                  </ul>
		         </div> */}
            </aside>
      </div>
   </section>
    );
}

export default Contact;
