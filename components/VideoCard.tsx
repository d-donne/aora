import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Videos } from "@/types/appwrite/appwrite";

const VideoCard = ({ video }: { video: Videos }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="size-[2.875rem]  rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: video.creator.avatar }} resizeMode="contain" className="size-full rounded-lg" />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {video.title}
            </Text>
            <Text className="text-gray-100 font-pregular text-xs" numberOfLines={1}>
              {video.creator.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="size-5" />
        </View>
      </View>

      {isPlaying ? (
        <Image resizeMode="contain" className="" />
      ) : (
        <TouchableOpacity onPress={() => setIsPlaying(true)} activeOpacity={0.7} className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
          <Image source={{ uri: video.thumbnail }} resizeMode="cover" className="size-full rounded-xl mt-3" />
          <Image source={icons.play} resizeMode="contain" className="size-12 absolute" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
