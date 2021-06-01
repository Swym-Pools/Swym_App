import React from "react";
import {StyleSheet,TouchableOpacity,View,SafeAreaViewBase,Text} from 'react-native'
import { Ionicons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import Colors from '../utils/styling/Colors';


const createTabarElement  = (descriptors,state,navigation)=>(route, index)=> {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined  ? options.title: route.name;
        const isFocused = state.index === index;

        let Icon = null
        if( label === 'Savings'){
            Icon =  <SimpleLineIcons name="graph" size={25} color={"#fff"} />;
        }
        if(label === 'Pool'){
            Icon = <Ionicons name="ios-water" size={25} color={"#fff"} />;
        }
        if(label === 'Account'){
            Icon = <FontAwesome name="user-circle-o" size={25} color={"#fff"} />;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex:1}}
          >
            <View style={{justifyContent:'center',alignItems:'center'}}>
                  {Icon}
                 <Text style={{color:isFocused?'#fff':'#e3e3e3'}}>{label}</Text>
            </View>

          </TouchableOpacity>
        );
      }


const TabBar = ({ state, descriptors, navigation ,options}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  
  if (focusedOptions.tabBarVisible === false) return null;

  return (
  <View style={{
      width:"100%",
      padding:16,
      paddingBottom:16,
      borderTopColor:'#fff',
      borderTopWidth:1,
      backgroundColor: Colors.blue
  }} >

      
  <View style={{ flexDirection: 'row' }}>
      {state.routes.map(createTabarElement(descriptors,state,navigation))}
    </View>
  </View>
  )
};
export default TabBar;