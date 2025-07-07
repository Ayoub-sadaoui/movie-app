import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Text } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

const TabBarIcon = ({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: any;
  label: string;
}) => {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          className="flex-1 gap-2 flex-row w-full flex-1 min-w-[92px] min-h-14 mt-6
          justify-center items-center rounded-full overflow-hidden"
        >
          <Image source={icon} tintColor="#151312" className="size-5" />
          <Text className="text-secondary text-based font-bold">{label}</Text>
        </ImageBackground>
      </>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-4 rounded-fulld">
        <Image source={icon} tintColor="#a8b5db" className="size-5" />
      </View>
    );
  }
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: 100,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          marginBottom: 50,
          marginHorizontal: 10,
          borderRadius: 1000,

          height: 30,

          backgroundColor: "#0f0d23",

          borderWidth: 1,
          borderColor: "0f0d23",
          position: "absolute",
          overflow: "visible",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.home} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.search} label="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.save} label="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.person} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
