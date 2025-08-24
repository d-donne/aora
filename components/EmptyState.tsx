import { View, Text, Image } from 'react-native'
import React from 'react'

import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const EmptyState = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <View className='justify-center items-center'>
      <Image source={images.empty} resizeMode='contain' className='w-[17.1875rem] h-[13.4375rem]' />
      <Text className="text-white text-xl text-center mt-2 font-pmedium">{title}</Text>
      <Text className="text-gray-100 text-sm font-pmedium">{subtitle}</Text>

      <CustomButton title='Create video' handlePress={() => { router.push('/create') }}  containerStyles='w-full my-5'/>
    </View>
  );
}

export default EmptyState