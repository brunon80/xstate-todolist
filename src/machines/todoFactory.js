import { Machine } from 'xstate'

export const todoFactory = text => {
  return Machine({
    id: 'todo',
    initial: 'unfinished',
    context: {
      text,
    },
    states: {
      unfinished: {
        on: {
          CHECK: {
            target: 'finished'
          }
        }
      },
      finished: {
        on: {
          CHECK: {
            target: 'unfinished'
          }
        }
      },
    }
  })
}