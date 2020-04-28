import React, {createContext, useState} from 'react';

export const StyleContext= createContext();

const StyleContextProvider = (props) =>{

    const blurOn = {
        filter:'blur(8px)'
    }

    const blurOff = {
        filter:'blur(0px)'
    }

    const [blur,setBlur] = useState(
        {blurState:false,
        blurEffect:blurOff}
    )

    const toggleBlur =()=>{
        if (blur.blurState){
            setBlur({blurState:true,blurEffect:blurOff});
        }else {
            setBlur({blurState:false,blurEffect:blurOn});   
        }
    }

    return (
        <StyleContext.Provider value={{blur,toggleBlur}}>
            {props.children}
        </StyleContext.Provider>
    )

}

export default StyleContextProvider;