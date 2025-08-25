import { FlatList, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { zoomIn, zoomOut } from "@/utils/animations";
import { Videos } from "@/types/appwrite/appwrite";

const TrendingItem = ({ activeItem, item }: { activeItem: Videos | null; item: Videos }) => {
  const [play, setPlay] = useState(false);
  // console.log("activeItem:", activeItem.$id, "item:", item.$id);

  return (
    <Animatable.View animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500} className="mr-5">
      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="size-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: Videos[] }) => {
  const [activeItem, setActiveItem] = useState(posts[1] || posts[0]);

  const viewableItemChanged = ({ viewableItems }: { viewableItems: { key: Videos }[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;
