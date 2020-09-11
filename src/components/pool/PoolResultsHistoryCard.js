import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../utils/styling/Colors';
import CardStyles from '../../utils/styling/Cards';
import PoolResultShape from '../../data/model-shapes/PoolResult';
import HeadingStyles from '../../utils/styling/Headings';
import PoolResultListItem from './PoolResultListItem';

const keyExtractor = ({ drawingTimestamp }) => `${drawingTimestamp}`;

const PoolResultsHistoryCard = ({ results, isFetching }) => {
  function renderResultItem({ item: poolResult }) {
    return <PoolResultListItem result={poolResult} />;
  }

  const ColumnHeadingsRow = () => {
    return (
      <View style={styles.columnHeadingsRow}>
        <Text style={[HeadingStyles.listHeadingLabel, styles.columnHeading]}>Prize (BTC)</Text>
        <Text style={[HeadingStyles.listHeadingLabel, styles.columnHeading]}>Winner</Text>
        <Text
          style={[HeadingStyles.listHeadingLabel, styles.columnHeading, styles.rightColumnHeading]}
        >
          Date
        </Text>
      </View>
    );
  };

  return (
    <View style={CardStyles.sectionCard}>
      <Text style={[HeadingStyles.listSectionHeading, styles.sectionHeading]}>Pool History</Text>

      <ColumnHeadingsRow />

      {isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList data={results} keyExtractor={keyExtractor} renderItem={renderResultItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeading: {
    color: Colors.purple,
    textTransform: 'uppercase',
  },

  columnHeadingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  columnHeading: {
    color: Colors.purple,
    flex: 1,
    textAlign: 'left',
  },

  rightColumnHeading: {
    textAlign: 'right',
  },
});

PoolResultsHistoryCard.propTypes = {
  results: PropTypes.arrayOf(PoolResultShape).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

PoolResultsHistoryCard.defaultProps = {};

export default PoolResultsHistoryCard;
