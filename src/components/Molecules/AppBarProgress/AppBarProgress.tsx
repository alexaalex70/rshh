import React, { FC } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import AppBar from '../../Atoms/AppBar/AppBar';
import ProgressBar from '../../Atoms/ProgressBar/ProgressBar';
import { RootState } from '../../../store/reducers/rootReducer';
import { QuestionSetInfoState } from '../../../store/models';

interface AppBarProgressProps {
  title: string;
  navigation: any;
}

const AppBarProgress: FC<AppBarProgressProps> = ({
  title = 'Question',
  navigation,
}) => {
  const { questionIndex, hint, hintStatus } = useSelector(
    (state: RootState) => state.questionSetInfo
  ) as QuestionSetInfoState;

  return (
    <View style={{ width: '100%' }}>
      <AppBar
        title={'roczen'}
        hint={hint}
        hintStatus={hintStatus}
        navigation={navigation}
      />
      <ProgressBar progress={questionIndex ? questionIndex : 0} />
    </View>
  );
};

export default AppBarProgress;
