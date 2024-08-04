import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function Page() {
  const { authState } = useAuth();
  useEffect(() => {
    const auth = async () => {
      if (authState.authenticated && authState.user) {
        router.replace(`(auth)/${authState.user.role}`);
      }
    };

    auth();
  }, [authState]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Link href={"_sitemap"}>To Site map</Link>
        <Link href={"login"}>To Login</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
