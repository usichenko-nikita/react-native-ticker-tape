import React, { useMemo, useState, FC } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ticker } from 'react-native-ticker-tape';

const coins = [
  { id: 1, price: 10, percent_change: '-4', symbol: '₿', diff: 'less' },
  { id: 2, price: 55, percent_change: '+150.2', symbol: 'Ξ', diff: '' },
  { id: 3, price: 10, percent_change: '-4', symbol: '₮', diff: 'less' },
  { id: 4, price: 33, percent_change: '+99', symbol: '₳', diff: '' },
  { id: 5, price: 10, percent_change: '+12', symbol: '✕', diff: '' },
  { id: 6, price: 55, percent_change: '-43', symbol: '◎', diff: 'less' },
  { id: 7, price: 10, percent_change: '+95', symbol: '●', diff: '' },
  { id: 8, price: 33, percent_change: '+3400', symbol: 'Ł', diff: '' },
  { id: 9, price: 10, percent_change: '+1', symbol: 'Ⱥ', diff: '' },
  { id: 10, price: 55, percent_change: '-0.5', symbol: '∞', diff: 'less' },
  { id: 11, price: 10, percent_change: '+7', symbol: 'ɱ', diff: '' },
  { id: 12, price: 33, percent_change: '+4', symbol: 'Đ', diff: '' },
];
const App: FC = () => {
  const [paused, setPaused] = useState<boolean>(false);
  const onPress = () => {
    setPaused((prevState) => !prevState);
  };

  const coinsText = useMemo(() => {
    return coins.map((item, idx) => {
      const textStyle =
        item.diff === 'less' ? styles.redText : styles.greenText;
      return (
        <TouchableOpacity
          style={styles.coinContent}
          key={`coin-${item.id}-${idx}`}
          onPress={() => console.log(item.id, 'id')}
        >
          <Text>
            {'  '}
            <Text style={styles.text}>{`${item.symbol} `}</Text>
            <Text style={[styles.text, textStyle]}>{`${item.price}  `}</Text>
            <Text
              style={[styles.text, textStyle]}
            >{`${item.percent_change}%  `}</Text>
            {'  '}
          </Text>
        </TouchableOpacity>
      );
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <Text style={styles.title}>React Native Ticker</Text>
        <View style={styles.section}>
          <View style={styles.coinWrapper}>
            <TouchableOpacity onPress={onPress}>
              <View style={styles.button}>
                {paused ? <Text>Play</Text> : <Text>Pause</Text>}
              </View>
            </TouchableOpacity>
            <Ticker loop={true} isPaused={paused}>
              {coinsText}
            </Ticker>
          </View>
        </View>
        <View style={styles.section}>
          <Ticker msPerPX={100}>
            <Text style={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Ticker>
        </View>
        <View style={styles.section}>
          <Ticker isRTL msPerPX={50}>
            <Text style={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Ticker>
        </View>
        <View style={styles.section}>
          <Ticker msPerPX={5}>
            <Text style={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Ticker>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: 'black' },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  coinWrapper: { flexDirection: 'row', justifyContent: 'center' },
  button: {
    width: 50,
    height: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    color: '#ffffff',
    marginTop: 30,
    marginBottom: 40,
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  redText: {
    color: '#FF2517',
  },
  greenText: {
    color: '#00D964',
  },
  coinContent: { justifyContent: 'center', alignItems: 'center' },
});

export default App;
