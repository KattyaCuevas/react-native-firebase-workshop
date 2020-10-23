import React from "react";
import { View, Text, FlatList } from "react-native";

import firebase from "../firebase";

export default function App() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    firebase
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((collection) => {
        const newPosts = [];
        collection.forEach(doc => newPosts.push(doc.data()));
        setPosts(newPosts);
      }).catch(error => console.log(error));
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
        keyExtractor={(post) => Number(post.id)}
      />
    </View>
  );
}
