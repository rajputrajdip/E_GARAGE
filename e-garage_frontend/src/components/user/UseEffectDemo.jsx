import { useState,useEffect,React } from 'react'

export const UseEffectDemo = () => {
    const [count,setcount] = useState(0);


    useEffect(()=>{
        console.log("useeffect called");
        
    },[count])
    
  return (
    <div style={{textAlign:"center"}}>
        <h1>click button {count} times</h1>
        <button onClick={()=>{setcount(count+1)}}>click me!!</button>
    </div>
    
  )
}
