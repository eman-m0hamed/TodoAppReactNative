import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

export default function filter({ todos, setFilteredTodos }) {

    const show = (showData) => {
        if (showData == 'All') {
            setFilteredTodos(todos);
        } else if (showData == 'To Do') {
            setFilteredTodos(todos.filter((todo) => todo.status === false));
        } else if (showData == 'Done') {
            setFilteredTodos(todos.filter((todo) => todo.status === true));
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={[styles.button, {backgroundColor: 'green'}]} onPress={() => show("All")}>
                <Text style={styles.text}>All</Text>
            </Pressable>

            <Pressable style={[styles.button, {backgroundColor: '#cd4116'}]} onPress={() => show("To Do")}>
                <Text style={styles.text}>To Do</Text>
            </Pressable>

            <Pressable style={[styles.button, {backgroundColor: 'blue'}]} onPress={() => show("Done")}>
                <Text style={styles.text}>Done</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:"700px", 
        marginTop: 30,
    }, 

    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});