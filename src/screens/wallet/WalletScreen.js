import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, StyleSheet, SectionList, Share, Clipboard } from 'react-native';
// import Clipboard from '@react-native-community/clipboard';

import PropTypes from 'prop-types';
import {
  fetchTransactionHistory,
  generateCode,
  resetUserIsWinner,
} from '../../utils/networking/API';
import { sortTransactionsByDate } from '../../utils/transactions/TransactionUtils';
import Colors from '../../utils/styling/Colors';
import useUserAccountState from '../../utils/hooks/UseUserAccountState';
import Navbar from '../../components/Navbar';
import WalletDetailsSection from './WalletDetailsSection';
import TransactionHistorySection from './TransactionHistorySection';
import BottomSheet from 'reanimated-bottom-sheet';
import { FeedbackOverlayKind } from '../../utils/constants/FeedbackOverlays';
import DepositSheet from './DepositSheet';
import { Overlay } from 'react-native-elements';
import makeOverlayContent from '../../components/feedback-overlays/MakeOverlayContent';
import FeedbackOverlayStyles from '../../utils/styling/FeedbackOverlays';
import NavigationShape from '../../data/shapes/Navigation';
import ChampionAnnouncementModal from '../../components/ChampionAnnouncementModal';

export const SectionKind = Object.freeze({
  WALLET_BALANCE: 'WALLET_BALANCE',
  TRANSACTION_HISTORY: 'TRANSACTION_HISTORY',
});

function sectionListItemKeyExtractor(item, index) {
  return index;
}

