import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppWrite from "@/hooks/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";

const HomeScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useGlobalContext();

  const { data: posts, refetch } = useAppWrite(getAllPosts);
const { data: latestPosts,  } = useAppWrite(getLatestPosts);

  if (!posts) return <EmptyState title="Loading..." subtitle="Please wait" />;

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();

    setIsRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full px-5">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View className="">
                <Text className="text-gray-100 font-pmedium text-sm">Welcome back</Text>
                <Text className="text-white text-2xl font-psemibold">{user.username}</Text>
              </View>
              <View>
                <Image source={images.logoSmall} className="w-9 h-10 " resizeMode="contain" />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No videos found" subtitle="Be the first to upload one!" />}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
