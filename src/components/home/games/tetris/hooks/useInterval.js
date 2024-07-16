import { useEffect } from "react";
import { useRef } from "react"

export const useInterval = (callback,delay)=>{
    const savedCallback = useRef();
    useEffect(()=>{
        savedCallback.current = callback;
    },[callback]);

    useEffect(()=>{
        const tick = ()=>{
            if(savedCallback.current) savedCallback.current();
        }
        if(delay !== null){
            const id = setInterval(tick,delay);
            return ()=>clearInterval(id);
        }
    },[delay])
}