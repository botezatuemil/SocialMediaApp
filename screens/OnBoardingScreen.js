import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const OnBoardingScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Onboarding screen</Text>
                <Button
                    title="Click here"
                    onPress={() => navigation.navigate("Login")}
                />
        </View>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
