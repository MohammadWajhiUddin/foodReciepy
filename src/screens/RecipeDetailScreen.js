import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring, FadeInDown, FadeInLeft, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import {
    ChevronLeftIcon,
    ClockIcon,
    FireIcon,
    UsersIcon,
} from "react-native-heroicons/outline";
import {
    HeartIcon,
    Square3Stack3DIcon,
    UserIcon,
} from "react-native-heroicons/solid";
import Axios from "react-native-axios";

export default function RecipDetailScreen(props) {
    let item = props.route.params;
    const navigation = useNavigation();
    const [favorite, setFavorite] = useState(false);
    const [meal, setMeals] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getdetailedReciepe(item.idMeal);
    }, []);
    const getdetailedReciepe = async (id) => {
        try {
            const response = await Axios.get(
                `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            if (response && response.data) {
                setMeals(response.data.meals[0]);
                setLoading(false);
            }
        } catch (e) {
            console.log("error", e.message);
        }
    };

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 0; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i)
            }
        }
        return indexes;
    };
    return (
        <ScrollView
            className="flex-1 bg-white "
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style="dark" />
            <View className="flex-row justify-center">
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    entering={FadeInUp.duration(1000)}

                    style={{
                        width: wp(98),
                        height: hp(50),
                        borderRadius: 23,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    }}
                />
            </View>

            <Animated.View 
            entering={FadeInUp.duration(1100)}
            className="w-full absolute flex-row justify-between items-center pt-10">
                <TouchableOpacity
                    className="p-2 rounded-full ml-5 bg-white"
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="p-2 rounded-full mr-5 bg-white"
                    onPress={() => setFavorite(!favorite)}
                >
                    <HeartIcon
                        size={hp(3.5)}
                        strokeWidth={4.5}
                        color={favorite ? "red" : "gray"}
                    />
                </TouchableOpacity>
            </Animated.View>

            <View>
                {loading ? (
                    <ActivityIndicator
                        size={50}
                        color={"black"}
                        style={{ marginTop: 90 }}
                    />
                ) : (
                    <View className="px-4 flex justify-between space-y-2 mt-5">
                        <Animated.View className="space-y-2"
                        // entering={FadeInDown.duration(700).springify().damping(2).stiffness(10)}
                        entering={FadeInDown.duration(700)}>
                        
                            <Text
                                style={{ fontSize: hp(3) }}
                                className="font-bold text-neutral-700"
                            >
                                {meal.strMeal}
                            </Text>

                            <Text
                                style={{ fontSize: hp(2) }}
                                className="font-medium text-neutral-500"
                            >
                                {meal.strArea}
                            </Text>
                        </Animated.View>

                        <View className="flex-row justify-around">
                            <Animated.View className="flex rounded-full bg-amber-300 p-2"
                            entering={FadeInDown.duration(700).springify().damping(20)}>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        35
                                    </Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Mins
                                    </Text>
                                </View>
                            </Animated.View>

                            <Animated.View className="flex rounded-full bg-amber-300 p-2"
                             entering={FadeInDown.duration(700).springify().damping(20)}>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        03
                                    </Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Serving
                                    </Text>
                                </View>
                            </Animated.View>

                            <Animated.View className="flex rounded-full bg-amber-300 p-2"
                             entering={FadeInDown.duration(700).springify().damping(20)}>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        102
                                    </Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Cal
                                    </Text>
                                </View>
                            </Animated.View>

                            <Animated.View className="flex rounded-full bg-amber-300 p-2"
                            entering={FadeInDown.duration(700).springify().damping(20)}>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <Square3Stack3DIcon
                                        size={hp(4)}
                                        strokeWidth={2.5}
                                        color="#525252"
                                    />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        102
                                    </Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Cal
                                    </Text>
                                </View>
                            </Animated.View>
                        </View>

                        <Animated.View className="space-y-5"
                        entering={FadeInLeft.duration(700).springify().damping(20)}>
                            <Text
                                style={{ fontSize: hp(2.5) }}
                                className="font-semibold flex text-neutral-700"
                            >
                                Ingredients
                            </Text>

                            <View className="space-y-2 ml-3">
                                {
                                    ingredientsIndexes(meal).map(i =>{
                                        return(
                                            <View key={i} className="flex-row space-x-4">
                                                <View style={{height:hp(1.5) , width:hp(1.5)}}
                                                className="bg-amber-300 rounded-full" />
                                                    <View className="flex-row space-x-2">
                                                        <Text style={{fontSize:hp(1.7)}}  className="font-extrabold text-neutral-800">{meal['strMeasure'+i]}</Text>
                                                        <Text style={{fontSize:hp(1.7)}}  className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>

                                                        </View>
                                                  
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>



                        <Animated.View className="space-y-2"
                        entering={FadeInDown.duration(700).springify().damping(20)}>
                            <Text
                                style={{ fontSize: hp(2.5) }}
                                className="font-semibold flex text-neutral-700"
                            >
                                Instruction
                            </Text>

                            <View className="ml-2">
                                <Text style={{fontSize:hp(2)}}
                                className="flex text-neutral-700">
                                        {meal.strInstructions}
                                </Text>
                                </View>

                       
                        </Animated.View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
