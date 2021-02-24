import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { satoshisToBitcoin } from '../../utils/unit-conversion/BitcoinConversionUtils';
import CardStyles from '../../utils/styling/Cards';
import Colors from '../../utils/styling/Colors';
import HeadingStyles from '../../utils/styling/Headings';

const EstimatedPrizeSection = ({ estimatedPrize, isFetching }) => {
  const prizeText = useMemo(() => {
    if (estimatedPrize) {
      // return `${satoshisToBitcoin(estimatedPrize).toFixed(5)}`;
      return `${estimatedPrize}`;
    }
    return '';
  }, [estimatedPrize]);

  return (
    <View style={CardStyles.sectionCard}>
      {isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.mainContentContainer}>
          <Text style={[HeadingStyles.largeHeadlineLabel, styles.headlineLabelText]}>
            Estimated Prize (sats)
          </Text>

          <Text
            style={[HeadingStyles.largeHeadline, styles.headlineText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {prizeText}
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
    color: Colors.orange,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
});

EstimatedPrizeSection.propTypes = {
  estimatedPrize: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
};

EstimatedPrizeSection.defaultProps = {
  estimatedPrize: 0,
};

export default EstimatedPrizeSection;
