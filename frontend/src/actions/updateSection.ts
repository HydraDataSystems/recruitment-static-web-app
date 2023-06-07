import { GlobalState } from "little-state-machine";

export default function updateSection<T>(state: GlobalState, payload: T) {
  return {
    ...state,
    sections: {
      ...state.sections,
      [state.currentSection]: {
        ...payload,
        status: "COMPLETE"
      }
    }
  }
}