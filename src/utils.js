/**
 * Utility functions for demo API
 */

/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Check if a string is a valid email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format user object for API response
 * @param {Object} user - User object
 * @returns {Object} Formatted user
 */
function formatUser(user) {
  return {
    id: user.id,
    name: capitalize(user.name),
    email: user.email,
    createdAt: new Date().toISOString()
  };
}

module.exports = {
  add,
  isValidEmail,
  capitalize,
  formatUser
};
