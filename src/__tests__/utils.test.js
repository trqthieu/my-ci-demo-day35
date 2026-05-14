const { add, isValidEmail, capitalize, formatUser } = require('../utils');

describe('Utils Functions', () => {
  describe('add()', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should add negative numbers', () => {
      expect(add(-5, 3)).toBe(-2);
    });

    test('should add zero', () => {
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('isValidEmail()', () => {
    test('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co')).toBe(true);
    });

    test('should reject invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test @example.com')).toBe(false);
    });
  });

  describe('capitalize()', () => {
    test('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    test('should handle already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    test('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('should handle non-string input', () => {
      expect(capitalize(null)).toBe('');
      expect(capitalize(undefined)).toBe('');
    });
  });

  describe('formatUser()', () => {
    test('should format user object correctly', () => {
      const user = {
        id: 1,
        name: 'john',
        email: 'john@example.com'
      };

      const result = formatUser(user);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('name', 'John');
      expect(result).toHaveProperty('email', 'john@example.com');
      expect(result).toHaveProperty('createdAt');
      expect(result.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    test('should capitalize user name', () => {
      const user = {
        id: 2,
        name: 'alice',
        email: 'alice@example.com'
      };

      const result = formatUser(user);
      expect(result.name).toBe('Alice');
    });
  });
});
