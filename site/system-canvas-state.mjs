// Pure, immutable state transitions. No DOM, timers, or framework dependency.
// Invalid actions and unknown IDs are no-ops; only normalized states are exposed.
export function initialState(config) {
  const kind = config.kind;
  if (kind === "map") return { kind, view: config.lenses[0].id, leversOpen: false, lever: null };
  if (kind === "case") return { kind, lens: 0, intervention: 0 };
  if (kind === "worksheet") return {
    kind, lens: 0, answers: { ...config.example }, notes: {},
    notice: "Example loaded. Work stays in this browser tab; export JSON to keep it."
  };
  throw new TypeError("Unknown System Canvas component");
}
const has = (values, key) => Object.prototype.hasOwnProperty.call(values, key);
export function reduce(state, action, config) {
  if (!state || !action || typeof action.type !== "string") return state;
  if (state.kind === "map") {
    switch (action.type) {
      case "view.select":
        return typeof action.id === "string" && config.lenses.some(v=>v.id===action.id)
          ? { ...state, view: action.id } : state;
      case "levers.toggle":
        return typeof action.open === "boolean"
          ? { ...state, leversOpen: action.open, lever: action.open ? state.lever : null } : state;
      case "lever.select":
        return state.leversOpen && typeof action.id === "string" && config.leverage.some(v=>v.id===action.id)
          ? { ...state, lever: action.id } : state;
      default: return state;
    }
  }
  if (state.kind === "case") {
    switch (action.type) {
      case "lens.select":
        return Number.isInteger(action.index) && action.index>=0 && action.index<config.views.length
          ? { ...state, lens: action.index } : state;
      case "intervention.select":
        return Number.isInteger(action.index) && action.index>=0 && action.index<config.changes.length
          ? { ...state, intervention: action.index } : state;
      default: return state;
    }
  }
  if (state.kind === "worksheet") {
    switch (action.type) {
      case "lens.select":
        return Number.isInteger(action.index) && action.index>=0 && action.index<config.lenses.length
          ? { ...state, lens: action.index } : state;
      case "answer.edit":
        return typeof action.key==="string" && has(config.example,action.key) && typeof action.value==="string"
          ? { ...state, answers: { ...state.answers, [action.key]: action.value }, notice: "Unsaved edits. Export JSON to keep a copy." } : state;
      case "note.edit": {
        const lens=config.lenses[state.lens];
        return lens && typeof action.value==="string"
          ? { ...state, notes: { ...state.notes, [lens[0]]: action.value }, notice: "Unsaved edits. Export JSON to keep a copy." } : state;
      }
      case "worksheet.blank":
        return { ...state, answers: Object.fromEntries(Object.keys(config.example).map(key=>[key,""])), notes:{}, notice:"Blank canvas ready." };
      case "worksheet.example":
        return { ...state, answers:{...config.example}, notes:{}, notice:"Hypothetical example restored." };
      default: return state;
    }
  }
  return state;
}
export function assertValid(state, config) {
  if (state.kind!==config.kind) return false;
  if (state.kind==="map")
    return config.lenses.some(x=>x.id===state.view)
      && typeof state.leversOpen==="boolean"
      && (state.lever===null || (state.leversOpen && config.leverage.some(x=>x.id===state.lever)));
  if (state.kind==="case")
    return Number.isInteger(state.lens) && state.lens>=0 && state.lens<config.views.length
      && Number.isInteger(state.intervention) && state.intervention>=0 && state.intervention<config.changes.length;
  if (state.kind==="worksheet")
    return Number.isInteger(state.lens) && state.lens>=0 && state.lens<config.lenses.length
      && Object.keys(state.answers).length===Object.keys(config.example).length
      && Object.keys(config.example).every(k=>has(state.answers,k)&&typeof state.answers[k]==="string")
      && Object.keys(state.notes).every(k=>config.lenses.some(v=>v[0]===k)&&typeof state.notes[k]==="string")
      && typeof state.notice==="string";
  return false;
}
