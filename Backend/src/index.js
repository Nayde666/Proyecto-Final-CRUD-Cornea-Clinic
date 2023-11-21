// ----------- Imports
import express from 'express'
import bcrypt, { hash } from 'bcrypt'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { collection, deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

// ----------- firestore credentials
const firebaseConfig = {
  apiKey: "AIzaSyCEqZaZzBDIjOaeLt4qajn0DAV5UDZ8NAk",
  authDomain: "cornea-clinic-6e3c7.firebaseapp.com",
  projectId: "cornea-clinic-6e3c7",
  storageBucket: "cornea-clinic-6e3c7.appspot.com",
  messagingSenderId: "129638994287",
  appId: "1:129638994287:web:8002c9a144d710bc3a989a"
}
// ---------- Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const db = getFirestore()
// ---------- Initializing the server
const app = express()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
// Middleware
app.use(cors(corsOptions))
app.use(express.json())


// --------- Routes of work

// --------- CRUD DOCTOR -----------
// --------- New Doctor
app.post( '/new-doctor' , ( req , res ) => {
  let { name, lastname, email, phone, password } = req.body

  if( !name.length ){
    res.json({
      'alert': 'It is necessary to add a name'
    })
  } else if (! lastname.length ) {
    res.json({
      'alert': 'It is necessary to add a lastname'
    })
  } else if ( !email.length ) {
    res.json({ 
      'alert': 'It is necessary to add an e-mail address'
    })
  } else if ( !password.length ) {
    res.json({
      'alert': 'It is necessary to add a password'
    })
  }

  const doctors = collection(db, 'doctors')

  getDoc(doc(doctors, email)).then(doctor => {
    if(doctor.exists()) {
      res.json({
        'alert': 'This doctor registry already exists'
      })
    } else {
      // encrypt password
      bcrypt.genSalt( 10, ( err,salt ) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const data = {
            name,
            lastname,
            email,
            phone,
            password: hash
          }
          setDoc( doc ( doctors, email ), data ).then( data => {
            res.json({
              'alert': 'success',
              data
            })
          }) 
        })
      })
    }
  }).catch(error => {
    res.json({
      'alert' : 'Connection Error'
    })
  })

})
// --------- Delete Doctor
app.post('/delete-doctor' , ( req, res ) => {
  const email = req.body.email
  deleteDoc( doc(collection(db, 'doctors'), email))
  .then( data => {
    res.json({
      'alert': 'success'
    })
  })
  .catch( err => {
    res.json({
      'alert': 'error',
      err
    })
  })
})


// --------- CRUD PATIENTS ---------
// --------- New Patient
app.post( '/new-patient' , ( req, res ) => {
  let{ name, lastname, email, phone, birthday, age, gender, address, treatment, blood } = req.body

  if ( !name.length ){
    res.json({
      'alert': 'It is necessary to add a name'
    })
  } else if ( !lastname.length ){
    res.json({
      'alert': 'It is necessary to add a lastname'
    })
  } else if ( !email.length ){
    res.json({
      'alert': 'It is necessary to add an email address'
    })
  } else if ( !phone.length ){
    res.json({
      'alert': 'It is necessary to add a phone'
    })
  } else if ( !birthday.length ){
    res.json({
      'alert': 'It is necessary to add a birthday'
    })
  } else if ( !age.length ){
    res.json({
      'alert': 'It is necessary to add an age'
    })
  } else if ( !['masculino', 'femenino'].includes(gender.toLowerCase())){
    res.json({
      'alert': 'Invalid gender. Please enter "masculino" or "femenino".'
    })
  } else if ( !address.length ){
    res.json({
      'alert': 'It is necessary to add an address'
    })
  } else if ( !treatment.length ){
    res.json({
      'alert': 'It is necessary to add a treatment'
    })
  } else if ( !blood.length ){
    res.json({
      'alert': 'It is necessary to add a blood'
    })
  }

  const patients = collection(db, 'patients')

  getDoc(doc(patients, email)).then(patient => {
    if (patient.exists()) {
      res.json({
        'alert': 'The patient already exists'
      })
    } else {
      const data = {
        name, 
        lastname, 
        email,
        phone,
        birthday,
        age,
        gender: gender.toLowerCase(),
        address,
        treatment,
        blood
      }
      setDoc(doc(patients, email), data).then(data => {
        res.json({
            'alert': 'success',
            data
        })
    })
    }
  }).catch(error => {
    res.json({
        'alert': 'Error de conexion'
    })
  })
})

// Switch on the server in listening mode
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Escuchando Puerto: ${PORT}`)
})
