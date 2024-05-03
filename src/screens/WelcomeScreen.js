import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';




export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5))), 600,
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5))), 900
    setTimeout(() => navigation.navigate('HomeScreen'), 2000)
  },

    [])

  return (
    <View className="flex-1 items-center justify-center mt-7 space-y-10 bg-amber-500">


      <StatusBar style="dark" />
      {/* logo image with rings */}
      <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring2padding }}>
        <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring1padding }} >
          <Image source={require('../../assets/images/food1.png')}
            style={{ width: hp(20), height: hp(20), borderRadius: 100 }} />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}

      <View className="flex items-center space-y-2">
        <Text className="font-bold text-white tracking-widest " style={{ fontSize: hp(7) }}>
          Foodie
        </Text>
        <Text className="font-medium text-white tracking-widest" style={{ fontSize: hp(2) }}>
          Food is always rights
        </Text>
      </View>

    </View>
  );
}


