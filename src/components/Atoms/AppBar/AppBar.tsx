import React, { FC } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { View } from 'react-native';
import { Hint, updateHint } from 'rh-shared';
import { useDispatch } from 'react-redux';
import { colors } from '../../../config/colors';
interface AppButtonProps {
  navigationIcon?: string;
  title: string;
  navigation?: any;
  hint?: Hint | undefined;
  hintStatus?: boolean;
  avatar?: boolean;
  info?: boolean;
  infoFunc?: () => void;
}

const AppBar: FC<AppButtonProps> = ({
  navigationIcon = 'close',
  title = '',
  hint,
  hintStatus,
  navigation,
  avatar,
  info,
  infoFunc,
}) => {
  const dispatch = useDispatch();
  const _handleHint = () => {
    dispatch(
      updateHint({
        hintStatus: !hintStatus,
      })
    );
  };

  return (
    <Appbar.Header style={{ height: 44, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Appbar.Action
          icon={navigationIcon}
          color="black"
          onPress={() => navigation.pop()}
        />
        {avatar && (
          <Avatar.Text
            style={{ backgroundColor: colors.blueChalk }}
            size={36}
            label="#"
          />
        )}
        <Appbar.Content
          title={title}
          color="black"
          titleStyle={{ fontSize: 21, fontWeight: 'bold' }}
        />
        {hint && (hint.body.en.length > 0 || hint.title.en.length > 0) ? (
          <Appbar.Action
            icon="help-circle-outline"
            onPress={_handleHint}
            color="black"
          />
        ) : null}
        {info && (
          <Appbar.Action icon="information" onPress={infoFunc} color="black" />
        )}
      </View>
    </Appbar.Header>
  );
};

export default AppBar;
