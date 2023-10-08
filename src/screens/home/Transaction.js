import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, IMGS, ROUTES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';
import {useSelector} from 'react-redux';

function Transaction({navigation}) {
  const vendor = useSelector(state => state.vendor.vendor);
  const [transactionHistory, setTransactionHistory] = useState([
    {
      cash_collected: '832.00',
      created_at: null,
      customer_id: 1,
      order_value: '832.00',
      points_redeemed: 0,
      points_rewarded: 24,
      reward_balance_after: 24,
      reward_balance_before: 0,
      seller_id: 1,
      status: 'completed',
      txn_id: 1,
      txn_type: 'sale',
    },
  ]);

  useEffect(() => {
    console.log('api load');
    let getTransactions = () => {
      let requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sellerId: parseFloat(vendor.sellerid),
        }),
      };

      fetch(
        'http://13.200.100.28:5000/api/fetchTransactionsBySellerID',
        requestOptions,
      )
        .then(response => response.json())
        .then(async transactions => {
          let t = await transactions;
          console.log(t);
          setTransactionHistory(t.transactions);
          console.log('th', transactionHistory);
        })
        .catch(error => console.log('error', error));
    };
    getTransactions();
  }, []);

  const Item = ({item}) => {
    console.log('items', item);
    return (
      <View style={styles.container}>
        <DropShadow style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <Image source={IMGS.user} style={styles.userIcon} />
              <Text style={styles.cardDetail}>{item.customer_id}</Text>
            </View>
            <View>
              <Text style={styles.cardDetail}>Rs {item.cash_collected}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 8}}>
            <View style={styles.cardDetailDescCont}>
              <Text style={styles.cardDetailDesc}>Order {'\n'} Value</Text>
              <Text style={styles.cardDetailDescVal}>
                Rs {item.order_value}
              </Text>
            </View>
            <View style={styles.cardDetailDescCont}>
              <Text style={styles.cardDetailDesc}>Loyalty {'\n'} Used</Text>
              <Text style={styles.cardDetailDescVal}>
                Rs {item.points_redeemed}
              </Text>
            </View>
            <View style={styles.cardDetailDescCont}>
              <Text style={styles.cardDetailDesc}>Loyalty {'\n'} Rewarded</Text>
              <Text style={styles.cardDetailDescVal}>
                Rs {item.points_rewarded}{' '}
              </Text>
            </View>
            <View style={styles.cardDetailDescCont}>
              <Text style={styles.cardDetailDesc}>Cash {'\n'} Collected</Text>
              <Text style={styles.cardDetailDescVal}>
                Rs {item.cash_collected}
              </Text>
            </View>
          </View>
          <Text></Text>
        </DropShadow>
      </View>
    );
  };

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.main}>
      <FlatList
        data={transactionHistory}
        renderItem={Item}
        keyExtractor={item => item.txn_id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
  },

  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  card: {
    width: '100%',
    color: COLORS.white,
    backgroundColor: COLORS.lightBlack,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  cardHeading: {
    color: COLORS.white,
    fontSize: 27,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardDetail: {
    color: COLORS.white,
    fontSize: 16,
    paddingRight: 40,
    paddingTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  userIcon: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primary,
    padding: 4,
    borderRadius: 15,
    borderColor: COLORS.primary,
  },
  cardDetailDesc: {
    fontSize: 12,
    color: COLORS.white,
    paddingBottom: 4,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardDetailDescVal: {
    fontSize: 14,
    color: COLORS.white,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardDetailDescCont: {
    width: '25%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Transaction;
