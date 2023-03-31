import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import styles from '../src/style/styles';
import { Feather, AntDesign } from '@expo/vector-icons';
import Menu from './menuFooter';
import Header from './header';
import HandleCheckBox from '../functions/donePendingTask'
import DelTask from '../functions/deleteTask';

import { TaskContext } from "../functions/context";

export default function FinishTasks() {
  const { valueTask } = useContext(TaskContext)
  const [listFinish, setListFinish] = useState(null)
  const deleteTask = DelTask();

  const handleCheckboxChange = HandleCheckBox();

  const tasksWithIndex = valueTask.map((task, index) => {
    return {
      ...task,
      originalIndex: index,
    };
  });

  useEffect(() => {
    const countFinish = valueTask.filter(task => task[3]).length
    const listzero = countFinish != 0
    setListFinish(listzero)
  })

  return (
    <View style={styles.container}>
    <Header active="Histórico" />

    {listFinish ?

      <FlatList
      data={tasksWithIndex.filter(task => task[3])}
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
    
    :

    <Text style={{color: 'white', fontSize: 20, alignSelf: 'center', textAlign: 'center'}}>Você ainda não concluiu nenhuma tarefa !</Text>
  
  }
    <Menu active={"historic"} />
  </View>
  );
}