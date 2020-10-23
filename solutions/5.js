import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import firebase from "../firebase";

function NewPostForm({ setPosts }) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");

  function createPost() {
    const post = { title, body, author, createdAt: new Date() };
    firebase
      .collection("posts")
      .add(post)
      .then((response) => {
        setTitle("");
        setBody("");
        setAuthor("");
        setPosts((posts) => [{ ...post, id: response.id }, ...posts]);
      });
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Title"
        style={styles.textInput}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Body"
        style={styles.textInput}
        value={body}
        onChangeText={(text) => setBody(text)}
        multiline={true}
      />
      <TextInput
        placeholder="Author"
        style={styles.textInput}
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />
      <TouchableOpacity onPress={createPost} style={styles.createButton}>
        <Text>AGREGAR</Text>
      </TouchableOpacity>
    </View>
  );
}

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
      <NewPostForm setPosts={setPosts} />

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
  formContainer: {
    width: "100%",
    padding: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#b7b7b7",
    height: 24,
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  createButton: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 15,
  },
});
