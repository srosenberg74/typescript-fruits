import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FruitType, StarredFruitsArray } from "../utils/fruitsData";
import { FontAwesome } from "@expo/vector-icons";

const Item: FC<FruitType> = (props) => {
  const [starred, setStarred] = useState<boolean>(false);

  useEffect(() => {
    if (StarredFruitsArray.find((item) => item.name === props.name)) {
      setStarred(true);
    }
  }, []);

  const addToStarred = (id: number, name: string, price: number) => {
    const newItem: FruitType = { id, name, price };
    StarredFruitsArray.push(newItem);
    setStarred(true);
  };

  const removeFromStarred = (id: number) => {
    const itemToDelete = StarredFruitsArray.filter((item) => item.id === id);
    const index = StarredFruitsArray.indexOf(itemToDelete[0]);
    StarredFruitsArray.splice(index, 1);
    setStarred(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Pressable
          onPress={() =>
            starred
              ? removeFromStarred(props.id)
              : addToStarred(props.id, props.name, props.price)
          }
        >
          {!starred ? (
            <FontAwesome name="star-o" size={24} color="black" />
          ) : (
            <FontAwesome name="star" size={24} color="black" />
          )}
        </Pressable>
        <Text style={styles.item}>{props.name}</Text>
      </View>
      <Text style={styles.item}>{props.price}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    padding: 10,
  },
  item: {
    padding: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  label: {
    flexDirection: "row",
  },
});
