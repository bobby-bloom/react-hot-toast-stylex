import * as stylex from '@stylexjs/stylex';
import * as React from 'react';

import {
  resolveValue,
  ToasterProps,
  ToastPosition,
  ToastWrapperProps,
} from '../core/types';
import { useToaster } from '../core/use-toaster';
import { prefersReducedMotion } from '../core/utils';
import { ToastBar } from './toast-bar';

const ToastWrapper = ({
  id,
  className,
  styles,
  onHeightUpdate,
  children,
}: ToastWrapperProps) => {
  const ref = React.useCallback(
    (el: HTMLElement | null) => {
      if (el) {
        const updateHeight = () => {
          const height = el.getBoundingClientRect().height;
          onHeightUpdate(id, height);
        };
        updateHeight();
        new MutationObserver(updateHeight).observe(el, {
          subtree: true,
          childList: true,
          characterData: true,
        });
      }
    },
    [id, onHeightUpdate]
  );

  return (
    <div
      ref={ref}
      className={className}
      {...stylex.props(styles)}
    >
      {children}
    </div>
  );
};

const positionStyles = stylex.create({
  base: {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
  transitionTransform: (
    transform: string,
    transition?: string
  ) => ({
    transition: transition,
    transform: transform,
  }),
  horizontalAligment: (
    horizontal: 'center' | 'flex-end' | null
  ) => ({
    justifyContent: horizontal,
  }),
});

const getPositionStyle = (
  position: ToastPosition, offset: number
) => {
  const top = position.includes('top');
  const center = position.includes('center');
  const right = position.includes('right');

  const transition = prefersReducedMotion()
    ? undefined
    : 'all 230ms cubic-bezier(.21,1.02,.73,1)';

  const transform = `translateY(${offset * (top ? 1 : -1)}px)`;

  const positionStyle = [
    positionStyles.base,
    top
      ? positionStyles.top
      : positionStyles.bottom,
    positionStyles.transitionTransform(
      transform,
      transition
    ),
    positionStyles.horizontalAligment(
      center
        ? 'center'
        : right
          ? 'flex-end'
          : null
    ),
  ];

  return positionStyle;
};

const DEFAULT_OFFSET = 16;

const toasterStyles = stylex.create({
  container: {
    position: 'fixed',
    zIndex: 9999,
    top: DEFAULT_OFFSET,
    left: DEFAULT_OFFSET,
    right: DEFAULT_OFFSET,
    bottom: DEFAULT_OFFSET,
    pointerEvents: 'none',
  },
  activeClass: {
    zIndex: 9999,
  },
});

export const Toaster: React.FC<ToasterProps> = ({
  reverseOrder,
  position = 'top-center',
  toastOptions,
  gutter,
  children,
  containerStyles,
  containerClassName,
  toastWrapperStyles,
  toastWrapperClassName,
}) => {
  const { toasts, handlers } = useToaster(toastOptions);

  return (
    <div
      className={containerClassName}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
      {...stylex.props(toasterStyles.container, containerStyles)}
    >
      {toasts.map((t) => {
        const toastPosition = t.position || position;
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        });
        const positionStyle = getPositionStyle(toastPosition, offset);

        return (
          <ToastWrapper
            id={t.id}
            key={t.id}
            onHeightUpdate={handlers.updateHeight}
            styles={[
              positionStyle,
              t.visible ? toasterStyles.activeClass : null,
              toastWrapperStyles
            ]}
            className={toastWrapperClassName}
          >
            {t.type === 'custom' ? (
              resolveValue(t.message, t)
            ) : children ? (
              children(t)
            ) : (
              <ToastBar toast={t} position={toastPosition} />
            )}
          </ToastWrapper>
        );
      })}
    </div>
  );
};
