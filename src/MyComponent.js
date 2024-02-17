import React from 'react'

export default function MyComponent({value,handlChange,inputName,type}) {
  return (
    <>
      <label>{inputName}</label>
        <input
          type={type}
          onChange={(event) => {
            handlChange(event.target.value);
          }}
        />
    </>
  )
}
