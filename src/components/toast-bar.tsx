import * as React from 'react';
import stylex, { StyleXStyles } from '@stylexjs/stylex';

import { Toast, ToastPosition, resolveValue, Renderable } from '../core/types';
import { ToastIcon } from './toast-icon';
import { prefersReducedMotion } from '../core/utils';

const enterTopAnimation = stylex.keyframes({
  '0%': {
    transform: 'translate3d(0,-200%,0) scale(.6)',
    opacity: 0.5,
  },
  '100%': {
    transform: 'translate3d(0,0,0) scale(1)',
    opacity: 1,
  }
});

const enterBottomAnimation = stylex.keyframes({
  '0%': {
    transform: 'translate3d(0,200%,0) scale(.6)',
    opacity: 0.5,
  },
  '100%': {
    transform: 'translate3d(0,0,0) scale(1)',
    opacity: 1,
  }
});

const exitTopAnimation = stylex.keyframes({
  '0%': {
    transform: 'translate3d(0,0,-1px) scale(1)',
    opacity: 1,
  },
  '100%': {
    transform: 'translate3d(0,-150%,-1px) scale(.6)',
    opacity: 0,
  }
});

const exitBottomAnimation = stylex.keyframes({
  '0%': {
    transform: 'translate3d(0,0,-1px) scale(1)',
    opacity: 1,
  },
  '100%': {
    transform: 'translate3d(0,150%,-1px) scale(.6)',
    opacity: 0,
  }
});

const fadeInAnimation = stylex.keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const fadeOutAnimation = stylex.keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const componentStyles = stylex.create({
  barBase: {
    display: 'flex',
    maxWidth: '350px',
    alignItems: 'center',
    paddingBlock: '8px',
    paddingInline: '10px',
    lineHeight: 1.3,
    background: '#fff',
    color: '#363636',
    willChange: 'transform',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    pointerEvents: 'auto'
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    marginBlock: '4px',
    marginInline: '10px',
    color: 'inherit',
    flex: '1 1 auto',
    whiteSpace: 'pre-line',
  },
  hidden: {
    opacity: 0,
  }
});

const animationStyles = stylex.create({
  enterAnimation: (enter: string) => ({
    animation: enter,
    animationDuration: '0.35s',
    animationTimingFunction: 'cubic-bezier(.21,1.02,.73,1)',
    animationFillMode: 'forwards',
  }),
  exitAnimation: (exit: string) => ({
    animation: exit,
    animationDuration: '0.4s',
    animationTimingFunction: 'cubic-bezier(.06,.71,.55,1)',
    animationFillMode: 'forwards',
  }),
});

interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  styles?: StyleXStyles;
  children?: (components: {
    icon: Renderable;
    message: Renderable;
  }) => Renderable;
}

const getAnimationStyle = (
  position: ToastPosition,
  visible: boolean
): StyleXStyles => {
  const top = position.includes('top');

  const [enter, exit] = prefersReducedMotion()
    ? [fadeInAnimation, fadeOutAnimation]
    : [
      top
        ? enterTopAnimation
        : enterBottomAnimation,
      top
        ? exitTopAnimation
        : exitBottomAnimation
    ];

  return visible
    ? animationStyles.enterAnimation(enter)
    : animationStyles.exitAnimation(exit)
};

export const ToastBar: React.FC<ToastBarProps> = React.memo(
  ({ toast, position, styles, children }) => {
    const animationStyle = toast.height
      ? getAnimationStyle(
        toast.position || position || 'top-center',
        toast.visible
      )
      : componentStyles.hidden;

    const icon = <ToastIcon toast={toast} />;
    const message = (
      <div
        {...stylex.props(componentStyles.message)}
        {...toast.ariaProps}
      >
        {resolveValue(toast.message, toast)}
      </div>
    );

    return (
      <div
        className={toast.className}
        {...stylex.props(
          componentStyles.barBase,
          animationStyle,
          styles,
          toast.style
        )}
      >
        {typeof children === 'function' ? (
          children({
            icon,
            message,
          })
        ) : (
          <>
            {icon}
            {message}
          </>
        )}
      </div>
    );
  }
);
