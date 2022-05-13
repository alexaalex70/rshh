import React, { FC, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

interface TabsProps {
  tabs: string[];
  onChange: (x: number) => void;
  index: number;
}

const Tabs: FC<TabsProps> = ({ tabs, onChange, index }) => {
  const { width } = useWindowDimensions();

  const animatedValue = useRef(new Animated.Value(0)).current;
  const tabWidth = (1 / tabs.length) * width;

  useEffect(() => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      {tabs.map((tab, i) => {
        const isActive = index === i;

        const textColor = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['#666666', isActive ? '#6200EE' : '#666666'],
          extrapolate: 'clamp',
        });

        const widthUnderline = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', isActive ? '100%' : '0%'],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity
            key={i}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => onChange(i)}
          >
            <Animated.Text style={[styles.tabTitle, { color: textColor }]}>
              {tab}
            </Animated.Text>
            <Animated.View
              style={[styles.borderBottom, { width: widthUnderline }]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
    color: '#666666',
  },
  borderBottom: {
    height: 2,
    backgroundColor: '#6200EE',
    marginTop: 8,
  },
});

export default Tabs;
