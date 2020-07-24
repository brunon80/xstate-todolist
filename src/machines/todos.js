import { Machine, assign, spawn } from 'xstate'
import { todoFactory } from './todoFactory'

export const todoMachine = Machine({
  id: 'todos',
  initial: 'idle',
  context: {
    todos: []
  },
  states: {
    idle: {},
    creating: {
      invoke: {
        id: 'create-todo',
        src: (_, event) => new Promise(resolve => setTimeout(() => resolve(event), 1000)),
        onDone: {
          target: 'created',
          actions: assign((context, event) => {
            const todo = spawn(todoFactory(event.data.text))
            return {
              todos: [...context.todos, todo]
            }
          })
        },
        onError: 'failure'
      }
    },
    deleting: {
      invoke: {
        id: 'delete-todo',
        src: (_, event) => new Promise(resolve => setTimeout(() => resolve(event), 1000)),
        onDone: {
          target: 'deleted',
          actions: assign((context, event) => {
            return {
              todos: context.todos.filter(todo => todo.id !== event.data.id)
            }
          })
        },
        onError: 'failure'
      }
    },
    created: {},
    deleted: {},
    failure: {}
  },
  on: {
    CREATE: {
      target: '.creating'
    },
    DELETE: {
      target: '.deleting'
    }
  }
})