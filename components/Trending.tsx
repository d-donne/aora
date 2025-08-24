import { FlatList, View, Text } from "react-native";
import React from "react";

interface TrendingProps {
  posts: any[];
}

const Trending = ({ posts = [] }: TrendingProps) => {
  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <View>
          <Text className="text-white text-2xl">{item.id}</Text>
        </View>
      )}
    />
  );
};

export default Trending;
