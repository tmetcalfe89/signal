import { addToSet, get, removeFromList } from "@tmetcalfe89/keychain";

const signals = {};

function on(type, callback) {
  if (!(type in signals)) {
    signals[type] = [];
  }
  addToSet(`${type}.listeners`, callback, signals);
}

function off(type, callback) {
  if (!(type in signals)) {
    return;
  }
  removeFromList(`${type}.listeners`, callback, signals);
}

function emit(type, payload) {
  get(`${type}.listeners`, signals)?.forEach((cb) => cb(payload));
}

export { on, off, emit };
