import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import { useNavigation } from '@react-navigation/native';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import ContentLoader, { InstagramLoader } from "react-native-easy-content-loader";

import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

export default function Reciepies({ meals, categories }) {

    return (
        <View className="mx-4 space-y-3">
            {meals.length > 0  ?
                <>
                    <Animated.View entering={FadeInLeft.duration(2600)}>
                        <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipes</Text>
                    </Animated.View>
                    <View>
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <ReciepieCard item={item} index={i} />}
                        // // refreshing={isLoadingNext}
                        // // onRefresh={() => refetch({ first: ITEM_CNT })}
                        // onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    </View>
                </> :
                <InstagramLoader active />
            }

        </View>
    );
}

const ReciepieCard = ({ item, index}) => {
    let isEven = index % 2 == 0;
    const navigation = useNavigation();

    return (

        <View >

            <Pressable
            onPress={()=>navigation.navigate('RecipDetailScreen',{...item})}
                style={{
                    width: '100%', paddingLeft: isEven ? 0 : 8,
                    paddingRight: isEven ? 8 : 0
                }}
                className="flex justify-center mb-4 space-y-1">
                <Animated.Image source={{ uri: item.strMealThumb }}
                entering={FadeInDown.duration(3000)}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className="bg-black/5" 
                    sharedTransitionTag="tag"
                    />
                <Animated.Text
                  entering={FadeInDown.duration(3000)}
                    style={{ fontSize: hp(1.75) }}
                    className="font-semibold ml-2 text-neutral-600">
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + " ..." : item.strMeal}
                </Animated.Text>
            </Pressable>
        </View>



    )
}



