const prefix = 'ai901:v1:';
export function read(key, fallback) { try { return JSON.parse(localStorage.getItem(prefix + key)) ?? fallback; } catch { return fallback; } }
export function write(key, value) { try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; } catch { return false; } }
export function remove(key) { localStorage.removeItem(prefix + key); }
