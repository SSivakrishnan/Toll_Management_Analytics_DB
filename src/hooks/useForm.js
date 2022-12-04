import React, { useState } from 'react'

function useForm(callback,initalValue={},validate) {
  const [values,setValues] = useState(initalValue)
  const [errors,setErrors] = useState({})
  function onChange(e){
    setValues({...values,[e.target.name]:e.target.value})
  }
  function onSubmit(){
    if(Object.keys(validate(values)).length === 0){
        callback()
        setValues({})
        setErrors({})
    }else{
        setErrors(validate(values))
    }
  }
  return [values,errors,onChange,onSubmit]
}

export default useForm