import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
      const { email, password } = form;

      if ( !email || !password) {
        Alert.alert("Error", "Please fill in all the fields");
      }

      setIsSubmitting(true);

      try {
        const result = await signIn(email, password);

        // TODO : set to global state using context

        router.replace("/home");
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
  };
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] my-6 px-4">
          <Image source={images.logo} resizeMode="contain" className="w-[7.1875rem] h-[2.1875rem] mx-auto" />
          <Text className="text-2xl font-semibold font-psemibold text-white mt-10 mx-auto">Log in to Aora</Text>

          <FormField
            title="Email"
            value={form.email}
            handleTextChange={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder="janedoe@example.com"
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            value={form.password}
            handleTextChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="password"
          />

          <CustomButton title="Sign In" handlePress={submit} isLoading={isSubmitting} containerStyles="mt-10" />

          <View className="flex-row gap-2 justify-center mt-7 items-center">
            <Text className="text-gray-100 text-lg font-pregular">Don't have an account? </Text>
            <Link href='/sign-up' replace className="text-secondary text-lg font-psemibold">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
