import { GlobalState } from "little-state-machine";
import { Sections } from "../global";

export default function onMountSection(state: GlobalState, payload: keyof Sections | "previewForm") {
  return {
    ...state,
    currentSection: payload
  }
}