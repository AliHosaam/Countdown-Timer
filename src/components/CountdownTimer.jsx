import React, { useState, useEffect } from 'react'
import Timer from './Timer'
import { BsFillPlayFill, BsPauseFill, BsStopFill } from 'react-icons/bs'

document.body.style.backgroundColor = '#282c34'
const CountdownTimer = () => {
const [hours, setHours] = useState(0)
const [minutes, setMinutes] = useState(0)
const [seconds, setSeconds] = useState(0)
const [milliseconds, setMilliseconds] = useState(0)
const [isRunning, setIsRunning] = useState(null)
const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "Done"
})

useEffect(() => {
    let interval
    if(isRunning) {
        interval = setInterval(() => {
            if(milliseconds > 0) {
                setMilliseconds((milliseconds) => milliseconds - 1)
            } else if(seconds > 0) {
                setSeconds((seconds) => seconds - 1)
                setMilliseconds(99)
            } else if(minutes > 0) {
                setMinutes((minutes) => minutes - 1)
                setSeconds(59)
                setMilliseconds(99)
            } else if(hours > 0) {
                setHours((hours ) => hours - 1)
                setMinutes(59)
                setSeconds(59)
                setMilliseconds(99)
            }
           }, 10)
    }

    if(hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 1) {
       setShowEndScreen({...showEndScreen, show: true})
       resetTimer()
    }

    return () => clearInterval(interval)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [milliseconds, seconds, minutes, hours, isRunning, showEndScreen.show])


const startTimer = () => {
    if(hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
        setIsRunning(true)
        setShowEndScreen({...showEndScreen, show: false})
} else {
    window.alert('Add Time.')
}}

const pauseTimer = () => {
    setIsRunning(false)
}

const stopTimer = () => {
    resetTimer()
    setShowEndScreen({...showEndScreen, show: false})
}

const resetTimer = () => {
    setIsRunning(false)
    setMilliseconds(0)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
}

const changeSeconds = (e) => {
    setSeconds(e.target.value)
}

const changeMinutes = (e) => {
    setMinutes(e.target.value)
}

const changeHours = (e) => {
    setHours(e.target.value)
}

return (
    <div>
       {showEndScreen.show && <h1 className="title text-light">{showEndScreen.message}</h1>}

        <Timer 
        milliseconds= {milliseconds} 
        seconds= {seconds} 
        minutes= {minutes} 
        hours= {hours} 
        changeSeconds={changeSeconds}
        changeMinutes={changeMinutes}
        changeHours={changeHours}
        />

    <br />


     {!isRunning && (<button 
     className='btn btn-accept btn-lg' 
     onClick={startTimer}
     >
        <BsFillPlayFill  />
     </button>)}
     {isRunning && (<button 
     className='btn btn-waring btn-lg' 
     onClick={pauseTimer}
     >
        <BsPauseFill  />
     </button>)}
     <button 
     className='btn btn-danger btn-lg' 
     onClick={stopTimer}
     >
        <BsStopFill  />
     </button>
    </div>
  )
}

export default CountdownTimer