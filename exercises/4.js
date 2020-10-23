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
        collection.forEach((doc) =>
          newPosts.push({ id: doc.id, ...doc.data() })
        );
        setPosts(newPosts);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Posts list</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          // Add style prop to the bellow components
          <View>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text>{item.author}</Text>
          </View>
        )}
        keyExtractor={(post) => post.id}
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
  // Add styles to the post item component
  // At least, the title, the body and the author
  // should have different font sizes,
  // space between the posts,
  // and padding to every post container
});
