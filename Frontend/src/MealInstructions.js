import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Platform, Alert} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import * as Constants from "./Constants";

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
        return (
            <View>
            <FlatList
                data={ingredients}
                //style={{width: '70%'}}
                renderItem={({item}) => (
                    <View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'darkseagreen',
                            }}>
                            <Text>{item}</Text>
                        </View>
                        <View style={{padding: '2%'}} />
                    </View>
                )}
            />
                <FlatList
                    data={instructions}
                    //style={{width: '70%'}}
                    renderItem={({item}) => (
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    //backgroundColor: 'darkseagreen',
                                }}>
                                <Text>{item}</Text>
                            </View>
                            <View style={{padding: '2%'}} />
                        </View>
                    )}
                />
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
