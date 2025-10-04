// utils/generateId.js
const crypto = require('crypto');

function generateShortId(length = 6) {
  // base62-like friendly ID using random bytes
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const bytes = crypto.randomBytes(length);
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[bytes[i] % chars.length];
  }
  return id;
}

module.exports = generateShortId;
