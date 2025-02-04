import stylex from '@stylexjs/stylex';

const rotate = stylex.keyframes({
  'from': {
    transform: 'rotate(0deg)',
  },
  'to': {
    transform: 'rotate(360deg)',
  }
});

export const loaderIconStyle = stylex.create({
  style: {
    width: '12px',
    height: '12px',
    boxSizing: 'border-box',
    borderWidth: '2px',
    borderRadius: '100%',
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
    borderRightColor: '#616161',
    animationName: rotate,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  borderColor: (color: string) => ({
    borderColor: color,
  }),
  borderRightColor: (color: string) => ({
    borderRightColor: color,
  }),
});