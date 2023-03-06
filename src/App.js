
import { useRef, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const [error, setError] = useState({})

  function submit(event) {
    event.preventDefault()

    const errors = {}
    if (change.firstName === '') {
      errors.firstName = true
    }

    if (change.password.length < 5) {
      errors.password = true

    }
    if (change.confirmPassword !== change.password) {
      errors.confirmPassword = true
    }

    if (change.gender === null) {
      errors.gender = true
    }
    const PATTERN_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = PATTERN_EMAIL.test(change.email)
    if (!emailValid) {
      errors.email = true
    }

    setError(errors)
    if (Object.keys(error).length) {
      alert('форма не отправленна, заполните обязательные поля')
      return false
    }


    const formData = new FormData(event.target)
    const baseURL = 'https://httpbin.org/post'

    axios.post(baseURL, formData,
      {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
    ).then((response) => {
      console.log(response);
      alert('Файл отправлен')
    })
  }


  // let [name, setName] = useState('')
  // function nameForm(event) {
  //   setName(event.target.value)
  // }

  // let [lastName, setLastName] = useState()
  // function lastNameForm(event) {
  //   setLastName(event.target.value)
  // }

  // let [email, setEmail] = useState()
  // function emailForm(event) {
  //   setEmail(event.target.value)
  // }

  // let [password, setPassword] = useState()
  // function passwordForm(event) {
  //   setPassword(event.target.value)
  // }

  // let [confirmPassword, setConfirmPassword] = useState()
  // function confirmPasswordForm(event) {
  //   setConfirmPassword(event.target.value)
  // }

  // let [gender, setGender] = useState()
  // function genderForm(event) {
  //   setGender(event.target.value)
  // }


  // let [hobbiesMusic, setHobbiesMusic] = useState()
  // function hobbiesFormMusic(event) {
  //   setHobbiesMusic(event.target.checked)
  // }
  // let [hobbiesSport, setHobbiesSport] = useState()
  // function hobbiesFormSport(event) {
  //   setHobbiesSport(event.target.checked)
  // }
  // let [hobbiesTravel, setHobbiesMusicTravel] = useState()
  // function hobbiesFormTravel(event) {
  //   setHobbiesMusicTravel(event.target.checked)
  // }
  // let [hobbiesMovies, setHobbiesMovies] = useState()
  // function hobbiesFormMovies(event) {
  //   setHobbiesMovies(event.target.checked)
  // }

  // let [select, setSelect] = useState('Employed')
  // function selectForm(event) {
  //   setSelect(event.target.value)
  // }

  // let [slider, setSlider] = useState(0)
  // function sliderForm(event) {
  //   setSlider(event.target.value)
  // }

  // let [age, setAge] = useState()
  // function ageForm(event) {
  //   setAge(event.target.value)
  // }

  // let [bio, setBio] = useState()
  // function bioForm(event) {
  //   setBio(event.target.value)
  // }
  const form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    music: '',
    sport: '',
    travel: '',
    movies: '',
    select: 'Employed',
    income: 0,
    age: 18,
    bio: ''
  }

  let [change, setChange] = useState(form)

  function inputChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    const name = event.target.name
    setChange({ ...change, [name]: value })

  }
  const fileInput = useRef(null)
  return (
    <div className='main-page'>
      <div className='container'>
        <div className='header'>
          <h1 className='title'>Create Account</h1>
        </div>
        <form onSubmit={submit}>
          <div className='row'>
            <div className='formGroup'>
              <label className='formLabel'>First name*</label>
              <input className='formInput' type='text' name='firstName' value={change.firstName} onChange={inputChange} placeholder='enter your first name' />
              {error.firstName &&
                <p className='textError'>'Поле не может быть пустым'</p>
              }

            </div>
            <div className='formGroup'>
              <label className='formLabel'>Last name</label>
              <input className='formInput' type='text' name='lastName' value={change.lastName} onChange={inputChange} placeholder='enter your last name' />
            </div>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Email*</label>
            <input className='formInput' type='text' name='email' value={change.email} onChange={inputChange} placeholder='enter your email' />
            {error.email &&
              <p className='textError'>'Поле не заполнено либо заполнено не верно'</p>
            }
          </div>

          <div className='row'>
            <div className='formGroup'>
              <label className='formLabel'>Password*</label>
              <input className='formInput' type='password' name='password' value={change.password} onChange={inputChange} placeholder='enter your password' />
              {error.password &&
                <p className='textError'>'Поле не может быть пустым и должно содержать не менее 5 символов'</p>
              }

            </div>
            <div className='formGroup'>
              <label className='formLabel'>Confirm password</label>
              <input className='formInput' type='password' name='confirmPassword' value={change.confirmPassword} onChange={inputChange} placeholder='enter your password again' />
              {error.confirmPassword &&
                <p className='textError'>'Подтвертите пароль'</p>
              }

            </div>
          </div>

          <div className='row'>
            <div className='formGroup'>
              <label className='formLabel'>Gender:</label>
              <div>
                <label><input className='formInput' type='radio' value='Male' name='gender' checked={change.gender === 'Male'} onChange={inputChange} />Male</label>
                <label><input className='formInput' type='radio' value='Famale' name='gender' checked={change.gender === 'Famale'} onChange={inputChange} />Famale</label>
                {error.gender &&
                  <p className='textError'>'Выберите один из вариантов'</p>
                }

              </div>
            </div>
            <div className='formGroup'>
              <label className='formLabel'>Hobbis:</label>
              <div>
                <label><input className='formInput' type='checkbox' name='music' checked={change.music} onChange={inputChange} />Music</label>
                <label><input className='formInput' type='checkbox' name='sport' checked={change.sport} onChange={inputChange} />Sport</label>
                <label><input className='formInput' type='checkbox' name='travel' checked={change.travel} onChange={inputChange} />Travel</label>
                <label><input className='formInput' type='checkbox' name='movies' checked={change.movies} onChange={inputChange} />Movies</label>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='formGroup'>
              <label className='formLabel'>Source of Income</label>
              <select className='formInput' name='select' value={change.select} onChange={inputChange}>
                <option value='Employed'>Employed</option>
                <option value='Unemployed'>Unemployed</option>
                <option value='Entrepreneurship'>Entrepreneurship</option>
              </select>
            </div>
            <div className='formGroup'>
              <label className='formLabel'>Income</label>
              <div className='row slider'>
                <input className='formInput' type='range' name='income' value={change.income} onChange={inputChange} min='0' max='30000' step='500' />
                <output className='number'>{change.income}</output>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='formGroup'>
              <label className='formLabel'>Unload Profile Picture</label>
              <input className='formInput formFile' type='file' name='file' ref={fileInput} />
            </div>
            <div className='formGroup'>
              <label className='formLabel'>Age</label>
              <input className='formInput' type='number' name='age' value={change.age} onChange={inputChange} min='18' max='60' />
            </div>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Bio</label>
            <textarea className='formInput' name='bio' value={change.bio} onChange={inputChange} rows='3' ></textarea>
          </div>

          <div className='footer'>
            <input className='btn' type='submit' value='create'></input>
          </div>
        </form>

      </div>
    </div >
  )
}

export default App;



