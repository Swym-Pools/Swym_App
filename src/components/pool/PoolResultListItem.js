import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PoolResultShape from '../../data/model-shapes/PoolResult';
import { ListItem } from 'react-native-elements';
import { satoshisToBitcoin } from '../../utils/unit-conversion/BitcoinConversionUtils';
import Colors from '../../utils/styling/Colors';
import moment from 'moment';

const PoolResultListItem = ({ result }) => {
  const prizeText = useMemo(() => {
    // return `${satoshisToBitcoin(result.prize).toFixed(5)}`;
    return `${result.prize}`;
  }, [result.prize]);

  const dateText = useMemo(() => {
    return moment(result.drawingTimestamp).format('M/D/YY');
  }, [result.drawingTimestamp]);

  return (
    <ListItem key={`{result.drawingTimeStamp}`} containerStyle={styles.listItemContainer}>
      {/* <ListItem.Content> */}
      <ListItem.Title style={styles.textItem} numberOfLines={1}>
        {prizeText.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
      </ListItem.Title>
      <ListItem.Title style={styles.textItem} numberOfLines={1} ellipsizeMode="tail">
        {result.winnerUsername}
      </ListItem.Title>
      {/* </ListItem.Content> */}
      <ListItem.Title style={[styles.textItem, styles.dateTextItem]} numberOfLines={1}>
        {dateText}
      </ListItem.Title>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 0,
  },

  textItem: {
    color: Colors.purple,
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
  },

  dateTextItem: {
    textAlign: 'right',
  },
});

PoolResultListItem.propTypes = {
  result: PoolResultShape.isRequired,
};

PoolResultListItem.defaultProps = {};

export default PoolResultListItem;
