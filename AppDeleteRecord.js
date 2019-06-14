import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

class Source extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Employees List',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { textAlign: 'center', flex: 1 },
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
  }
  componentDidMount() {
    fetch('http://dummy.restapiexample.com/api/v1/employees')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => console.log(error));
  }
  deleteItem = id => {
    const filteredData = this.state.dataSource.filter(item => item.id !== id);
    this.setState({ dataSource: filteredData });
  };
  deleteItemById = id => {
    // Works on both iOS and Android
    Alert.alert(
      'Delete Record',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.deleteItem(id) },
      ],
      { cancelable: false }
    );
  };
  renderItem = data => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('Details', {
          info: data.item.id,
        });
      }}
      onLongPress={() => this.deleteItemById(data.item.id)}>
      <View style={styles.list}>
        <Text style={styles.lightText}>Id: {data.item.id}</Text>
        <Text style={styles.lightText}>
          Employee Name: {data.item.employee_name}
        </Text>
        <Text style={styles.lightText}>
          Employee Salary: {data.item.employee_salary}
        </Text>
        <Text style={styles.lightText}>
          Employee Age: {data.item.employee_age}
        </Text>
      </View>
    </TouchableOpacity>
  );
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={item => item.id.toString()}
          renderItem={item => this.renderItem(item)}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dataSource: [],
      info: '',
    };
  }
  componentWillMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('info', 'NO-ID');
    fetch('http://dummy.restapiexample.com/api/v1/employee/' + itemId)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <Text style={styles.Text}>Id: {this.state.dataSource.id}</Text>
        <Text style={styles.Text}>
          Employee Name: {this.state.dataSource.employee_name}
        </Text>
        <Text style={styles.Text}>
          Employee Salary: {this.state.dataSource.employee_salary}
        </Text>
        <Text style={styles.Text}>
          Employee Age: {this.state.dataSource.employee_age}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
  },
  Text: {
    fontSize: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
});

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Source,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
