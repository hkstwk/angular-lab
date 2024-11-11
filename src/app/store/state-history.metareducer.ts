// // state-history.metareducer.ts
// import { ActionReducer, MetaReducer } from '@ngrx/store';
// import { undo } from './counter.actions';
//
// // Define a type-safe meta-reducer
// export function stateHistoryMetaReducer<State>(
//   reducer: ActionReducer<State>
// ): ActionReducer<State> {
//   const history: State[] = [];
//
//   // return (state, action) => {
//   //   // If the action is UNDO and we have history, pop the last state
//   //   if (action.type === undo.type) {
//   //     if (history.length > 0) {
//   //       const previousState = history.pop();
//   //       return previousState !== undefined ? previousState : (state as State);
//   //     }
//   //     return state; // If no history, return the current state
//   //   }
//   //
//   //   // Store the current state in history before processing the action
//   //   if (state !== undefined) {
//   //     history.push(state);
//   //   }
//   //
//   //   // Call the actual reducer
//   //   return reducer(state as State, action);
//   // };
// }
//
// // export const metaReducers: MetaReducer[] = [stateHistoryMetaReducer];
