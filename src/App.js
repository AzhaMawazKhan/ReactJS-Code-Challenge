import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import ListContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

import Lists from './components/Lists'
import Addlists from './components/AddLists'


function App() {
  return (
    <Provider>
      <Wrapper>
      <Subscribe to={[ListContainer]}>
          {todos =>{
            const list = todos.getList()
            return (
            

              <TodosWrapper>
                 <label style={{ fontSize: '35px',fontWeight : 'bold'}}>Lists  :</label>
                <Addlists onAddTodo={todos.createList} />
                <Lists items={list} toggle={todos.setSelected}  />

              </TodosWrapper>

            )
          }
        }
        </Subscribe>
        <Subscribe to={[ListContainer]}>
      
          
          {todos => {
            const list = todos.getFilteredList()
            var str = todos.getName()
            return (
            

              <TodosWrapper>
                <label style={{fontSize: '35px', fontWeight : 'bold' }}>Filters  :</label>
                <form>
                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name="react-tips"
                        value="Completed"
                        onChange={todos.setFilter}

                        className="form-check-input"
                      />
                      Completed
                   </label>
                  </div>

                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name="react-tips"
                        value="Active"
                        className="form-check-input"
                        onChange={todos.setFilter}
                      />
                      Active
                   </label>
                  </div>

                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name="react-tips"
                        value="All"
                        className="form-check-input"
                        onChange={todos.setFilter}
                      />
                      All
                    </label>
                  </div>



                </form>
                <label style={{fontSize: '35px',fontWeight : 'bold'}}>
                  {str}  : </label>
                <AddTodo onAddTodo={todos.createTodo} />
                <TodoList items={list} toggleComplete={todos.toggleComplete} />
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;

  


`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  padding-left: 50px;

`

export default App
