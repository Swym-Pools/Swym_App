import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity,Clipboard,Alert,ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import { FontAwesome5} from '@expo/vector-icons';
import SwymNameLogo from '../../../components/SwymNameLogo';
import NavigationShape from '../../../data/shapes/Navigation';
import { useForm, Controller } from 'react-hook-form';
import FormStyles from '../../../utils/styling/Forms';
import Colors from '../../../utils/styling/Colors';
import ButtonStyles from '../../../utils/styling/Buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavbarStyles from '../../../utils/styling/Navbar';
import { createUserAccount, fetchTOTPCode, saveTOTP } from '../../../utils/networking/API';


// const COLOR = '#e9e9e9'
const SignUpTOTPScreen = ({ route }) => {
  var userId = route.params.userId;
  const [copyButtonText, setcopyButtonText] = useState('')
  const { setIsSignedIn, setUserId } = route.params;
  const [errorsExist, setErrorsExist] = useState(false);
  const { control, formState, handleSubmit, watch, errors, setError } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const [code, setCode] = useState({"loaded": false, "code": null});
  const onSubmitted = async () => {
    console.log("SUBMIT");
    const response = await saveTOTP(userId, {code: code.code});

    console.log("status", response.status)
    
    if (response.status === 200 && response.data.success) {
      setIsSignedIn(true);
    } else {
      setError('api', { type: 'manual', message: 'API error' });
    }
  };


//TODO useCallback 
const handlerFetchTOTP =async (mounted)=>{
   var response = await fetchTOTPCode(userId);
    var data = response.data;
    console.log('code is ', data.code);
    if(mounted){ 
     setcopyButtonText(data.code)
     setCode( {"loaded": true, "code": data.code });
    }
      
}
useEffect(() => {
    let mounted = true 
    handlerFetchTOTP(mounted)
    return ()=> mounted =false
  }, []);

  if ( !code.loaded ) {
    return (
        <>
         <Text>Loading..</Text>
        </>
    );
  }

  const handleCopyToClipBoard=(e)=>{
      //set clipboard string to code.code 
       Clipboard.setString(code.code)
       setcopyButtonText('TOTP CODE COPIED !')
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />
      
         <View style={styles.formContainer}>
             <Text style={styles.totpHeader}>
               To setup 2FA please add the following code to your authenticator:
             </Text>
            <TouchableOpacity onPress={handleCopyToClipBoard} >
              <View style={{
                backgroundColor: Colors.white,
                padding : 4 ,
                borderRadius:12,
                display:'flex',
                justifyContent:'space-between',
                flexDirection:'row',
                alignItems:'center',
              }}>

                    <Text style={{
                      color : Colors.orange,
                      fontSize : 12
                    }} >{copyButtonText.length <20 ?copyButtonText:`${copyButtonText.slice(0,20)}... `}</Text>
                 <FontAwesome5 name='copy' size={16} color={Colors.orange}  />
              </View>
            </TouchableOpacity>
         </View>


      <View style={styles.actionButtonsContainer}>
        <Button
          title="Submit"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={{...ButtonStyles.actionButton , width:'100%'}}
          titleStyle={{...ButtonStyles.actionButtonTitle,fontSize:16}}
          onPress={onSubmitted}
          disabledTitleStyle={{color:Colors.orange}}
          disabled={errorsExist || formState.isSubmitting }
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: 'center',
  },

  logoNameContainer: {
    marginBottom: 22,
    fontFamily:'LuckiestGuy-Regular',
  },

  formContainer: {
    marginBottom: 22,
    minWidth: 240,
    width: '80%',
  },

  formFieldContainer: {
    marginBottom: 20,
  },

  actionButtonsContainer: {
    marginBottom: 22,
    padding:32,
    width:'100%'
  },

  labelText: {
    ...FormStyles.labelText,
    color: Colors.purple,
  },
  totpHeader: {
    color: Colors.black,
    fontSize:16 
  },
  totp: {
    color: Colors.black,
    fontSize: 32
  },
});

SignUpTOTPScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

SignUpTOTPScreen.defaultProps = {};

SignUpTOTPScreen.navigationOptions = ({ navigation }) => {
  return {
    headerBackTitle: '',
    headerTitle: () => {
      return <Text style={NavbarStyles.mainTitle}>Create Your Account</Text>;
    },
    headerTitleStyle: NavbarStyles.mainTitle,
  };
};

export default SignUpTOTPScreen;
