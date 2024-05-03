import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Axios from 'react-native-axios';
import ContentLoader, { InstagramLoader } from "react-native-easy-content-loader";

import Category from '../components/Cate';
import Reciepies from '../components/Reciepies';


export default function HomeScreen() {
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])

    const [activeCategory, setActiveCategory] = useState('Beef')

    useEffect(() => {
        getCategories()
        getMeal()
    }, [])
    const getCategories = async () => {
        try {
            const response = await Axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            if (response && response.data) {
                setCategories(response.data.categories)
            }
        } catch (e) {
            console.log("eSSSrror", e.message)
        }
    }

    const getMeal = async (category = "Beef") => {
        try {
            const response = await Axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)

            if (response && response.data) {

                setMeals(response.data.meals)
            }
        } catch (e) {
            console.log("error", e.message)
        }
    }

    const handleChangeCategory = category => {
        getMeal(category)
        setActiveCategory(category)
        setMeals([])
    }




    //   const navigation = useNavigation();
    return (
        <View className="flex-1  bg-white">

            <StatusBar style='dark' />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-10">

                <View className="mx-3 flex-row justify-between items-center mb-2">
                    <Image source={require('../../assets/images/avatar.jpeg')} style={{ height: hp(5), width: hp(5.5) }} />
                    <BellIcon size={hp(4)} color="gray" />
                </View>

                <View className="mx-4 space-y-2 mb-2">
                    <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Wajih</Text>
                    <View >
                        <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">Make your own food, </Text>
                        <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">stay at
                            <Text className="text-amber-400"> home</Text>
                        </Text>
                    </View>
                </View>


                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[5px]">
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb-1 pt-2 tracking-wider px-5"
                    />

                    <View className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.5)}
                            strokeWidth={3}
                            color="gray"
                        />
                    </View>
                </View>
                {/**Categories */}

                <View>
                    {categories.length > 0 ?
                        <Category
                            activeCategory={activeCategory}
                            handleChangeCategory={handleChangeCategory}
                            categories={categories} />
                        :
                       null

                    }
                </View>

                <View>

                    <Reciepies
                        meals={meals}
                        categories={categories}
                    />

                </View>









            </ScrollView >



        </View >
    );
}


