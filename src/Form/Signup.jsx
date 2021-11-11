import { useState, useEffect } from 'react'
import guide from './Guide'
import './Signup.css'

const Signup = () => {

    let [theme, setTheme] = useState(true)
    let [lang, setLang] = useState('uz')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [disabled, setDisabled] = useState(false)
    let [emailErr, setEmailErr] = useState(false)
    let [success, setSuccess] = useState(false)

    // window.localStorage.setItem('myTheme', theme)

    const btnChange = () =>{
        setTheme(theme = !theme)

        if(!theme){
            document.getElementById('root').classList.remove('light')
            document.getElementById('root').classList.add('dark')
        }else{
            document.getElementById('root').classList.remove('dark')
            document.getElementById('root').classList.add('light')
        }
    }

    useEffect(() =>{
        email.length > 5 && password.length > 4 ? setDisabled(false) : setDisabled(true)
    }, [email, password])

    const onSubmit = (e) =>{
        e.preventDefault()
        
        submitted()
    }

    async function submitted(){
        let response = await fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        let data = await response.json()

        if(response.status === 400){
            setEmailErr(true)
        }else{
            setSuccess(true)
        }
    }

    return (
        <div className="signup" id="signup">
            <div className="signup__header">
                <select onChange={(e) =>{
                    setLang(e.target.value);
                }}>
                    <option value="uz">UZ</option>
                    <option value="ru">RU</option>
                    <option value="eng">ENG</option>
                </select>
                <button className="signup__btn" onClick={btnChange}>{theme ? <span>🌑</span> : <span>☀️</span>}</button>
            </div>
            <p className="signup__text">{guide[lang].text}</p>

            {/* form */}

            <form className="form" onSubmit={onSubmit}>
                <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                {emailErr ? <span className="error">Iltimos emailni to'g'ri kiriting</span> : ''}
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <button disabled={disabled}>Submit</button>
                {success ? <span className="success">Siz muvaffaqiyatli ro'yxatdan o'tdingiz!</span> : ''}
            </form>
        </div>
    )
}

export default Signup
