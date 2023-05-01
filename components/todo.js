import React, { useState } from 'react';
import { View, StyleSheet, CheckBox, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Text, TouchableRipple } from "react-native-paper";
import { Icon, Button } from "react-native-elements";

export default function todo({ index, todos, todo, onSelect, navigation, setTodos }) {

    const [showModal, setShowModal] = React.useState(false);

    const handleSelectChange = (value) => {
        onSelect(index, todo, value);
    };

    const handleDeleteTodo = () => {
        const newTodoList = [...todos];
        newTodoList.splice(index, 1);
        setShowModal(false);
        setTodos(newTodoList);
    };

    const handleShowModal = (index) => {
        setShowModal(true);
    };

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    return (
        <View style={styles.container}>
            <View style={styles.todo}>
                <View style={{flex:1, flexDirection:"row"}}>
                    
                    <CheckBox
                        value={todo.status}
                        onValueChange={handleSelectChange}
                        style={styles.checkbox}
                    />
                    <TouchableRipple onPress={() => navigation.navigate('todoDetails', { todo: todo })}>
                        <View>
                            <Text style={styles.text}>{todo.title}</Text>
                        </View>
                    </TouchableRipple>
                </View>
                <View> 
                    <TouchableOpacity onPress={handleShowModal} >
                        <Icon name="delete" color="#FF0000" />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal style={styles.modalStyle} animationType="fade" transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)} >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>
                            Are you sure you want to delete this item?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={() => setShowModal(false)} />
                            <Button
                                title="Delete"
                                onPress={handleDeleteTodo}
                                buttonStyle={styles.deleteButton}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    text: {
        marginLeft:15, 
        marginTop:-5, 
        fontSize:25
    },
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: Dimensions.get("window").width,
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        backgroundColor:"#87a6c8",
        width: 385,
        position: 'fixed',
        top: '40%',
        left: '37%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    deleteButton: {
        backgroundColor: "#FF0000",
    },
    todo: {
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        marginBottom: 0,
        width:400,
      },
});