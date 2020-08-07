import React from 'react';
import Landing from "./src/pages/Landing";
import {StyleSheet} from 'react-native';
import {AppLoading} from "expo";
import {StatusBar} from "expo-status-bar";
import {Archivo_400Regular, Archivo_700Bold} from "@expo-google-fonts/archivo";
import {Poppins_400Regular, Poppins_600SemiBold, useFonts} from "@expo-google-fonts/poppins";
import AppStack from "./src/routes/AppStack";

export default function App() {
    const [loadFonts] = useFonts({
        Archivo_400Regular,
        Archivo_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold,
    })

    if (!loadFonts) {
        return <AppLoading/>
    }

    return (
        <>
            <AppStack />
            <StatusBar style="inverted"/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
