import { View,TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "@/constants";

interface FieldProps {
  handleTextChange?: (e: any) => void;
  otherStyles?: string;
  value?: string;
}

const SearchInput = ({
  value,
  handleTextChange,
  otherStyles,
  ...props
}: FieldProps) => {
  return (
    <View className="w-full h-16 flex-row relative items-center space-x-4">
      <TextInput
        className="flex-1 size-full bg-black-100 border border-black-200 rounded-xl items-center focus:border-secondary px-4 text-white font-pregular text-base mt-0.5"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={handleTextChange}
      />
      <TouchableOpacity className="absolute right-4">
        <Image source={icons.search} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
