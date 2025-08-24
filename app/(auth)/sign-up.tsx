import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser, setIsLoggedIn } = useGlobalContext()

  const submit = async () => {
    const { username, email, password } = form
    
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(email, password, username);
      setUser(result)
      setIsLoggedIn(true)

      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
    finally {
      setIsSubmitting(false)
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] my-6 px-4">
          <Image source={images.logo} resizeMode="contain" className="w-[7.1875rem] h-[2.1875rem] mx-auto" />
          <Text className="text-2xl font-semibold font-psemibold text-white mt-10 mx-auto">Sign Up to Aora</Text>

          <FormField
            title="Username"
            value={form.username}
            handleTextChange={(e) => setForm({ ...form, username: e })}
            placeholder="username"
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleTextChange={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder="mail@example.com"
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            value={form.password}
            handleTextChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="password"
          />

          <CustomButton title="Sign Up" handlePress={submit} isLoading={isSubmitting} containerStyles="mt-10" />

          <View className="flex-row gap-2 justify-center mt-7 items-center">
            <Text className="text-gray-100 text-lg font-pregular">Already have an account? </Text>
            <Link href="/sign-in" replace className="text-secondary text-lg font-psemibold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
