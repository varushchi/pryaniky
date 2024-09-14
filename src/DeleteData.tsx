import React, { useState } from 'react'

interface Props{
  length: number
  toggleButton: () => void
  handleChange: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

export default function DeleteData(props: Props) {

  const HOST = 'https://test.v5.pryaniky.com'





  const options = []
  for (let i = 1; i <= props.length; i++)
  {
    const elem = <option value={i}>{i}</option>
    options.push(elem)
  }

  return (
    <div>
      <select name="delete" onChange={(e) => props.handleChange(e)}>
        {options}
      </select>
      <button onClick={props.toggleButton}>Save</button>
    </div>
  )
}
