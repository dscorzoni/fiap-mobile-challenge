import { router, Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuthContext } from "@/contexts/auth";
import CustomTabBarButton from "@/components/TabBarButton";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          backgroundColor: Colors.black,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              route={"/home/posts-list"}
              label="Home"
              icon="home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rede"
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              route={"/rede"}
              label="Rede"
              icon="people"
              restricted={["teacher", "admin"]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              route={"/admin"}
              label="Admin"
              icon="settings"
              restricted={["admin"]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              route={"/perfil"}
              label="Perfil"
              icon="person"
            />
          ),
        }}
      />
    </Tabs>
  );
}
