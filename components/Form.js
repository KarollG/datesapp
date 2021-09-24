/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Form = ({dates, setDates, saveShowForm}) => {

  const [patient, savePatient] = useState('');
  const [owner, saveOwner] = useState('');
  const [phone, savePhone] = useState('');
  const [symptoms, saveSymptoms] = useState('');
  const [date, saveDate] = useState('');
  const [hour, saveHour] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const ConfirmDate = date => {
    const options = {year: 'numeric', month: 'long', day:'2-digit'};
    saveDate(date.toLocaleDateString('es-ES', options));
    hideDatePicker();
  };

  // Muestra u oculta el Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };


  const ConfirmHour = hour => {
    //const options = {hour: 'numeric', minute:'2-digit', hour12:false};
    const options = {hour: 'numeric', minute:'2-digit'};
    saveHour(hour.toLocaleString('es-US', options));
    hideTimePicker();
  };


  // Crear nueva cita
  const createNewAppointment = () =>{
    // console.log('Desde crearnuevacita');
    // Validar
    if (patient.trim() === '' || owner.trim() === '' || phone.trim() === '' || date.trim() === '' || hour.trim() === '' || symptoms.trim() === ''){
      //Falla la validación
      showAlert();

      return;
    }

    // Crear nueva cita
    const appointment = {patient, owner, phone, date, hour, symptoms };

    appointment.id = shortid.generate();

    // console.log(appointment);
    // Agregar al state
    const datesNew = [...dates, appointment ];
    setDates(datesNew);

    //Ocultar el formulario
    saveShowForm(false);

    // Resetear el formulario
  };

  // Muestra la alerta si falla validación
  const showAlert = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorio', //Mensaje
      [{
        text:'OK', //Arregla de botones
      }]
    );
  };

  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}> Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ (text) => savePatient(text) }
          />
        </View>
        <View>
          <Text style={styles.label}> Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ (text) => saveOwner(text) }
          />
        </View>
        <View>
          <Text style={styles.label}> Teléfono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ (text) => savePhone(text) }
            keyboardType= 'numeric'
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={ConfirmDate}
            onCancel={hideDatePicker}
            locale='es_ES'
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
           // onConfirm={(date)=>this._handleDatePicked(date)}
          />
          <Text>{date}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={ConfirmHour}
            onCancel={hideTimePicker}
            locale='es_ES'
            headerTextIOS="Elige una Hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text> {hour}</Text>
        </View>
        <View>
          <Text style={styles.label}> Síntomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={ (text) => saveSymptoms(text) }
          />
        </View>
        <View>
          <TouchableHighlight onPress={ () => createNewAppointment() } style={styles.btnSubmit}>
            <Text style={styles.textSubmit}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    //marginHorizontal: '2.5%',
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },

  input: {
    marginTop: 10,
    height: 50,
    borderColor:'#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },

  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical:10,
  },

  textSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Form;