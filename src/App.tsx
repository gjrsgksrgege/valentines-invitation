import bg1 from './assets/3.gif';
import bg2 from './assets/6.gif';
import { useEffect, useState } from 'react';
import './App.css'; // make sure your CSS is imported

// define Heart type
type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  opacity: number;
  emoji: string;
};

function App() {
  const steps = [
    {
      bg: bg1,
      text1: "Hi, Jinky!",
      text2: "Will you be my Valentine?",
      noText: "Sino kaba",
      yesText: "Oo naman!"
    },
    {
      bg: bg2,
      text1: "Mami, seryoso ka ba?!",
      text2: "Baka napipilitan ka lng ah",
      noText: "hindi nyehehe",
      yesText: "Ikaw na yan oh!"
    },
    {
      bg: bg1,
      text1: "Flowers for you!",
      text2: "See you on Sunday mami <3",
      noText: "I Love you",
      yesText: "Paldo talaga"
    }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [Yesbutton, setYesbutton] = useState<number>(1);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const [Yesclicked, setYesclicked] = useState(steps[0].bg);
  const [Yesclicked2, setYesclicked2] = useState(steps[0].text1);
  const [Yesclicked3, setYesclicked3] = useState(steps[0].text2);
  const [Nobutton, setNobutton] = useState(steps[0].noText);
  const [Yesbutton2, setYesbutton2] = useState(steps[0].yesText);

  const handleYesclick = () => {
    const nextStep = stepIndex + 1;

    if (nextStep < steps.length) {
      setStepIndex(nextStep);
      setYesclicked(steps[nextStep].bg);
      setYesclicked2(steps[nextStep].text1);
      setYesclicked3(steps[nextStep].text2);
      setNobutton(steps[nextStep].noText);
      setYesbutton2(steps[nextStep].yesText);
      setYesbutton(1);
      setPos({ x: 0, y: 0 });
    }
  };

  const handleNoclick = () => {
    setYesbutton(Yesbutton + 0.2);
    setIsMoving(true);
    setPos({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90)
    });
  };

  // HEARTS
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 22 + 14,
        duration: Math.random() * 3 + 4,
        opacity: Math.random() * 0.5 + 0.4,
        emoji: Math.random() > 0.5 ? "❤️" : "💗"
      };

      setHearts(prev => [...prev, newHeart]);

      // remove after 8 seconds
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 8000);
    }, 380);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#fff] w-screen h-screen font-poppins flex flex-col items-center justify-center z-10">

      {/* Floating Hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="pointer-events-none fixed animate-float"
          style={{
            left: `${heart.left}vw`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
            bottom: "-30px",
          }}
        >
          {heart.emoji}
        </div>
      ))}

      <div className='flex flex-col items-center gap-6'>
        <img src={Yesclicked} className='w-[250px] h-[250px] z-10' />
        <div className='flex flex-col items-center gap-1'>
          <div className="text-3xl text-black text-center">{Yesclicked2}</div>
          <div className="text-4xl text-black text-center">{Yesclicked3}</div>
        </div>

        <div className="relative w-[500px] h-[100px]">
          {/* YES BUTTON */}
          <button
            onClick={handleYesclick}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `scale(${Yesbutton})`,
              transition: "transform 0.5s, left 0.5s, top 0.5s"
            }}
            className="absolute w-[227px] bg-[#04A777] text-2xl text-white p-4 rounded focus:outline-none z-10"
          >
            {Yesbutton2}
          </button>

          {/* NO BUTTON */}
          <button
            onClick={handleNoclick}
            style={{
              left: `50%`,
              top: `0%`
            }}
            className="absolute w-[227px] bg-[#BA1F33] text-2xl text-white p-4 rounded focus:outline-none"
          >
            {Nobutton}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
