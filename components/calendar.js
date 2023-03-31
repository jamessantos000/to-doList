import React, { PureComponent, useState, useContext, useEffect } from "react";
import { View, Text } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { format } from 'date-fns'
import { Card } from 'react-native-paper';

import styles from "../src/style/styles";
import Header from "./header";
import Menu from "./menuFooter";
import { TaskContext } from "../functions/context";

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'br';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

class Item extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <Card style={{marginBottom: 10}}>
        <View style={{padding: 20}}>
          <Text style={styles.titleCalendar}>{item.name}</Text>
          <Text style={styles.descCalendar}>{item.tarefa}</Text>
          <Text style={styles.txtDateCalendar}>{item.data}</Text>
        </View>
      </Card>
    );
  }
}

export default function ScreenCalendar() {
  const { valueTask } = useContext(TaskContext)
  const today = new Date()
  const formatDay = format(today, 'yyyy-MM-dd')
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const convertedObject = valueTask.reduce((result, item) => {
    const date = item[6];
    const dateKey = date.replace(/\//g, "-");
    const taskData = { name: item[0], tarefa: item[1], ok: item[3], data: item[2] };
    if (!result[dateKey]) {
      result[dateKey] = [taskData];
    } else {
      result[dateKey].push(taskData);
    }
    return result;
  }, {});

  const formattedObject = Object.entries(convertedObject).reduce((result, [key, value]) => {
    const date = new Date(key);
    const formattedDate = date.toISOString().split('T')[0];
    result[formattedDate] = value.map(({ name, tarefa, ok, data }) => ({
      name,
      tarefa,
      ok,
      data,
    }));
    return result;
  }, {});

  const [items, setItems] = useState(formattedObject)

  const markedDateList = Object.keys(formattedObject).reduce((acc, curr) => {
    const markedDates = formattedObject[curr].reduce((markedAcc, markedCurr) => {
      const dateKey = markedCurr.data.split('/').reverse().join('-'); // inverte o formato da data
      markedAcc[dateKey] = { marked: !markedCurr.ok }; // adiciona a data ao novo objeto com a propriedade "marked"
      return markedAcc;
    }, {});
  
    return { ...acc, ...markedDates };
  }, {});  

  useEffect(() => {
    loadItems({ timestamp: today.getTime() })
  }, [])

  const loadItems = (day) => {
    const strTime = timeToString(day.timestamp)
    const newItems = {}
    if (items[strTime]) {
      newItems[strTime] = items[strTime]
    } else {
      newItems[strTime] = []
    }
    setItems({
      ...items,
      ...newItems,
    })
  }

  return (
    <View style={styles.container}>
      <Header active="Calendário" />

      <Agenda
        items={items}
        markedDates={markedDateList}
        loadItemsForMonth={loadItems}
        selected={formatDay}
        renderItem={(item) => <Item item={item} />}
        // rowHasChanged={(r1, r2) => r1.name !== r2.name}
      //   renderDay={renderDay}
      />

      <Menu active={'calendar'} />
    </View>
  );
}