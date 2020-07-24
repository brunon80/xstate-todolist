import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { todoMachine } from './machines/todos'

import Todo from './components/Todo'

function App() {
  const [inputText, setInputText] = useState('')
  const [current, send] = useMachine(todoMachine, { devTools: true })

  function onSubmit(e) {
    e.preventDefault()
    setInputText('')
    if (inputText) send('CREATE', { id: Math.ceil(Math.random() * 100), text: inputText })
  }

  function onDelete(todo) {
    send('DELETE', todo)
  }

  return (
    <main className="flex items-center flex-col py-20 bg-gray-800 w-screen h-screen">
      <section className="bg-white">
        <header>
          <h1 className="text-3xl bg-red-600 px-8 py-6 text-white uppercase">Lista de Afazeres</h1>
        </header>
        <section>
          <form className="flex" onSubmit={onSubmit}>
            <input className="px-8 py-4 bg-gray-200 w-full outline-none text-xl text-red-500 placeholder-red-500" value={inputText} onChange={(e) => setInputText(e.target.value)} type="text" placeholder="Digite um afazer" />
            <button className="outline-none focus:outline-none px-6 bg-red-600 text-white text-4xl" type="submit" >+</button>
          </form>
        </section>
        <section>
          {
            current.context.todos.map(todo => <Todo onDelete={onDelete} key={todo.id} service={todo} />)
          }
        </section>
        {
            current.matches('creating') && <div className="bg-white px-8 py-6 border-red-500 border-b-2">Criando afazer, aguarde...</div>
        }
        {
          current.matches('deleting') && <div className="bg-white px-8 py-6 border-red-500 border-b-2">Excluindo afazer, aguarde...</div>
        }
      </section>
    </main>
  );
}

export default App;
