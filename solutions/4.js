import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
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
          <View style={styles.postContainer}>
            <Text style={styles.postHeading}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
            <Text style={styles.postAuthor}>{item.author}</Text>
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
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 10,
  },
  postContainer: {
    backgroundColor: "#e7edf7",
    marginBottom: 10,
    padding: 10,
  },
  postHeading: {
    color: "#292944",
    fontSize: 20,
  },
  postBody: {
    fontSize: 16,
  },
  postAuthor: {
    textAlign: "right",
    fontSize: 12,
  },
});
