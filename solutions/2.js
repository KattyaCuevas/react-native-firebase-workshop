import React from "react";
import { View, Text, FlatList } from "react-native";
import { POSTS } from "../utils/data";

export default function App() {
  return (
    <View>
      <Text>Posts list</Text>
      <FlatList
        data={POSTS}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text>{item.author}</Text>
          </View>
        )}
        keyExtractor={(post) => post.id}
      />
    </View>
  );
}
