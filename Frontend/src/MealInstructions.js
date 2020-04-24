import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Platform, Alert, ScrollView} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import * as Constants from "./Constants";
import {SafeAreaView} from "react-native-safe-area-context";

// Sources:
// https://reactnative.dev/docs/images
// https://medium.com/react-native-training/position-element-at-the-bottom-of-the-screen-using-flexbox-in-react-native-a00b3790ca42
// https://stackoverflow.com/questions/38887069/make-an-item-stick-to-the-bottom-using-flex-in-react-native
// https://github.com/facebook/react-native/issues/325
// https://reactnative.dev/docs/handling-touches
// https://reactnativecode.com/add-onpress-onclick-image/
// https://www.tutorialspoint.com/react_native/react_native_listview.htm

class MealInstructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            ingredients: '',
            instructions: '',
            meals: [],
        };
    }

    render() {
        const {route} = this.props;
        const {ingredients} = route.params;
        const {instructions} = route.params;
        console.log(ingredients);
        return (
            <View style = {{flex: 1}}>
                <SafeAreaView>
                    <ScrollView>
                        <Text style={{fontSize: 16}}>Ingredients:{'\n'}</Text>
                        <FlatList
                            data={ingredients}
                             scrollEnabled={false}
                           // style={{backgroundColor: 'yellow'}}
                            renderItem={({item}) => (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <View
                                    style={{
                                        flex: 1,
                                        //justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        backgroundColor: 'darkseagreen',
                                        width: '60%'
                                    }}>
                                    <Text style={{textAlign: 'center', fontSize: 16}}>{item}</Text>
                                </View>
                                <View style={{padding: '2%'}} />
                            </View>
                            )}
                        />
                        <Text style={{alignContent: 'center', fontSize: 16}}>{'\n'}Instructions:{'\n'}</Text>

                    <FlatList
                    data={instructions}
                    //style={{width: '70%'}}
                    scrollEnabled={false}
                    renderItem={({item}) => (
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    //justifyContent: 'center',
                                    //alignItems: 'center',
                                    //backgroundColor: 'darkseagreen',
                                }}>
                                <Text style={{fontSize: 16}}>{item}</Text>
                            </View>
                            <View style={{padding: '2%'}} />
                        </View>
                    )}
                />
                </ScrollView>
                </SafeAreaView>
                <View style={{padding: 10}}/>
            </View>

        );
    }
}

export default function(props) {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <MealInstructions {...props} navigation={navigation} route={route} />
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: '500',
        flex: 1,
        marginTop: '10%',
    },
    rowcontainer: {
        flex: 1,
        padding: 10,
        height: 100,
        marginTop: 3,
        backgroundColor: '#3eb245',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowview: {
        // position: 'absolute',
        // right: 0,
        flexDirection: 'row',
    },
    textheader: {
        color: 'black',
        margin: '10%',
        textAlign: 'center',
        fontSize: 24,
    },
    text: {
        margin: 7,
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    ImageIconStyle: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 10,
        height: 25,
        width: 25,
    },
});
