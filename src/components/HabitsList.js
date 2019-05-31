import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HabitsList = props => {
    const { habits } = props;
    const ret = habits.map(habit => {
        const { id, name } = habit;
        return (
            <View style = { styles.container } key = { id }>
                <Text style = { [styles.default, styles.id] }>{ id }</Text>
                <Text style = { [styles.default, styles.name] }>{ name }</Text>
            </View>
        );
    });

    return (
        <View>
            { ret }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    default: {
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        borderStyle: 'solid'
    },
    id: {
        flex: 0.1,
        textAlign: 'center',
    },
    name: {
        flex: 0.9,
    }
});

export default HabitsList;