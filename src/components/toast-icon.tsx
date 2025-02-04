import * as React from 'react';
import * as stylex from '@stylexjs/stylex';

import { Toast } from '../core/types';
import { errorIconStyle } from './error';
import { loaderIconStyle } from './loader';
import { checkmarkIconStyle } from './checkmark';

const enter = stylex.keyframes({
  'from': {
    transform: 'scale(0.6)',
    opacity: 0.4,
  },
  'to': {
    transform: 'scale(1)',
    opacity: 1,
  }
});

const styles = stylex.create({
  statusWrapper: {
    position: 'absolute',
  },
  indicatorWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '20px',
    minHeight: '20px',
  },
  animatedIconWrapper: {
    position: 'relative',
    transform: 'scale(0.6)',
    opacity: 0.4,
    minWidth: '20px',
    animation: enter,
    animationDuration: '0.3s',
    animationDelay: '0.12s',
    animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    animationFillMode: 'forwards',
  },
});

export const ToastIcon: React.FC<{
  toast: Toast;
}> = ({ toast }) => {
  const { icon, type, iconTheme } = toast;
  if (icon !== undefined) {
    if (typeof icon === 'string') {
      return (
        <div {...stylex.props(styles.animatedIconWrapper)}>
          {icon}
        </div>
      );
    } else {
      return icon;
    }
  }

  if (type === 'blank') {
    return null;
  }

  return (
    <div {...stylex.props(styles.indicatorWrapper)}>
      <div {...stylex.props(
        loaderIconStyle.style,
        (iconTheme?.primary ? loaderIconStyle.borderColor(iconTheme.primary) : null),
        (iconTheme?.secondary ? loaderIconStyle.borderRightColor(iconTheme.secondary) : null),
      )} />
      {type !== 'loading' && (
        <div {...stylex.props(styles.statusWrapper)}>
          {type === 'error' ? (
            <div {...stylex.props(
              errorIconStyle.wrapper,
              iconTheme?.primary
                ? errorIconStyle.wrapperBgColor(iconTheme.primary)
                : null,
            )}>
              <div {...stylex.props(
                errorIconStyle.icon,
                errorIconStyle.iconP1,
                iconTheme?.secondary
                  ? errorIconStyle.iconBgColor(iconTheme.secondary)
                  : null
              )} />
              <div {...stylex.props(
                errorIconStyle.icon,
                errorIconStyle.iconP2,
                iconTheme?.primary
                  ? errorIconStyle.iconBgColor(iconTheme.secondary)
                  : null
              )} />
            </div>
          ) : (
            <div {...stylex.props(
              checkmarkIconStyle.wrapper,
              iconTheme?.primary
                ? checkmarkIconStyle.wrapperBgColor(iconTheme.primary)
                : null,
            )} >
              <div {...stylex.props(
                checkmarkIconStyle.icon,
                iconTheme?.secondary
                  ? checkmarkIconStyle.iconBorderColor(iconTheme.secondary)
                  : null,
              )} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};