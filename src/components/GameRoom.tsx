
import { DndProvider } from "react-dnd"
import { Board } from "./Board"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ChessTimer } from "./ChessTimer"
import { ToastContainer } from "react-toastify"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { BlackTimeAtom, TurnAtom, WhiteTimeAtom } from "../recoil/atom"
import { useEffect } from "react"

export const GameRoom = () =>
{
    const turn = useRecoilValue(TurnAtom);
    const setWhiteTime = useSetRecoilState(WhiteTimeAtom);
    const setBlackTime = useSetRecoilState(BlackTimeAtom);


    useEffect(() =>
    {
        setWhiteTime(600);
        setBlackTime(600);
    } , []);

    return(
        <div>
            <DndProvider backend={HTML5Backend}>
                <div className="flex gap-16 h-screen justify-center items-center ">
                <Board/>
                <div className="h-[640px] flex flex-col justify-between py-12">
                    <ChessTimer initialTime={600} isWhite={false} isActive={turn === 'b'} />
                    <ChessTimer initialTime={600} isWhite={true} isActive={turn === 'w'} />
                </div>
                </div>
            </DndProvider>
            <ToastContainer/>
        </div>
    )
}