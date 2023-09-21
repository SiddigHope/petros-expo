import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableHighlight, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const { width, height } = Dimensions.get("window")

export default class NotificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goToDetails = () => {
        this.props.navigation.navigate("NotificationDetails", { item: this.props.item });
    }

    render() {
        const { item } = this.props
        // console.log(item)
        return (
            <Pressable onPress={this.goToDetails} style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}> {item.title} </Text>
                    <Text numberOfLines={1} style={styles.body}> {item.body} </Text>
                </View>
                <View>
                    {item.count ? (
                        <Text style={[styles.badge]}>  </Text>
                    ) : null}
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: (width * 90) / 100,
        height: 60,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomWidth: 0.5,
        // borderBottomColor: mainColorWithOpacity(0.2)
        // backgroundColor: colors.whiteF7
    },
    imageContainer: {
        width: 50,
        height: 50,
        // backgroundColor: colors.mainColor,
        elevation: 5,
        borderRadius: 40,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
    },
    textContainer: {
        justifyContent: 'center',
        paddingHorizontal: 5,
        // alignItems: "flex-end",
        height: "100%",
        flex: 1,
        // backgroundColor: "red"
    },
    name: {
        // fontFamily: fonts.tajawalB,
        fontSize: 14,
        // color: colors.ebony,
        // textAlign: "right",
    },
    body: {
        // fontFamily: fonts.tajawalR,
        fontSize: 12,
        color: 'grey',
        // textAlign: "right",
    },
    time: {
        // fontFamily: fonts.tajawalR,
        fontSize: 10,
        color: 'grey',
        // backgroundColor: "red",
        textAlign: "center",
    },
    badge: {
        backgroundColor: "pink",
        height: 20,
        width: 20,
        borderRadius: 20,
        elevation: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        // color: colors.whiteF7,
        fontSize: 10
    }
})