const WalletScreen = ({ route }) => {
  const { userId } = route.params;
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isFetchingTransactionHistory, setIsFetchingTransactionHistory] = useState(false);
  const [hasTransactionHistoryFetchError, setHasTransactionHistoryFetchError] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  // Address/Clipboard
  const [address, setAddress] = useState('');

  const { userAccount, isFetchingUserAccount, hasUserAccountFetchError } = useUserAccountState(
    userId,
  );

  const [isShowingFeedbackOverlay, setIsShowingFeedbackOverlay] = useState(false);
  const [feedbackOverlayKind, setFeedbackOverlayKind] = useState(null);
  const [feedbackOverlayProps, setFeedbackOverlayProps] = useState({});

  const depositSheetRef = useRef(null);

  const sortedTransactions = useMemo(() => {
    return sortTransactionsByDate(transactionHistory, false);
  }, [transactionHistory]);

  const accountBalance = useMemo(() => {
    return userAccount === null ? 0 : userBalance;
  }, [userAccount, userBalance]);

  const generateAddress = useCallback(async () => {
    if (userAccount) {
      const response = await generateCode(userAccount.id);
      setAddress(response.data);
    }
  }, [userAccount]);

  useEffect(() => {
    if (userAccount !== null) {
      loadTransactionHistory(userAccount.id);
      generateAddress();
    }
  }, [userAccount, generateAddress]);

  useEffect(() => {
    if (userAccount !== null && typeof userAccount.isWinner === 'boolean') {
      setShowAnnouncementModal(true);
    }
  }, [userAccount]);

  async function loadTransactionHistory(userId) {
    setIsFetchingTransactionHistory(true);

    try {
      const response = await fetchTransactionHistory(userId);

      if (response.status === 200) {
        const { transactions, balance } = response.data;

        const transactionsHistory = transactions.map((transaction) => {
          return {
            id: `${transaction.id}`,
            kind: transaction.amount > 0 ? 'deposit' : 'withdraw',
            amount: Math.abs(transaction.amount),
            timestamp: transaction.createdAt,
          };
        });

        setTransactionHistory(transactionsHistory);
        setUserBalance(balance ? balance : 0);
        setHasTransactionHistoryFetchError(false);
      }
    } catch (error) {
      setHasTransactionHistoryFetchError(true);
    } finally {
      setIsFetchingTransactionHistory(false);
    }
  }

  function renderDepositSheet() {
    return (
      <DepositSheet
        address={address}
        onShareSelected={shareDepositAddress}
        onCopySelected={copyDepositAddress}
        onClose={hideDepositSheet}
      />
    );
  }

  function showDepositSheet() {
    depositSheetRef.current.snapTo(0);
  }

  function hideDepositSheet() {
    generateAddress();
    depositSheetRef.current.snapTo(1);
  }

  async function shareDepositAddress() {
    hideDepositSheet();

    await Share.share({
      message: address,
    });
  }

  async function copyDepositAddress() {
    const addressToSet = address;
    await Clipboard.setString(addressToSet);
    hideDepositSheet();
  }

  function handleWithdrawSelection() {
    if (accountBalance === 0) {
      activateFeedbackOverlay(FeedbackOverlayKind.EMPTY_BALANCE, { onClose: hideFeedbackOverlay });
    } else if (!userAccount.withdrawalAddress || !userAccount.withdrawAddressConfirmed) {
      activateFeedbackOverlay(FeedbackOverlayKind.CHECK_EMAIL_TO_CONFIRM_WITHDRAWAL_ADDRESS, {
        onClose: hideFeedbackOverlay,
      });
    } else {
      // performWithdrawal(accountBalance);
      activateFeedbackOverlay(FeedbackOverlayKind.BALANCE_TO_SEND, {
        userAccount: userAccount,
        onClose: hideFeedbackOverlay,
        loadTransactionHistory,
        amountAvailable: accountBalance,
      });
    }
  }

  function handleDepositCompletion() {
    activateFeedbackOverlay(FeedbackOverlayKind.DEPOSIT_COMPLETED, {
      onClose: hideFeedbackOverlay,
    });
  }

  function performWithdrawal(amountSent) {
    const overlayProps = {
      amountSent,
      onFollowSelected: hideFeedbackOverlay, // TODO: Implement transaction following somehow.
      onClose: hideFeedbackOverlay,
    };

    activateFeedbackOverlay(FeedbackOverlayKind.SENT_BTC_FOLLOW_ON_BLOCKCHAIN, overlayProps);
  }

  function activateFeedbackOverlay(overlayKind, props) {
    setFeedbackOverlayKind(overlayKind);
    setFeedbackOverlayProps(props);
    setIsShowingFeedbackOverlay(true);
  }

  function hideFeedbackOverlay() {
    setIsShowingFeedbackOverlay(false);
  }

  async function hideChampionModal() {
    await resetUserIsWinner(userId);
    setShowAnnouncementModal(false);
  }

  return (
    <View style={styles.rootViewContainer}>
      <SectionList
        contentContainerStyle={styles.contentContainer}
        sections={[
          {
            kind: SectionKind.WALLET_BALANCE,
            data: [userBalance],
            renderItem: () => {
              return (
                <View style={[styles.cardContainer, styles.viewSectionContainer]}>
                  <WalletDetailsSection
                    balance={accountBalance}
                    isFetching={isFetchingUserAccount}
                    onDepositSelected={showDepositSheet}
                    onSendSelected={handleWithdrawSelection}
                  />
                </View>
              );
            },
          },
          {
            kind: SectionKind.TRANSACTION_HISTORY,
            data: [transactionHistory],
            renderItem: () => {
              return (
                <View style={[styles.cardContainer, styles.viewSectionContainer]}>
                  <TransactionHistorySection
                    transactions={sortedTransactions}
                    isFetching={isFetchingTransactionHistory}
                  />
                </View>
              );
            },
          },
        ]}
        keyExtractor={sectionListItemKeyExtractor}
        stickySectionHeadersEnabled={false}
      />
      <BottomSheet
        ref={depositSheetRef}
        snapPoints={['60%', '0%']}
        initialSnap={1}
        borderRadius={16}
        renderContent={renderDepositSheet}
        enabledContentTapInteraction={false}
      />
      <Overlay
        isVisible={isShowingFeedbackOverlay}
        onBackdropPress={hideFeedbackOverlay}
        overlayStyle={FeedbackOverlayStyles.overlayWrapper}
      >
        {makeOverlayContent(feedbackOverlayKind, feedbackOverlayProps)}
      </Overlay>

      {/** Announcement if a user is a champion or loses */}
      <ChampionAnnouncementModal
        modalVisible={showAnnouncementModal}
        onClose={hideChampionModal}
        winner={userAccount ? !!userAccount.isWinner : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootViewContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: 'center',
  },

  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },

  cardContainer: {
    maxWidth: '100%',
    minWidth: '100%',
  },

  viewSectionContainer: {
    marginBottom: 20,
  },
});

WalletScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

WalletScreen.defaultProps = {};

WalletScreen.navigationOptions = ({ route }) => {
  return {
    header: () => {
      return <Navbar title="Savings" logout={route.params?.logout} />;
    },
  };
};

export default WalletScreen;
