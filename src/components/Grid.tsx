
import { Color, PieceSymbol, Square } from "chess.js";

import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { Piece } from "./Piece";
import { BoardAtom } from "../recoil/atom";
;

type GridDetails = {
    square : Square,
    type : PieceSymbol,
    color : Color
} | null | undefined


export const Grid = ({rank , file , fileIndex  , rankIndex , movePiece} : {rank : string , file : string , fileIndex : number , rankIndex : number , movePiece: (from : string , to : string ,  type: "own" | "opp") => void}) =>
{
    const board = useRecoilValue(BoardAtom);
    const [gridDetails , setGridDetails] = useState<GridDetails>(null);
    

    useEffect(() =>
    {      
       
        if(board && board.at(rankIndex)?.at(fileIndex))
        {
            setGridDetails(board[rankIndex][fileIndex]);
        }else
        {
            setGridDetails(null);
        }
    } , [board]);

    useEffect(() => {
 
    } , [gridDetails])

    
    return(
        <div  className={`h-[80px] w-[80px] flex justify-center items-center relative cursor-pointer ${
           (fileIndex + Number(rank)) % 2
          ? "bg-lime-600"
          : ""
      }`} onClick={() =>{}} key={file + rank} data-key={file+rank}>
            <div className={`absolute top-1 left-1 ${(fileIndex + Number(rank)) % 2 ? "text-amber-50" : "text-green-500"}`}>
                {file== "a"  && rank}
            </div>
            {
                gridDetails && <Piece position={gridDetails.square} color={gridDetails.color} type ={gridDetails.type} movePiece={movePiece}/>
            }
            <div className={`absolute bottom-0.5 right-1 ${(fileIndex + Number(rank)) % 2 ? "text-amber-50" : "text-green-500"}`}>
                {rank=="1" && file}
            </div>
        </div>
    )
}


