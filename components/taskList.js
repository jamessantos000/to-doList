import React, { useContext } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import styles from '../src/style/styles';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TaskContext } from '../functions/context';

import HandleCheckBox from '../functions/donePendingTask'
import DelTask from '../functions/deleteTask';

export default function TaskList(props) {
  const { valueTask, orderBy } = useContext(TaskContext)
  const handleCheckboxChange = HandleCheckBox();
  const deleteTask = DelTask();

  const tasksWithIndex = valueTask.map((task, index) => {
    return {
      ...task,
      originalIndex: index,
    };
  });

  return (
    <FlatList
      data={tasksWithIndex
        .filter(task => !task[3])
        .sort((a, b) => {
          if(orderBy === true){
            return b.originalIndex + a.originalIndex
          }else{
            return b.originalIndex - a.originalIndex
          }
        })
      }
      keyExtractor={task => task.originalIndex.toString()}
      renderItem={({item, index}) => (
        <View style={{flex: 1, marginStart: 20, marginEnd: 20, marginBottom: 15}}>
          <View style={styles.taskUnd}>
            <TouchableOpacity onPress={() => handleCheckboxChange(item.originalIndex)} style={{marginEnd: 15}}>
              <View style={[styles.checkboxContainer, item[3] && styles.checked]}>
                {item[3] && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <View style={{width: '50%'}}>
              <Text style={{fontFamily: 'Lato_700Bold', textTransform: 'uppercase', color: 'white', marginBottom: 5}}>{item[0]}</Text>
              <Text numberOfLines={2} style={{fontFamily: 'Lato_400Regular', color: 'white', marginBottom: 5}}>{item[1]}</Text>
              <Text style={{fontFamily: 'Lato_400Regular', color: 'white'}}>{`${item[2]} ${item[5]}`}</Text>
            </View>
            <View style={{justifyContent: 'flex-end', position: 'absolute', right: 10, flexDirection: 'row'}}>
              <AntDesign name="flag" size={24} color={item[4]} style={{margin: 10}} />

              <TouchableOpacity>
                <Feather name="edit" size={24} color="white" style={{margin: 10}} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => deleteTask(item)}>
                <AntDesign name="delete" size={24} color="white" style={{margin: 10}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
}