import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "@/constants";

interface FieldProps {
  title: string;
  handleTextChange: (e: any) => void;
  otherStyles?: string;
  placeholder?: string;
  value: string;
  keyboardType?: any
}

const FormField = ({ title, placeholder, value, keyboardType, handleTextChange, otherStyles, ...props }: FieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`gap-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 flex-row relative items-center">
        <TextInput
          className="flex-1 size-full bg-black-100 border border-black-200 rounded-2xl items-center focus:border-secondary px-3 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleTextChange}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title == 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4 z-50">
            <Image className="size-7" source={showPassword? icons.eye: icons.eyeHide} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
