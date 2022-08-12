import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Tasks from './components/Tasks';

const Stack = createNativeStackNavigator();

const App = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = index => {
    let copyItems = [...taskItems];
    copyItems.splice(index, 1);
    setTaskItems(copyItems);
  };
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled">
          {/* Todays Task */}

          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's Task</Text>
            <View style={styles.items}>
              {taskItems?.map((e, i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => completeTask(i)}>
                    <Tasks text={e} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
        {/* Write a Task  */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            value={task}
            placeholder={'Write a task'}
            onChangeText={text => setTask(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E8EAED'},
  tasksWrapper: {paddingTop: 80, paddingHorizontal: 20},
  sectionTitle: {fontSize: 24, fontWeight: 'bold'},
  items: {marginTop: 20},
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderWidth: 1,
    width: 250,
    borderColor: '#C0C0C0',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

export default App;
