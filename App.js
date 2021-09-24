import React, {useState} from 'react';

import Date from './components/Date';
import { Text,  StyleSheet,  View,  FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import Form from './components/Form';

const App = () => {
  const [showform, saveShowForm] = useState(false);

  //definir el state de citas
  const [dates, setDates] = useState([
    // {id: '1', patient: 'Hook', owner: 'KarollG', symptoms: 'No come'},
    // {id: '2', patient: 'Redux', owner: 'Kar', symptoms: 'No duerme'},
    // {id: '3', patient: 'Native', owner: 'Ar', symptoms: 'No canta'},
  ]);

  // Elimina los pacientes del state
  const deletePatient = id => {
    //currentlyDates= currentAppointments
    setDates((currentAppointments) => {
      return currentAppointments.filter(date => date.id !== id);
    });
  };

  //Muestra u oculta el formulario
  const showformm = () => {
    saveShowForm(!showform);
  };

  // ocultar el teclado
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de citas</Text>

        <View>
          <TouchableHighlight onPress={ () => showformm() } style={styles.btnShowForm}>
            <Text style={styles.textShowForm}> {showform ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {showform ? (
            <>
              <Text style={styles.title}>Crear Nueva Cita</Text>
              <Form
                dates={dates}
                setDates={setDates}
                saveShowForm={saveShowForm}
              />
            </>
          ) : (
            //se retornan dos elementos se coloca fragment
            <>
              <Text style={styles.title}> {dates.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>

              <FlatList
                style={styles.list}
                data={dates}
                renderItem={({item}) => <Date item= {item} deletePatient = {deletePatient} />}
                keyExtractor={date => date.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },

  title: {
    color: '#FFF',
    // marginTop: 40,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },

  list: {
    flex: 1,
  },

  btnShowForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },

  textShowForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
