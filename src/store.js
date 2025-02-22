import { Container } from 'unstated'

const defaultState = {
    selected : '0',
    filter : false,
    lists : [
        {
          id : 1,
          name : 'My todays task',
            list: [
                {
                    id: 1,
                    completed: false,
                    text: 'Read README'
                  },
                  {
                    id: 2,
                    completed: false,
                    text: 'Add one todo'
                  },
                  {
                    id: 3,
                    completed: false,
                    text: 'Add filters'
                  },
                  {
                    id: 4,
                    completed: false,
                    text: 'Add multiple lists'
                  },
                

                
  
             ]
        },
    ]    
}

class ListContainer extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage () {
  // window.localStorage.clear();
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }
    return defaultState
  }

  syncStorage () {
    console.log(this.state);

    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }
  getSelected(){
    return this.state.selected
  }
  getList () {
    return this.state.lists
  }
  getFilteredList () {
    var sel = this.state.filter;
    return this.state.lists[this.state.selected].list.filter(function(item) {
      return item.completed === sel || sel ==='all';
    });
  }

  setFilter = event => {
   
    if(event.target.value ==="Completed"){
      this.setState({
          
        filter: true,
    })      
    }
    
    if(event.target.value ==="Active"){
      this.setState({
        filter: false,
    })      
    }
    
    if(event.target.value ==="All"){
      this.setState({
        filter: 'all',
    }) 
    }

}

  toggleComplete = async id => {
    const item = this.state.lists[this.state.selected].list.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.lists[this.state.selected].list.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      var lists = this.state.lists;
      lists[this.state.selected].list =list;
      return { lists }
    })

    this.syncStorage()
  }

  createTodo = async text => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.lists[this.state.selected].list.length + 1
      }
      const list = this.state.lists[this.state.selected].list.concat(item)
      var lists = this.state.lists;
      lists[this.state.selected].list =list;
      return { lists }
    })


    this.syncStorage()
  }
  getName(){
    return this.state.lists[this.state.selected].name;
  }

  setSelected = async id => {
    await this.setState({
      selected : id,
    })


  }
  createList = async text => {
    await this.setState(state => {
      const item = {
        id: state.lists.length + 1,
        name : text,
        list: [
          {
            id: 1,
            completed: false,
            text: 'Start'
          },
        ],
       
      }
      const lists = this.state.lists.concat(item)
    
      return { lists }
    })


    this.syncStorage()
  }
}

export default ListContainer
