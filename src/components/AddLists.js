import React from 'react'


import styled from 'styled-components'

const AddLists = ({ onAddTodo }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onAddTodo(e.target.value)
    }
  }

  return (
    <Input
      type='text'
      onKeyPress={handleKeyPress}
      placeholder='Add new List...'
    />
  )
}

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 300px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`

export default AddLists
