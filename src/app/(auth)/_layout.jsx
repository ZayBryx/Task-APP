import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth, Role } from "../../context/authContext";

const AuthRootLayout = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const { authenticated, user } = authState;
  const { role } = user;

  useEffect(() => {
    const navigate = () => {
      if (authenticated && role === Role.ADMIN) {
        router.replace("/admin");
      } else if (authenticated && role === Role.USER) {
        router.replace("/user");
      } else {
        router.replace("/");
      }
    };

    if (!authenticated) {
      navigate();
    }
  }, [authenticated, role]);

  return (
    <Stack>
      <Stack.Screen
        name="admin"
        options={{
          headerTitle: "Admin",
        }}
      />
      <Stack.Screen
        name="user"
        options={{
          headerTitle: "User",
        }}
      />
    </Stack>
  );
};

export default AuthRootLayout;
