import React, { FC } from 'react';
import { Appbar, Badge, IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { EventsState } from '../../../store/models/types/eventsTypes';

const AppBarHome: FC<any> = ({ navigation }) => {
  const { events } = useSelector(
    (state: RootState) => state.events
  ) as EventsState;

  const handleNavToActionCentre = () => {
    navigation.navigate('ActionCentre');
  };

  return (
    <Appbar.Header style={{ height: 44, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Appbar.Content
          title="roczen"
          color="black"
          titleStyle={{ fontSize: 21, fontWeight: 'bold' }}
        />
        <View>
          <IconButton
            icon="bell"
            color={colors.black}
            size={20}
            onPress={handleNavToActionCentre}
            disabled={events.length < 1}
          />
          {events?.length > 0 && (
            <Badge
              size={8}
              style={{
                backgroundColor: colors.black,
                position: 'absolute',
                top: 5,
              }}
            />
          )}
        </View>
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({});

export default AppBarHome;
