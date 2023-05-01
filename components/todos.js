import React from 'react';
import { View, StyleSheet } from 'react-native';
import Todo from './todo';

export default function todos({ todos, handleTodoSelect, navigation, setTodos }) {
    return (
        <View style={styles.container}>
            {todos.map((todo, index) => (
                <Todo todos={todos} todo={todo} key={index} index={index} navigation={navigation} onSelect={handleTodoSelect} setTodos={setTodos} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:"700px", 
    }
});