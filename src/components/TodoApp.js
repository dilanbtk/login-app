import React, { useState,useEffect, useContext } from 'react';
import { withNamespaces } from 'react-i18next';


const TodoApp = ({t}) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTag, setNewTag] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editTodo, setEditTodo] = useState('');
  const [editTag, setEditTag] = useState('');
   
  const addTodo = () => {
    if (newTodo.trim()) {
      const newData = [...todos, { text: newTodo, tag: newTag, completed: false }];
      setTodos(newData);
      setNewTodo('');
      setNewTag('');
      localStorage.setItem('todos', JSON.stringify(newData));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const newData = todos.filter((_, i) => i !== index);
    setTodos(newData);
    localStorage.setItem('todos', JSON.stringify(newData));
  };

  const editTodoHandler = (index) => {
    setIsEditing(index);
    setEditTodo(todos[index].text);
    setEditTag(todos[index].tag);
  };

  const updateTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: editTodo, tag: editTag } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
    setEditTodo('');
    setEditTag('');
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const filteredTodos = todos.filter(todo => {
    const textMatch = todo.text ? todo.text.toLowerCase().includes(filterText.toLowerCase()) : false;
    const tagMatch = todo.tag ? todo.tag.toLowerCase().includes(filterText.toLowerCase()) : false;
    return textMatch || tagMatch;
  });

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-black">Todo List</h3>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50 "
          placeholder={t('addTesk')}
        />
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t('addTag')}
        />
        <button
          onClick={addTodo}
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4"
        >
          {t('add')}
        
        </button>
      </div>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50"
        placeholder= {t('searchTask')}
      />
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index} className="flex flex-col mb-2">
            <div className="flex items-center">
              <span
                onClick={() => toggleTodo(index)}
                className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-black'}`}
              >
                {todo.text} {todo.tag && <span className="ml-2 text-gray-400">#{todo.tag}</span>}
              </span>
              <button
                onClick={() => editTodoHandler(index)}
                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4"
              >
               {t('edit')}
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4"
              >
                {t('delete')}
              </button>
            </div>
            {isEditing === index && (
              <div className="flex mt-4">
                <input
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={t('editTask')}
                />
                <input
                  type="text"
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline ml-4"
                  placeholder={t('editTag')}
                />
                <button
                  onClick={() => updateTodo(index)}
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4"
                >
                  {t('upadate ') }
                </button>
                
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withNamespaces()(TodoApp);

