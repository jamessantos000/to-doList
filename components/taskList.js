import React from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import styles from '../src/style/styles';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';


export default function TaskList(props) {
  const { data, handleCheckboxChange, deleteTask } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.toString()}
      renderItem={({item, index}) => (
        <View style={{flex: 1, marginStart: 20, marginEnd: 20, marginBottom: 15}}>
          <View style={styles.taskUnd}>
            <TouchableOpacity onPress={() => handleCheckboxChange(index)} style={{marginEnd: 15}}>
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