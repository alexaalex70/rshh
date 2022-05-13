import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperButton } from '../..';
import { PaperButtonProps } from '../../../config/interfaces';
interface FooterWithCTAProps {
  primaryCTA: PaperButtonProps;
  secondaryCTA?: PaperButtonProps;
  thirdCTA?: PaperButtonProps;
}

export const FooterWithCTA: FC<FooterWithCTAProps> = ({
  primaryCTA,
  secondaryCTA,
  thirdCTA,
}) => {
  return (
    <View style={{ paddingVertical: 5 }}>
      <View style={styles.footerWrapper}>
        <View style={styles.buttonStyle}>
          {secondaryCTA && secondaryCTA.show ? (
            <PaperButton {...secondaryCTA} />
          ) : null}
        </View>
        <View style={styles.buttonStyle}>
          {thirdCTA ? <PaperButton {...thirdCTA} /> : null}
        </View>
        <View style={styles.buttonStyle}>
          <PaperButton {...primaryCTA} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    flex: 1,
  },
});

export default FooterWithCTA;
