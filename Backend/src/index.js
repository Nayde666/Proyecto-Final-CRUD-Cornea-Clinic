// ----------- Imports
import express from 'express'
import bcrypt, { hash } from 'bcrypt'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, query, where } from 'firebase/firestore'
import { async } from '@firebase/util'

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
  } else if ( !gender.length ){
    res.json({
      //!['masculino', 'femenino'].includes(gender.toLowerCase())
      'alert': 'It is necessary to add a gender'
      //'alert': 'Invalid gender. Please enter "masculino" or "femenino".'
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
// --------- Load Patients
app.get( '/get-patients' , async ( req, res ) => {
  try {
    const patients =  []
    const data = await collection(db, 'patients')
    const docs = await getDocs(data)
    docs.forEach((doc) => {
      patients.push(doc.data())
    })
    res.json({
      'alert': 'succes',
      patients
    })
  } catch (error) {
    res.json({
      'alert': 'Error getting data',
      error
    })
  }
})
// --------- Delete Patients
app.post('/delete-patients' , (req,res)  => {
  const email = req.body.email
  deleteDoc(doc(collection(db, 'patients'), email))
  .then(data => {
    res.json({
      'alert': 'success'
    })
  })
  .catch(err => {
    res.json({
      'alert': 'error',
      err
    })
  })
})
// --------- Edit Patients
app.post( '/edit-patient', async (req,res) => {
  const{ name, lastname, email, phone, birthday, age, gender, address, treatment, blood } = req.body
  const edited = await updateDoc(doc(db, 'patients', email), {
    name,
    lastname,
    phone,
    birthday,
    age,
    gender,
    address,
    treatment,
    blood
  })
  res.json({
    'alert': 'edited',
    edited
  })
})


// --------- CRUD APPOINTMENTS --------- 

// NEW APPOINTMENT
app.post('/new-appointment', async (req, res) => {
  let { name, email, phone, age, gender, date, time, typeofreservation } = req.body
  // Ensure that the fields are not sent empty.
  if( !name.length ){
    res.json({
      'alert': 'It is necessary to add a name address'
    })
  } else if (!email.length){
    res.json({
      'alert': 'It is necessary to add an e-mail address'
    })
  } else if (!phone.length ) {
    res.json({
      'alert': 'It is necessary to add a phone'
    })
  } else if (!age.length ) {
    res.json({ 
      'alert': 'It is necessary to add an age'
    })
  } else if(!gender.length){
    res.json({ 
      'alert': 'It is necessary to add gender'
    })
  } else if (!date.length){
    res.json({ 
      'alert': 'It is necessary to add date'
    })
  } else if (!time.length){
    res.json({ 
      'alert': 'It is necessary to add date'
    })
  } else if (!typeofreservation.length ) {
    res.json({ 
      'alert': 'It is necessary to add a typeofreservation'
    })
  }

  try {
    /*From the patient collection bring the email to verify 
    that it exists in order to register an appointment.*/

    const patients = collection(db, 'patients')
    const patientDoc = doc(patients, email)
    const patient = await getDoc(patientDoc)

    // ! is the negation
    if (!patient.exists()) {
      return res.json({
        'alert': 'The user is not registered in the database'
      })
    }
    // Comparar que el date y time no coincidan con un registro ya guardado
    const citas = collection(db, 'citas')
    const citaOcupada = await getDocs(
      query(
        citas,
        where('date', '==', date),
        where('time', '==', time)
      )
    )

    if (!citaOcupada.empty) {
      return res.json({
        'alert': 'Sorry, this date and time are busy. Please try another time.'
      })
    }

    const citaDoc = doc(citas, email)
    const cita = await getDoc(citaDoc)

    if (cita.exists()) {
      return res.json({
        'alert': 'An appointment is already scheduled with this user.'
      })
    }

    const data = {
      name,
      email,
      phone,
      age,
      gender,
      date,
      time,
      typeofreservation
    }

    setDoc(citaDoc, data).then(() => {
      res.json({
        'alert': 'success',
        data
      })
    })
  } catch (error) {
    res.json({
      'alert': 'Error de conexión',
      error: error.message 
    })
  }
})

// Switch on the server in listening mode
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Escuchando Puerto: ${PORT}`)
})
