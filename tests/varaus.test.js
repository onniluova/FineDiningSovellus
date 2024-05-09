/**
 * @jest-environment jsdom
 */

describe('resetBalls', () => {
  const varaus = require('../JS/varaus');

  it('returns all balls to their original size and color', () => {
    // Simulate a state where the balls have been modified
    const balls = Array.from(document.querySelectorAll('[id^="pallo"]'));
    balls.forEach((ball, i) => {
      ball.style.backgroundColor = i < 2 ? '#091235' : '#cbbca4';
      ball.style.width = i < 2 ? '110px' : '100px';
      ball.style.height = i < 2 ? '110px' : '100px';
    });

    varaus.resetBalls();

    // Check that all balls have been returned to their original state
    balls.forEach(ball => {
      expect(ball.style.backgroundColor).toBe('#cbbca4');
      expect(ball.style.width).toBe('100px');
      expect(ball.style.height).toBe('100px');
    });
  });
});
