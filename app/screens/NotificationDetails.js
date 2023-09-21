import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class NotificationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {item} = this.props.route.params 
        return (
            <View style={styles.container}>
                <Text style={styles.title}> {item.title} </Text>
                <Text style={styles.body}> {item.body} </Text>
                <Text style={styles.time}> {moment(item.time).fromNow()} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 60,
        padding:20
    },
    time:{
        color: "grey"
    },
    body:{
        marginVertical: 5,
        fontSize: 18,
    },
    title:{
        // backgroundColor: "#e3e3e3",
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "500"
    }
})
