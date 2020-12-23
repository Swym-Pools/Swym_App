import React from 'react';
import { FeedbackOverlayKind } from '../../utils/constants/FeedbackOverlays';
import CheckEmailToConfirmWithdrawalAddressOverlayContent from './CheckEmailToConfirmWithdrawalAddressOverlayContent';
import DepositCompletedOverlayContent from './DepositCompletedOverlayContent';
import EmptyBalanceOverlayContent from './EmptyBalanceOverlayContent';
import SentBTCFollowOnBlockchainOverlayContent from './SentBTCFollowOnBlockchainOverlayContent';
import ChampionOverlayContent from './ChampionOverlayContent';
import BalanceToSendContent from './BalanceToSendContent';

export default function makeOverlayContent(overlayKind, props = {}) {
  switch (overlayKind) {
    case FeedbackOverlayKind.EMPTY_BALANCE:
      return <EmptyBalanceOverlayContent {...props} />;
    case FeedbackOverlayKind.CHECK_EMAIL_TO_CONFIRM_WITHDRAWAL_ADDRESS:
      return <CheckEmailToConfirmWithdrawalAddressOverlayContent {...props} />;
    case FeedbackOverlayKind.SENT_BTC_FOLLOW_ON_BLOCKCHAIN:
      return <SentBTCFollowOnBlockchainOverlayContent {...props} />;
    case FeedbackOverlayKind.DEPOSIT_COMPLETED:
      return <DepositCompletedOverlayContent {...props} />;
    // case FeedbackOverlayKind.CHAMPION_ANNOUNCEMENT:
    //   return <ChampionOverlayContent {...props} />;
    default:
    case FeedbackOverlayKind.BALANCE_TO_SEND:
      return <BalanceToSendContent {...props} />;
    // default:
    //   return;
  }
}
