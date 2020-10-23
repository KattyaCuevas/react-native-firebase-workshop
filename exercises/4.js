import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Posts list</Text>
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
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b4cefe",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    color: "#292944",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
});
