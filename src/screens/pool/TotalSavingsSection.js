import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { satoshisToBitcoin } from '../../utils/unit-conversion/BitcoinConversionUtils';
import CardStyles from '../../utils/styling/Cards';
import Colors from '../../utils/styling/Colors';
import HeadingStyles from '../../utils/styling/Headings';

const TotalSavingsSection = ({ totalSavings, isFetching }) => {
  const savingsText = useMemo(() => {
    if (totalSavings) {
      return `${satoshisToBitcoin(totalSavings).toFixed(5)}`;
    }
    return '';
  }, [totalSavings]);

  return (
    <View style={CardStyles.sectionCard}>
      {isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.mainContentContainer}>
          <Text style={[HeadingStyles.largeHeadlineLabel, styles.headlineLabelText]}>
            Total Savings (BTC)
          </Text>

          <Text
            style={[HeadingStyles.largeHeadline, styles.headlineText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {savingsText}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    alignItems: 'center',
  },

  headlineLabelText: {
    color: Colors.deepblue,
  },

  headlineText: {
    color: Colors.blue,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
});

TotalSavingsSection.propTypes = {
  totalSavings: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
};

TotalSavingsSection.defaultProps = {
  totalSavings: 0,
};

export default TotalSavingsSection;
