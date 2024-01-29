
import './App.css';
import Modal from 'react-modal';
import React,{useState,useEffect} from 'react';
function App() {

  const [isToggle, setIsToggle] = useState(false);
  const [timer, setTimer] = useState(10); // Initial timer value in seconds (10 seconds)
  // const [audio, setAudio] = useState(new Audio("/Sounds/ticktick.mp3")); // Replace 'path/to/alarm.mp3' with your actual alarm sound file
  const [customTime, setCustomTime] = useState(0);
  

  const [audio1] = useState(new Audio("/Sounds/ticktick.mp3"));
  const [audio2] = useState(new Audio("/Sounds/alaram.mp3"));
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
 
  // const [customTime, setCustomTime] = useState(0);
  // const [isCustomInputActive, setIsCustomInputActive] = useState(false);

  // const audio1 = new Audio("/Sounds/ticktick.mp3");
  //  const audio2 = new Audio("/Sounds/alaram.mp3");




  const formatingtime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };



  useEffect(() => {
    let interval;

    if (isToggle) {
      audio1.play(); // Play audio1 when the timer starts

      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            audio1.pause(); // Pause audio1
            audio2.play(); // Play audio2 when the timer reaches zero
            setIsToggle(false);
            return 0;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
      audio1.pause(); // Pause audio1 when the timer is stopped or paused
    }

    return () => {
      clearInterval(interval);
    };
  }, [isToggle]);



  const handleStartStop = () => {
    setIsToggle((prev) => !prev);
  };


// const handleReset = () => {
//   setIsToggle(false);
//   setTimer(10);
//   audio1.pause();
//   audio1.currentTime = 0;
//   audio2.pause();
//   audio2.currentTime = 0;
// };
const handleReset = () => {
  setIsToggle(false);
  audio1.pause();
  audio1.currentTime = 0;
  audio2.pause();
  audio2.currentTime = 0;

  if (customTime > 0) {
    setTimer(customTime);
  } else {
    setTimer(10); // Reset to the default value if customTime is not set
  }
};





const openCustomModal = () => {
  setIsCustomModalOpen(true);
};

const closeCustomModal = () => {
  setIsCustomModalOpen(false);
};

const handleCustomSave = () => {
  closeCustomModal();
  setTimer(customTime);
};


  return (
   <>
   <div id='promodoro-wrapper'>
   <div className='promodoro-border'>
     <div id="timer">
    <p id="para">{formatingtime(timer)}</p>


     </div>
     <div className='btn-wrap'> 
<a href="#" class="btn1" onClick={handleStartStop}>
          {isToggle ? 'Pause' : 'Start'}</a>
    <a href="#" class="btn1" onClick={handleReset}>reset</a>
    <a href="#" class="btn1"     onClick={openCustomModal}>Customize</a>
</div>
<Modal
     className="model-wrapper"
        isOpen={isCustomModalOpen}
        onRequestClose={closeCustomModal}
        contentLabel="Custom Timer Modal"
      >
        <label>
          Enter time in seconds:
          <input
          className='form-control'
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="Enter time in seconds"
          />
        </label><br></br><br></br>
        <button  className='button btn  btn-primary' onClick={handleCustomSave}>Save</button>
        <button     className='button btn  btn-success' onClick={closeCustomModal}>Cancel</button>
      </Modal>
   </div>

   </div>
   
   </>
  )
}

export default App;
