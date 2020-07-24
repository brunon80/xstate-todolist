import React from 'react';
import { useService } from '@xstate/react'

// import { Container } from './styles';

function Todo({ service, onDelete }) {
  const [current, send] = useService(service)

  function onCheck() {
    send('CHECK')
  }

  return (
    <div className="bg-white px-8 py-6 border-red-500 border-b-2 flex justify-between items-center">
      <label className="container-checkbox">
        <input onChange={onCheck} type="checkbox" checked={current.value === 'finished' && true} />
        <span className="checkmark"></span>
      </ label>
      <span className={`flex-1 ml-5 px-8 text-xl ${current.value === 'finished' && 'line-through'}`}>{current.context.text}</span>
      <button className="focus:outline-none text-xl" onClick={() => onDelete(service)}><span role="img" aria-label="Excluir">🗑️</span></button>
    </div>
  )
}

export default Todo;