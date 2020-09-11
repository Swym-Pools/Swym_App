import React from 'react';
import { FeedbackOverlayKind } from '../../utils/constants/FeedbackOverlays';
import EmptyBalanceOverlayContent from './EmptyBalanceOverlayContent';

export default function makeOverlayContent(overlayKind, props = {}) {
  switch (overlayKind) {
    case FeedbackOverlayKind.EMPTY_BALANCE:
      return <EmptyBalanceOverlayContent {...props} />;
    default:
      break;
  }
}
