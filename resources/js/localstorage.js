// src/utils/storageTTL.js
const ms = (minutes) => minutes * 60 * 1000;

export function setWithTTL(key, value, minutes = 10) {
  const expires = Date.now() + ms(minutes);
  const payload = {
    value,
    expires
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function getWithTTL(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const { value, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch (e) {
    // corrupted value — remove it
    localStorage.removeItem(key);
    return null;
  }
}

export function removeKey(key) {
  localStorage.removeItem(key);
}
