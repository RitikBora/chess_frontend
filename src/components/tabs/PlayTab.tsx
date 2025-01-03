import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import {CircuitBoardIcon , PuzzleIcon} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle  , DialogFooter, DialogHeader } from "../ui/dialog"
import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

import {useNavigate} from 'react-router-dom'




export const PlayTab = () =>
{
    return(
        <div className="flex gap-4 w-full  mt-4">
            <StartGameCard/>
            <JoinGameCard/>
        </div>
    )
}

const StartGameCard = () =>
{
    const navigate = useNavigate();
    const [creatingGame , setCreatingGame]  = useState(false);

    const startGame = () =>
    {
        setCreatingGame(true);
        const room_id = generateRandomString();
        navigate(`/room?room_id=${room_id}`)
    }
    return(
       <div className="w-1/2  ">
            <Card className="bg-amber-50">
                <CardHeader>
                    <CardTitle className="text-2xl">Start a New Game</CardTitle>
                    <CardDescription>Create a new room and invite a friend to play.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center mb-4">
                  <CircuitBoardIcon className="w-24 h-24 text-lime-600" />
                </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="default" className="text-lg bg-lime-600 w-full font-bold text-amber-50 hover:bg-lime-700" onClick={startGame}>{
                        creatingGame ? "Loading ..." : "Start Game"
                    }</Button>
                </CardFooter> 
            </Card>
       </div>
    )
}

const JoinGameCard = () =>
{
    const [isOpen , setIsOpen] = useState(false);
    
    const joinGame = () =>
    {
        setIsOpen(true);
    }

    const onClose = () =>
    {
        setIsOpen(false);
    }

    return(
        <div className="w-1/2 ">
            <Card className="bg-lime-600">
                <CardHeader>
                    <CardTitle className="text-amber-50 text-2xl">Join Existing Game</CardTitle>
                    <CardDescription className="text-amber-100">Enter a room link to join an ongoing game.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center mb-4">
                        <PuzzleIcon className="w-24 h-24 text-amber-50" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="default" className="text-lg bg-amber-50 w-full font-bold text-lime-600 hover:bg-amber-100" onClick={joinGame}>Join Game</Button>
                </CardFooter> 
            </Card>
            <JoinRoomDialog isOpen={isOpen} onClose={onClose}/>

        </div>
    )
}

const JoinRoomDialog = ({isOpen , onClose} : {isOpen : boolean , onClose : () => void}) =>
{
    return(
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="sm:max-w-[425px] bg-stone-700 text-amber-50">
                <DialogHeader>
                <DialogTitle>Join Game Room</DialogTitle>
                <DialogDescription className="text-amber-100">
                    Enter the room link to join an existing game.
                </DialogDescription>
                </DialogHeader>
                    <div className="grid w-full max-w-sm items-center gap-1.5 pt-5">
                        <Label htmlFor="room_id">Room Id</Label>
                        <Input type="text" id="room_id" placeholder="TtKS2fHr" />
                    </div>
                <DialogFooter className="pt-2">
                     <Button className="w-1/3 bg-lime-600 text-amber-50 hover:bg-lime-700" onClick={() => {}}>Join</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function generateRandomString(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  
  return result;
}