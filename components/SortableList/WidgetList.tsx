import React from 'react';
import { View } from 'react-native';

import { MARGIN } from './Config';
import SortableList from './SortableList';
import Tile from './Tile';

const tiles = [
  {
    id: 'spent',
  },
  {
    id: 'cashback',
  },
  {
    id: 'recent',
  },
  {
    id: 'cards',
  },
];

const WidgetList = () => {
  return (
    <View
      style={{
        marginBottom: 80,
        paddingHorizontal: MARGIN,
        paddingTop: 10,
      }}>
      <SortableList editing={true}>
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + '-' + index}
            id={tile.id}
          />
        ))}
      </SortableList>
    </View>
  );
};

export default WidgetList;
