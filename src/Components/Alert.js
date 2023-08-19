import React from 'react'

export default function Alert(props) {

  const captalize = (word) => {             //function for captalizing the 'S' of success
    if(word==="danger"){
      word="error"
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);

  }
  return (
    // for solving Cumulative Layout Shift (CLS) problem we give a fix height for alert so that our layout doesn't shift 
    <div style={{height:'50px'}}>   

    {props.alert && <div className={`alert alert-${props.alert.typ} alert-dismissible fade show `} role="alert">
   
      <strong>{captalize(props.alert.typ)}</strong> :{captalize(props.alert.msg)}

    </div>}
    </div>
  )
}

