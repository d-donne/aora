import { View, Text, TouchableOpacity, GestureResponderHandlers } from "react-native";
import React, { ReactEventHandler } from "react";

interface ButtonProps {
  title: string;
  handlePress: any;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
      className={`rounded-xl bg-secondary min-h-[3.875rem] justify-center items-center ${containerStyles} ${isLoading && 'opacity-50' }`}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
