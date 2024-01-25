import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'

const App: React.FC = () => {
 const [todos, setTodos] = useState<ITodo[]>([])
 const [editingTodo, setEditingTodo] = useState<ITodo | null>(null)
 const [theme, setTheme] = useState<'light' | 'dark'>('light');

 useEffect(() => {
  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
  }
  else{
    setTheme(savedTheme as 'light');
  }
}, []);

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  window.localStorage.setItem('theme', newTheme);
};

 useEffect(() => {
    fetchTodos()
 }, [])

 const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
 }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
       .then(response => {
         console.log('Server response:', response);
         if (response.status !== 201) {
           throw new Error('Error! Todo not saved');
         }
         console.log('New todos:', response.data.todos);
         setTodos(response.data.todos);
       })
       .catch(error => console.log('Error:', error));
   };

   const handleUpdateTodo = (todo: ITodo, markAsCompleted = false): void => {
    if (editingTodo && editingTodo._id === todo._id) {
      updateTodo(todo, markAsCompleted)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Todo not updated')
          }
          setTodos(data.todos)
          setEditingTodo(null);
        })
        .catch((err) => console.log(err))
    } else {
      updateTodo(todo, markAsCompleted)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Todo not updated')
          }
          setTodos(data.todos)
        })
        .catch((err) => console.log(err))
    }
}


 const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
 }

 const handleEdit = (todo: ITodo) => {
    setEditingTodo(todo);
 };

 return (
  <body className={theme}>
            <main className='App'>
                <Header appTitle="TaskMaster" toggleTheme={toggleTheme} theme={theme} />
                <h1>Tasks for the day</h1>
                <AddTodo saveTodo={handleSaveTodo} />
                {todos.map((todo: ITodo) => (
                    <TodoItem
                        key={todo._id}
                        updateTodo={handleUpdateTodo}
                        deleteTodo={handleDeleteTodo}
                        editTodo={handleEdit}
                        todo={todo}
                        isEditing={editingTodo && editingTodo._id === todo._id}
                    />
                ))}
            </main>
        </body>
);
}

export default App
