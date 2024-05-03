import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import { useNavigation } from '@react-navigation/native';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { categoryData } from '../constants';
import Animated ,{ FadeInDown, FadeOut } from 'react-native-reanimated';



export default function Cate({activeCategory,handleChangeCategory,categories}) {

    return (
        <Animated.View entering={FadeInDown.duration(2200)}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-4"
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    categories.map((cat, index) => {
                        let isActive = cat.strCategory == activeCategory;
                        let activeButtonClass = isActive ? 'bg-amber-400':'bg-black/10'
                        return (
                            <TouchableOpacity
                                onPress={()=>handleChangeCategory(cat.strCategory)}
                                key={index}
                                className="flex items-center space-y-1">
                                <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                                    <Image
                                        source={{ uri: cat.strCategoryThumb }}
                                        style={{width:hp(6), height:hp(6)}}
                                        className="rounded-full"
                                    />
                                </View>
                                <Text className="text-neutral-600 items-center" 
                                    style={{fontSize:hp(1.7)}}>
                                            {cat.strCategory}
                                    </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    );
}


