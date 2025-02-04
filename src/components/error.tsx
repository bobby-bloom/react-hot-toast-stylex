import stylex from '@stylexjs/stylex';

const circleAnimation = stylex.keyframes({
  'from': {
    transform: 'scale(0) rotate(45deg)',
    opacity: 0,
  },
  'to': {
    transform: 'scale(1) rotate(45deg)',
    opacity: 1,
  }
});

const firstLineAnimation = stylex.keyframes({
  'from': {
    transform: 'scale(0)',
    opacity: 0,
  },
  'to': {
    transform: 'scale(1)',
    opacity: 1,
  }
});

const secondLineAnimation = stylex.keyframes({
  'from': {
    transform: 'scale(0) rotate(90deg)',
    opacity: 0,
  },
  'to': {
    transform: 'scale(1) rotate(90deg)',
    opacity: 1,
  }
});

export const errorIconStyle = stylex.create({
  wrapper: {
    width: '20px',
    height: '20px',
    opacity: 0,
    backgroundColor: '#ff4b4b',
    borderRadius: '10px',
    position: 'relative',
    transform: 'rotate(45deg)',
    animationName: circleAnimation,
    animationDuration: '0.3s',
    animationDelay: '100ms',
    animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    animationFillMode: 'forwards',
  },
  wrapperBgColor: (color: string) => ({
    backgroundColor: color,
  }),
  icon: {
    position: 'absolute',
    width: '12px',
    height: '2px',
    opacity: 0,
    borderRadius: '3px',
    backgroundColor: '#fff',
    animationDuration: '0.15s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
    bottom: '9px',
    left: '4px',
  },
  iconBgColor: (color: string) => ({
    backgroundColor: color,
  }),
  iconP1: {
    animationName: firstLineAnimation,
    animationDelay: '150ms',
  },
  iconP2: {
    animationName: secondLineAnimation,
    animationDelay: '180ms',
  },
});