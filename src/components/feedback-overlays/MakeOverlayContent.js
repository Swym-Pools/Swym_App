import React from 'react';
import { FeedbackOverlayKind } from '../../utils/constants/FeedbackOverlays';
import CheckEmailToConfirmWithdrawalAddressOverlayContent from './CheckEmailToConfirmWithdrawalAddressOverlayContent';
import EmptyBalanceOverlayContent from './EmptyBalanceOverlayContent';

export default function makeOverlayContent(overlayKind, props = {}) {
  switch (overlayKind) {
    case FeedbackOverlayKind.EMPTY_BALANCE:
      return <EmptyBalanceOverlayContent {...props} />;
    case FeedbackOverlayKind.CHECK_EMAIL_TO_CONFIRM_WITHDRAWAL_ADDRESS:
      return <CheckEmailToConfirmWithdrawalAddressOverlayContent {...props} />;
    default:
      break;
  }
}
