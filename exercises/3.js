import React from "react";
import { View, Text, FlatList } from "react-native";

import firebase from "../firebase";

export default function App() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    // Write a query to get the collection of posts, ordered by
    // the `createdAt` field in descendant order and save it in the
    // state above
  }, []);

  return (
    <View>
      <Text>Posts list</Text>
      <FlatList
        data={posts}
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
