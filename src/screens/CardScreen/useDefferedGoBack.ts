import { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/core/src/types';

export const useDefferedGoBack = (navigation: NavigationProp<any>) => {
  const [loading, setLoading] = useState(false);
  const [goingBack, setGoingBack] = useState(false);
  useEffect(() => {
    if (!loading && goingBack) {
      navigation.goBack();
      setGoingBack(false);
    }
  }, [loading, goingBack, navigation]);
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        if (!loading) return;
        e.preventDefault();
        setGoingBack(true);
      }),
    [navigation, loading]
  );
  return setLoading;
};
