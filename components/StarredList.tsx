import React, { FC, useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Item from "../components/ListItem";
import { StarredFruitsArray } from "../utils/fruitsData";

const StarredList: FC = () => {
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    let interval = setInterval(() => setRefresh(!refresh), 100);
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.fruitList}>
      <FlatList
        data={StarredFruitsArray}
        renderItem={({ item }) => (
          <Item id={item.id} name={item.name} price={item.price} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  starredList: {
    flex: 1,
    width: "100%",
  },
  fruitList: {
    flexShrink: 1,
    paddingBottom: 20,
  },
});

export default StarredList;
