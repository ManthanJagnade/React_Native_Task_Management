import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    AsyncStorage.getItem('todo')
      .then((todosData) => {
        if (todosData) {
          setTodos(JSON.parse(todosData));
        }
      })
      .catch((error) => {
        console.log('Error retrieving todos:', error);
      });
  }, []);

  const addTodo = () => {
    if (!newTodo.title || !newTodo.description) {
      Alert.alert('Please enter all the values.');
      return;
    }

    const updatedTodo = [{ ...newTodo, id: todos.length + 1 }, ...todos];
    setTodos(updatedTodo);
    AsyncStorage.setItem('todo', JSON.stringify(updatedTodo))
      .then(() => {
        setNewTodo({ title: '', description: '' });
        setShowModal(false);
      })
      .catch((error) => {
        console.log('Error saving todo:', error);
      });
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
    AsyncStorage.setItem('todo', JSON.stringify(updatedTodos))
      .then(() => {
        console.log('Todo updated successfully.');
      })
      .catch((error) => {
        console.log('Error updating todo:', error);
      });
  };

  const displayTodo = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => updateTodo(item.id)}
      style={{
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  const handleChange = (field, value) => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [field]: value,
    }));
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          paddingVertical: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 28 }}>
            Hey,Ayush 
          </Text>
          <Text style={{ fontSize: 16 }}>
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} for you
          </Text>
        </View>
        <Image
          source={require('./assets/240_F_446122551_R2z7cQryUna0ld5PtXYhItOASAEMBvYM.jpg')}
          style={{ height: 50, width: 50, borderRadius: 10 }}
        />
      </View>

      <Text style={{ color: '#000', fontSize: 28, fontWeight: 'bold' }}>
        Task Management
      </Text>
      <ScrollView>
        <View style={{ height: 250 }}>
          {todos.map((item) => (!item.completed ? displayTodo(item) : null))}
        </View>
      </ScrollView>

      <Text style={{ color: '#000', fontSize: 28, fontWeight: 'bold' }}>
        Completed ✅
      </Text>
      <ScrollView>
        <View style={{ height: 250 }}>
          {todos.map((item) => (item.completed ? displayTodo(item) : null))}
        </View>
      </ScrollView>

      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: 'lightblue',
            borderRadius: 100,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 60,
          }}
        >
          <Text style={{ fontSize: 46 }}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              paddingVertical: 20,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 28 }}>
                Hey, Ayush 
              </Text>
              <Text style={{ fontSize: 16 }}>
                {todos.length} {todos.length === 1 ? 'task' : 'tasks'} for you
              </Text>
            </View>
            <Image
              source={require('./assets/240_F_446122551_R2z7cQryUna0ld5PtXYhItOASAEMBvYM.jpg')}
              style={{ height: 50, width: 50, borderRadius: 10 }}
            />
          </View>

          <Text
            style={{
              color: '#000',
              fontSize: 28,
              fontWeight: 'bold',
              marginVertical: 10,
            }}
          >
          Add your Task 
          </Text>
          <TextInput
            placeholder="Task Name"
            value={newTodo.title}
            onChangeText={(title) => handleChange('title', title)}
            style={{
              backgroundColor: 'rgb(240, 240, 240)',
              paddingHorizontal: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <TextInput
            placeholder="Write your task here "
            value={newTodo.description}
            onChangeText={(desc) => handleChange('description', desc)}
            style={{
              backgroundColor: 'rgb(240, 240, 240)',
              paddingHorizontal: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
            multiline={true}
            numberOfLines={6}
          />

          <View
            style={{ width: '100%', alignItems: 'center', marginTop: 10 }}
          >
            <TouchableOpacity
              onPress={addTodo}
              style={{
                backgroundColor: 'blue',
                width: 100,
                borderRadius: 10,
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 22, color: '#fff' }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
