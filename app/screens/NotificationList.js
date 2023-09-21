import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import NotificationComponent from './NotificationComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard'

const { width, height } = Dimensions.get("window")

export default class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: ""
        };
        this.data = [
            { count: 8, title: "this is me", body: "this is you and me", time: "9:00" },
            { count: 3, title: "this is us", body: "this is them and us", time: "9:00" }
        ]
    }

    componentDidMount() {
        console.log("no Data")

        this.getData()
    }

    getData = async () => {
        const dataString = await AsyncStorage.getItem("NotificationList")
        if (dataString != null) {
            const data = JSON.parse(dataString)
            this.setState({ data })
            console.log(data)
        } else {
            console.log("no Data")
        }
    }

    _getToken = async () => {
        const token = await AsyncStorage.getItem("user_token")
        if (token != null) {
            Clipboard.setStringAsync(token)
            ToastAndroid.show('Token copied successfully!', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('No token found!', ToastAndroid.SHORT);
        }
    }


    _renderItem = (item, index) => (
        <NotificationComponent
            item={item.item}
            navigation={this.props.navigation}
        />
    );

    _itemSeparator = () => (
        <View style={{ height: 10, justifyContent: 'center' }} >
            <View style={{ height: 1, width: "80%", alignSelf: 'center', backgroundColor: "#e3e3e3" }} />
        </View>
    );


    _listFooter = () => <View style={{ height: 20 }} />;

    _listHeader = () => <View style={{ height: 20 }} />;


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={this._getToken}>
                    <Text style={styles.btnText}> {"Copy Device Token"} </Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ItemSeparatorComponent={this._itemSeparator}
                    ListFooterComponent={this._listFooter}
                    ListEmptyComponent={this._listHeader}
                    ListHeaderComponent={this._listHeader}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        paddingTop: 60
        // backgroundColor: colors.whiteF7
    },
    btn: {
        width: "90%",
        height: 60,
        backgroundColor: "#9028F1",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        alignSelf: 'center'
    },
    btnText: {
        fontSize: 18,
        color: "#FFF"
    }
})
