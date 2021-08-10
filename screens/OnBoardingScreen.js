import React from 'react';
import { StyleSheet, Text, View, Button, Image, StatusBar, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper'

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 5,
        height: 5,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.skip}>
      Skip
    </Text>
  </TouchableOpacity>
)

const Next = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.next}>
      Next
    </Text>
  </TouchableOpacity>
)

const Done = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.next}>
      Done
    </Text>
  </TouchableOpacity>
)

const OnBoardingScreen = ({navigation}) => {
    return (
      <View style={styles.container}>

        <StatusBar translucent backgroundColor="transparent" />

        <Onboarding 
          SkipButtonComponent={Skip}
          NextButtonComponent={Next}
          DoneButtonComponent={Done}
          DotComponent={Dots}
          onSkip={() => navigation.replace("Login")}
          onDone={() => navigation.navigate("Login")}
          pages={[
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../assets/onboarding-img1.png')} />,
            title: 'Connect to the World',
            subtitle: 'A New Way to Connect With The World',
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require('../assets/onboarding-img2.png')} />,
            title: 'Share Your Favorites',
            subtitle: 'Share Your Thoughts With Similar Kind of People',
          },
          {
            backgroundColor: '#e9bcbe',
            image: <Image source={require('../assets/onboarding-img3.png')} />,
            title: 'Become The Star',
            subtitle: 'Let The Spot Light Capture You',
          },
        ]}
      />
    </View>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  skip: {
    marginLeft: 20,
    fontSize: 18,
  },
  next: {
    marginRight: 20,
    fontSize: 18
  },
 
});
