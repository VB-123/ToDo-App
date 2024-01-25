import React, { useState } from 'react';

type Props = TodoProps & {
    updateTodo: (todo: ITodo, markAsCompleted?: boolean) => void;
    deleteTodo: (_id: string) => void;
    editTodo: (todo: ITodo) => void;
    isEditing: boolean | null;
}

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo, editTodo, isEditing }) => {
    const [localTodo, setLocalTodo] = useState<ITodo>(todo);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTodo({ ...localTodo, name: event.target.value });
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalTodo({ ...localTodo, description: event.target.value });
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            updateTodo(localTodo);
        }
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        updateTodo(localTodo, isChecked);
    }

    const checkTodo: string = todo.status ? `line-through` : '';
    return (
      <div className='Card'>
          <div className='Card--button'>
              <input type="checkbox" checked={todo.status} onChange={handleStatusChange} />
          </div>
          <div className='Card--text'>
              {isEditing ? (
                  <>
                      <input type="text" value={localTodo.name} onChange={handleNameChange} onKeyPress={handleKeyPress} />
                      <textarea value={localTodo.description} onChange={handleDescriptionChange} onKeyPress={handleKeyPress} />
                  </>
              ) : (
                  <>
                      <h1 className={checkTodo}>{todo.name}</h1>
                      <span className={checkTodo}>{todo.description}</span>
                  </>
              )}
          </div>
          <div className='Card--button'>
              <button
                  onClick={() => deleteTodo(todo._id)}
                  className='Card--button__delete'
              >
                  Delete
              </button>
              <button onClick={() => editTodo(localTodo)}>Edit</button>
              {isEditing && (
                  <button onClick={() => updateTodo(localTodo)}>Save</button>
              )}
          </div>
      </div>
  );
}

export default TodoItem;
