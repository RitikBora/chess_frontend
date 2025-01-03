
import { useState, useEffect } from 'react'
import { Card, CardContent } from "../components/ui/card"
import { Clock} from 'lucide-react'
import { BlackTimeAtom, WhiteTimeAtom } from '../recoil/atom'
import { useSetRecoilState } from 'recoil'

interface ChessTimerProps {
  initialTime: number
  isWhite: boolean
  isActive: boolean
}

export function ChessTimer({ initialTime, isWhite, isActive }: ChessTimerProps) {
  const [time, setTime] = useState(initialTime);
  const setWhiteTime = useSetRecoilState(WhiteTimeAtom);
  const setBlackTime = useSetRecoilState(BlackTimeAtom);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if (interval) clearInterval(interval)
            if(isWhite)
              setWhiteTime(0);
            else
              setBlackTime(0);
            return 0;
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (!isActive && interval) {
      clearInterval(interval)
    }

    if(isWhite)
    {
      setWhiteTime(time);
    }else
    {
      setBlackTime(time);
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const bgColor = isWhite ? 'bg-white' : 'bg-gray-800'
  const textColor = isWhite ? 'text-gray-800' : 'text-white'
  const IconComponent = Clock

  return (
    <Card className={`w-48 h-20 ${bgColor} ${isActive ? 'ring-4 ring-green-500' : 'ring-2 ring-gray-300'} transition-all duration-300 ease-in-out`}>
      <CardContent className="flex items-center justify-between h-full p-4">
        <div className={`${textColor} transition-colors duration-300 ease-in-out`}>
          <IconComponent size={32} />
        </div>
        <div className={`text-3xl font-bold ${textColor} transition-colors duration-300 ease-in-out`}>
          {formatTime(time)}
        </div>
      </CardContent>
    </Card>
  )
}

