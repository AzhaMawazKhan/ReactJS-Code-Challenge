import React from 'react'


import styled from 'styled-components'


const Lists= ({items, toggle , selected}) => (
  <Wrapper>
    {items.map(item => {
      const onComplete = e => {
        toggle(item.id -1)
      }

      return <label key={item.id} onClick = {onComplete}>{item.name}</label>
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;


`

export default Lists
