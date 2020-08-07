import React from "react";
import {ImageBackground, Text, View} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

import styles from "./styles";

import giveClassesImage from "../../assets/images/give-classes-background.png"

function GiveClasses() {
    const {goBack} = useNavigation();

    const hanldleNavigation = () => {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="contain"
                source={giveClassesImage}
                style={styles.content}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton style={styles.okButton} onPress={hanldleNavigation}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses;
