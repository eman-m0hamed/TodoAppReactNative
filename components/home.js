import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TextInput, TouchableOpacity, Button, Pressable, Text } from 'react-native';
import ToDos from './todos';
import Divider from "./divider";
import Filter from "./filter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home(navigation) {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoBody, setTodoBody] = useState('');
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);

    const handleAddTodo = () => {
        setTodos([...todos, {title: todoTitle, body: todoBody, status:false}]);
        setTodoTitle('');
        setTodoBody('');
      };

    const handleTodoSelect = (index, todo, isSelected) => {
        const updatedItem = [...todos];
        updatedItem[index].status = isSelected;
        setTodos(updatedItem);
        setFilteredTodos(updatedItem);
    };
    
    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('todos');
            if (value) {
                setTodos(JSON.parse(value));
                setFilteredTodos(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos))
            setFilteredTodos(todos);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readData();
    }, [])
    useEffect(() => {
        saveData();
    }, [todos]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Todo</Text>
            <View style={styles.inputContainer}>
                <TextInput
                value={todoTitle}
                onChangeText={setTodoTitle}
                placeholder="Todo Title"
                style={styles.input}
                />
                <TextInput
                value={todoBody}
                onChangeText={setTodoBody}
                placeholder="Todo Body"
                style={styles.input}
                numberOfLines={3}
                multiline={true}
                />
                <View style={styles.addButton}>
                    <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        <View>
                <Filter todos={todos} setFilteredTodos={setFilteredTodos}></Filter>
            </View>
            <Divider />

            <View>
                <ToDos todos={filteredTodos} navigation={navigation.navigation} handleTodoSelect={handleTodoSelect} setTodos={setTodos}></ToDos>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
      },
      inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 16,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 15,
        width: '70%',
        marginBottom: 15,
      },
      button: {
        backgroundColor: '#007AFF',
        borderRadius: 4,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft:10,
        marginRight:10,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },

      addButton: {
        flex: 1,
        justifyContent: 'end',
        width: '70%',
      },

});
