import { Image, ScrollView, Text, View } from "react-native";
import '@/global.css'
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar'

import {images} from '@/constants'
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext()
  const gOn = true
  
  if (!isLoading && isLoggedIn) return <Redirect href='/home' />
  //  if (gOn) return <Redirect href='/home'/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center px-5 w-full min-h-[85vh]">
          <Image source={images.logo} resizeMode="contain" className="w-[8.125rem] h-[5.25rem]  " />
          <Image source={images.cards} resizeMode="contain" className="max-w-[23.75rem] w-full h-[18.75rem] " />

          <View className="relative mt-7">
            <Text className="text-white text-3xl text-center font-bold">
              Discover Endless Possiblities with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image source={images.path} className="absolute -bottom-2 -right-3 w-[6rem] h-4" />
          </View>

          <Text className="text-gray-100 text-sm font-pregular mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            containerStyles="w-full mt-9"
            handlePress={() => router.push('/sign-in')}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="auto" />
    </SafeAreaView>
  );
}
