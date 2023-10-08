import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import data from '../assets/data/data.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SRC_WIDTH = Dimensions.get('window').width;
const CARD_LENGTH = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface itemProps {
  index: number;
  scrollX: number;
  data: any[];
}

function Item({index, scrollX, data}: itemProps) {
  const size = useSharedValue(0.8);

  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP,
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: size.value}],
    };
  });

  const renderStatus = () => {
    if (data[index].status === 'yes') {
      return (
        <View style={styles.statusContainer}>
          <View style={styles.greenDot} />
          <Text style={styles.statusText}>Open</Text>
        </View>
      );
    } else if (data[index].status === 'no') {
      return (
        <View style={styles.statusContainer}>
          <View style={styles.redDot} />
          <Text style={styles.statusText}>Closed</Text>
        </View>
      );
    }
  };

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <Image source={{uri: data[index].image}} style={styles.cardImage} />
      {renderStatus()}
      <Text style={styles.nameText}>{data[index].name}</Text>

      <View style={styles.textContainer}>
        <View style={styles.leftText}>
          <Text>Closes At: {data[index].closesAt}</Text>
          <Text>Delivery: {data[index].delivery}</Text>
        </View>
        {/* Phone Icon */}
        <FontAwesome
          name="phone-square"
          size={24}
          color="blue" // You can customize the color
          style={styles.phoneIcon}
        />
      </View>
    </Animated.View>
  );
}

export default function Carousel() {
  const [scrollX, setScrollX] = useState(0);

  return (
    <Animated.View>
      <AnimatedFlatList
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={CARD_LENGTH + SPACING * 1.5}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={'center'}
        data={data}
        horizontal={true}
        renderItem={({item, index}) => {
          return <Item index={index} scrollX={scrollX} data={data} />;
        }}
        //@ts-ignore
        keyExtractor={item => item.id}
        onScroll={event => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_LENGTH,
    height: 270, // Adjust the height as needed
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'white', // Add a background color for better readability
    marginHorizontal: SPACING,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '60%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  statusContainer: {
    position: 'absolute',
    top: SPACING,
    left: SPACING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 5,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
  statusText: {
    fontSize: 10.269,
    fontFamily: 'Satoshi Variable',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#FFF',
  },
  nameText: {
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Satoshi Variable',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  leftText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: '#000000',
    fontFamily: 'Satoshi Variable',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  rightText: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: '#000000',
    fontFamily: 'Satoshi Variable',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '300',
  },
});
