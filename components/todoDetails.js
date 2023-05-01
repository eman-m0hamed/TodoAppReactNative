import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function todoDetails({ navigation, route }) {
    const { todo } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{todo.title}</Text>
            <Text style={styles.body}>{todo.body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10px',
    },
    title: {
        fontSize: 25,
        color:"red",
        fontWeight:"900",
        marginBottom: 10,
    },
    body: {
        fontSize: 20,
        paddingLeft: 40
    }
});