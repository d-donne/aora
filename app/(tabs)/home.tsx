import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts } from "@/lib/appwrite";
import useAppWrite from "@/hooks/useAppWrite";
import VideoCard from "@/components/VideoCard";

const HomeScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
 
  const {data: posts, refetch} = useAppWrite(getAllPosts)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetch()

    setIsRefreshing(false)
  }
  return (
    <SafeAreaView className="bg-primary h-full px-5">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View className="">
                <Text className="text-gray-100 font-pmedium text-sm">Welcome back</Text>
                <Text className="text-white text-2xl font-psemibold">D Don</Text>
              </View>
              <View>
                <Image source={images.logoSmall} className="w-9 h-10 " resizeMode="contain" />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg mb-3">Trending Videos</Text>
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="Be the first to upload one!" />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
