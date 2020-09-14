import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, Card, Input, Icon } from '@ui-kitten/components'

function SignUp(props) {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({email: "basic", password: "basic", name: "basic"})
  const [validated, setValidated] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  const handleSubmit = () => {

    if(validated) {
      console.log("Los valores se validaron")
      console.log(data)
    } else {
      console.log("no esta validado")
      console.log(status)
    }

  };

  const validate = () => {
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    const emailRegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi

    setValidated(true);

    if(data.name === "") {
      setStatus({...status, name: "danger"})
      setValidated(false)
    } else {
      setStatus({...status, name: "success"})
    }

    if(!passwordRegExp.test(data.password)) {      
      setStatus({...status, password: "danger"})
      setValidated(false)
    } else {
      setStatus({...status, password: "success"})
    }

    if(!emailRegExp.test(data.email)) {
      setStatus({...status, email: "danger"})
      setValidated(false)

    } else {
      setStatus({...status, email: "success"})
    }
  }

  
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.background}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={"#044244"}
      />
      <ImageBackground
        style={styles.header_vector}
        source={require("../assets/Header_SignUp.png")}
      >
        <Image
          style={styles.tecfoodslogo}
          source={require("../assets/Tec_Foods_Logo.png")}
        />
      </ImageBackground>
      <Text style={styles.header_text}>Registrarse</Text>

      <Card style={styles.card}>
        <Input
          placeholder="Nombre"
          value={data.name}
          onChangeText={value => {setData({...data, name: value}); validate();}}
          style={styles.submit_text}
          status={status.name}
          textStyle={styles.input_text}
        />
        <Input
          placeholder="Correo"
          value={data.email}
          onChangeText={value => {setData({...data, email: value}); validate()}}
          style={styles.submit_text}
          status={status.email}
          textStyle={styles.input_text}
        />
        <Input
          placeholder="Contraseña"
          value={data.password}
          onChangeText={value => {
            setData({...data, password: value});
            validate()
          }}
          style={styles.submit_text}
          status={status.password}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          textStyle={styles.input_text}
          caption="Debe contener minimo 8 caracteres, 1 numero, una letra mayuscula y minuscula."
        />
        <Button onPress={handleSubmit} style={styles.submit_button} status = 'primary' disabled={validated ? false : true}>
          Registrar
        </Button>
      </Card>
      <Text style={styles.mainText}>
        ¿Ya tienes una cuenta?{" "}
        <Text style={styles.boldText}>Inicia sesión</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f9fefe",
  },
  tecfoodslogo: {
    width: 85.6,
    height: 89.5,
    marginLeft: wp("5%"),
  },
  header_vector: {
    alignItems: "flex-start",
    justifyContent: "center",
    top: hp("-6%"),
    width: wp("100%"),
    height: hp("35%"),
  },
  header_text: {
    position: "absolute",
    textAlign: "center",
    top: hp("25%"),
    width: wp("100%"),
    color: "#182a3a",
    fontFamily: "Coolvetica",
    fontSize: 45,
    fontWeight: "400",
  },
  mainText: {
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    top: hp("93%"),
    color: "#182a3a",
    fontFamily: "OpenSans_Regular",
    fontSize: 12,
    fontWeight: "400",
  },
  submit_button: {
    alignSelf: "center",
    alignItems: "center",
    top: hp("2%"),
    elevation: 12,
    fontFamily: "OpenSans_Regular",
    fontSize: 20,
    borderRadius: 19,
    shadowColor: "#000",
    shadowOffset: { width: 0,height: 10 },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

  },
  submit_text: {
    padding: "7%",
    borderRadius: 20,
  },
  boldText: {
    color: "#24da9d",
    fontFamily: "OpenSans_Bold",
    fontWeight: "700",
  },
  input: {
    alignSelf: "center",
    top: "20%",
    width: wp("53%"),
    height: hp("5%"),
    alignItems: "flex-start",
    paddingLeft: wp("3%"),
    paddingTop: hp("0.5"),
    marginBottom: hp("3%"),
    marginTop: hp("1%"),
  },
  card: {
    alignSelf: "center",
    width: wp("75%"),
    height: hp("50%"),
    backgroundColor: '#f7fbfb',
    borderRadius: 29,
    shadowColor: '#dbebeb',
    shadowOffset: { width: 24, height: 24 },
    shadowRadius: 42,
    elevation: 20,
  },
  input_text: {
    color: "#172A3A",
  }
});

export default SignUp;
