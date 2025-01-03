import { Grid } from "./Grid";

export const Row = ({rank , rankIndex , movePiece} : {rank : string , rankIndex : number, movePiece: (from : string , to : string , type: "own" | "opp") => void}) =>{
    const files= ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "h"];

    
    return(
        <div className="h-[80px] w-[640px] flex">
           {
                files.map((file , index) => 
                {
                    return(
                        <Grid file={file} fileIndex={index} rankIndex={rankIndex} rank={rank} key={file + index} movePiece={movePiece}/>
                    )
                })
           }
        </div>
    )
}