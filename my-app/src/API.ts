import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'https://todo-backend-5779.onrender.com'

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + '/todos'
    )
    return todos
  } catch (err:any) {
    console.error(err);
    throw new Error(err.message);
  }
}

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: false,
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-todo',
      todo
    )
    return saveTodo
  } catch (err:any) {
    throw new Error(err)
  }
}

export const updateTodo = async (
  todo: ITodo,
  markAsCompleted = false
 ): Promise<AxiosResponse<ApiDataType>> => {
  try {
     const todoUpdate: Partial<ITodo> = {
       name: todo.name,
       description: todo.description,
       status: markAsCompleted,
     }
     const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
       `${baseUrl}/edit-todo/${todo._id}`,
       todoUpdate
     )
     return updatedTodo
  } catch (err:any) {
     throw new Error(err)
  }
 }
 

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`
    )
    return deletedTodo
  } catch (err:any) {
    throw new Error(err)
  }
}
