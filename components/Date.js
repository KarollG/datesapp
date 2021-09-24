/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Date = ({item,deletePatient}) => {

  const dialogueDelete = id => {
    console.log('eliminando...', id );

    deletePatient(id);
  }

  return (
    <View style={styles.date}>
      <View>
        <Text style={styles.label}> Paciente: </Text>
        <Text style={styles.text}>{item.patient} </Text>
      </View>
      <View>
        <Text style={styles.label}> Propietario: </Text>
        <Text style={styles.text}>{item.owner} </Text>
      </View>
      <View>
        <Text style={styles.label}> Sintomas: </Text>
        <Text style={styles.text}>{item.symptoms} </Text>
      </View>

      <View>
        <TouchableHighlight onPress={ () => dialogueDelete(item.id) } style={styles.btnDelete}>
          <Text style={styles.textDelete}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },

  text: {
    fontSize: 18,
  },

  btnDelete: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical:10,
  },

  textDelete:{
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Date;
