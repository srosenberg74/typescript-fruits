import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Item from "./components/ListItem";
import { FruitType, FruitsArray } from "./utils/fruitsData";
import Input from "./components/Input";
import AddFruit from "./components/AddFruit";
import StarredList from "./components/StarredList";

export default function App() {
  const [fruitsState, setFruitsState] = useState<FruitType[]>([]);
  const [tab, setTab] = useState<string>("list");

  useEffect(() => {
    setFruitsState(
      FruitsArray.sort((a: FruitType, b: FruitType) => {
        return a.price > b.price ? 1 : b.price > a.price ? -1 : 0;
      })
    );
  }, []);

  const handleSearch = (text: string) => {
    const searchResults: FruitType[] = FruitsArray.filter((fruit) =>
      fruit.name.toLowerCase().includes(text.toLowerCase())
    );
    setFruitsState(searchResults);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsHolder}>
        <TouchableOpacity style={[styles.tab, {borderBottomWidth: tab === "list" ? 0 : 1 }]} onPress={() => setTab("list")}>
          <Text>List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, {borderBottomWidth: tab === "starred" ? 0 : 1 }]} onPress={() => setTab("starred")}>
          <Text>Starred</Text>
        </TouchableOpacity>
        <View style={styles.afterTabs}></View>
      </View>
      {tab === "list" && (
        <>
          <View style={styles.search}>
            <Input
              icon="search"
              placeholder="Search"
              onChangeText={(text: string) => handleSearch(text)}
            />
          </View>
          <View style={styles.fruitList}>
            <FlatList
              data={fruitsState}
              renderItem={({ item }) => (
                <Item id={item.id} name={item.name} price={item.price} />
              )}
            />
          </View>
          <View style={styles.addFruits}>
            <AddFruit
              fruitsState={fruitsState}
              setFruitsState={setFruitsState}
            />
          </View>
        </>
      )}
      {tab === "starred" && (
        <>
          <StarredList />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
    marginTop: StatusBar.currentHeight,
  },
  flatList: {
    width: "100%",
  },
  search: {
    flexShrink: 1,
    paddingBottom: 20,
  },
  fruitList: {
    flexShrink: 1,
    paddingBottom: 20,
  },
  addFruits: {
    flexGrow: 1,
  },
  tabsHolder: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tab: {
    padding: 5,
    borderWidth: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 4,
    width: 74,
    textAlign: "center",
  },
  afterTabs: {
    borderBottomWidth: 1,
    flexGrow: 1,
  }
});
