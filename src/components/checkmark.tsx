import stylex from '@stylexjs/stylex'

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

const checkmarkAnimation = stylex.keyframes({
  '0%': {
    height: 0,
    width: 0,
    opacity: 0,
  },
  '40%': {
    height: 0,
    width: '6px',
    opacity: 1,
  },
  '100%': {
    opacity: 1,
    height: '10px',
  },
});

export const checkmarkIconStyle = stylex.create({
  wrapper: {
    position: 'relative',
    minWidth: '20px',
    minHeight: '20px',
    opacity: 0,
    backgroundColor: '#61d345',
    borderRadius: '10px',
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
    right: '7.5px',
    top: '4.5px',
    width: '6px',
    minHeight: '10px',
    opacity: 0,
    boxSizing: 'border-box',
    borderTopWidth: '0px',
    borderRightWidth: '2px',
    borderBottomWidth: '2px',
    borderLeftWidth: '0px',
    borderStyle: 'solid',
    borderColor: '#fff',
    animationName: checkmarkAnimation,
    animationDuration: '0.2s',
    animationDelay: '200ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
  },
  iconBorderColor: (color: string) => ({
    borderColor: color,
  }),
});