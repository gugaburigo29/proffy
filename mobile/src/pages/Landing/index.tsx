import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {RectButton} from "react-native-gesture-handler";

import styles from "./styles";

import landingImage from "../../assets/images/landing.png"
import studyIcon from "../../assets/images/icons/study.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import heartIcon from "../../assets/images/icons/heart.png"

function Landing() {
    const navigation = useNavigation();

    function toGiveClassesPage() {
        navigation.navigate('GiveClasses')
    }

    return (
        <View style={styles.container}>
            <Image source={landingImage} style={styles.banner}/>

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <RectButton style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar </Text>
                </RectButton>
                <RectButton onPress={toGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>Dar aulas </Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de 205 conexões já realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    )
}

export default Landing;
