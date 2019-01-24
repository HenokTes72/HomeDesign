import React from 'react';
import { Container, Header, Button, Text, Content, H2, Icon } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import withResponsive from '../components/withReponsive';
import MenuButton from '../components/MenuButton';
import BedButton from '../components/BedButton';

var menus = {
  House: 0,
  Apartment: 1,
  Villa: 2,
  Studio: 3,
  "Student condo": 4
};

var revMenus = {
  0 : "House",
  1 : "Apartment",
  2 : "Villa",
  3 : "Studio",
  4 : "Student condo"
};

function getPrice(min, max, scale, range) {
  return min + (max - min) * (scale / range);
}

class HomeScreen extends React.Component {

  state = {
    values: [0, 10],
    menuIndex: 0,
    priceRange: [1500, 2500],
    beds: [1, 1, 1, 0, 0],
    baths: [1, 1, 1, 0, 0, 1]
  };

  multiSliderValuesChange = (newvalues) => {
    const min = 1500, max = 2500, range = 10;
    let priceRange = [...this.state.priceRange];
    let values = [...newvalues];
    this.setState({
      values,
    }, () => {
      const values = this.state.values;
      priceRange[0] = getPrice(min, max, values[0], range);
      priceRange[1] = getPrice(min, max, values[1], range);
      this.setState({
        priceRange,
      })
    });
  }

  getSelectedBaths = () => {
    var res = "==================\n";
    const { baths } = this.state;
    for (var i = 0; i < baths.length; i++) {
      if (baths[i] == 1) {
        res += "Bath " + (i + 1) + " is selected\n";
      }
    }
    res += "==================\n"
    return res;
  }

  getSelectedBeds = () => {
    var res = "=================\n";
    const { beds } = this.state;
    for(var i = 0; i < beds.length; i++) {
      if(beds[i] == 1) {
        res+= "Bed "+(i+1)+ " is selected\n";
      }
    }
    res+= "==================\n";
    return res;
  }

  getPriceRanges = () => {
    const { priceRange } = this.state;
    var res = "================\n";
    res += "MIN PRICE: "+priceRange[0]+"\n" + "MAX PRICE: "+priceRange[1]+"\n";
    res += "================\n";
    return res;
  }

  getPreferences = () => {
    const{ menuIndex, beds, baths, priceRange } = this.state;
    var summary = "";
    summary+= "Menu : " + revMenus[menuIndex] + "\n";
    summary+= this.getSelectedBeds();
    summary+= this.getSelectedBaths();
    summary+= this.getPriceRanges();
    return summary;
  }

  alertFinalPreference = () => {
    alert(this.getPreferences());
  }

  changeMenuIndex = (index) => {
    this.setState({
      menuIndex: index
    })
  }

  changeBeds = (index) => {
    let beds = [...this.state.beds];
    beds[index] = 1 - beds[index];
    this.setState({
      beds
    });
  }

  changeBaths = (index) => {
    let baths = [...this.state.baths];
    baths[index] = 1 - baths[index];
    this.setState({
      baths
    });
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { menuIndex, values, priceRange, beds, baths } = this.state;
    const { width } = this.props;

    console.log("MIN: " + priceRange[0]);
    console.log("MAX: " + priceRange[1]);

    return (
      <Container style={{marginTop: (Platform.OS === 'ios') ? 0 : 24}}>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Text style={[{ marginRight: 20, color: '#FFD800' }, styles.headText]}>HOME</Text>
            <Text style={[{ color: '#AEAEB1' }, styles.headText]}>FLATMATES</Text>
          </View>

          <View style={styles.body}>
            <Text style={{ marginBottom: 20, color: '#4D4F6D', fontSize: 24, fontWeight: 'bold' }}>Home preferences 1/3</Text>
            <View style={styles.subheader}>
              <Text style={[{ color: '#4D4F6D' }, styles.headText]}>LOOKNG FOR</Text>
              <Text style={{ fontSize: 12, color: '#FF0059', fontWeight: 'bold' }}> Clear all</Text>
            </View>

            <View style={styles.menus}>
              {
                Object.keys(menus).map((key, index) => {
                  return <MenuButton key={key} changeMenuIndex={this.changeMenuIndex} index={menus[key]} menuIndex={menuIndex} text={key} />
                })
              }
            </View>

            <View style={styles.preferences}>
              <View style={styles.price}>
                <Text style={styles.categoryHeader}>PRICE</Text>
                <View style={styles.priceRange}>
                  <Button rounded style={styles.buttonRounded}>
                    <Text style={styles.buttonTextRounded}>$1500</Text>
                  </Button>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <MultiSlider
                      values={[values[0], values[1]]}
                      sliderLength={width - 85 - 85 + 6}
                      onValuesChangeFinish={this.multiSliderValuesChange}
                      markerStyle={styles.markerStyle}
                      pressedMarkerStyle={styles.pressedMarkerStyle}
                      trackStyle={styles.trackStyle}
                      selectedStyle={styles.selectedStyle}
                      // containerStyle={styles.containerStyle}
                      markerOffsetX={10}
                      // markerOffsetY={10}
                      min={0}
                      max={10}
                      step={1}
                    />
                  </View>
                  <Button rounded style={styles.buttonRounded}>
                    <Text style={styles.buttonTextRounded}>$2500</Text>
                  </Button>
                </View>
              </View>

              <View style={styles.bed}>
                <Text style={styles.categoryHeader}>BEDROOMS</Text>
                <View style={styles.bedRange}>
                {
                  [0,1,2,3,4].map((key, index) => {
                      return <BedButton key={key} changeBeds={this.changeBeds} myIndex={key} isBedSelected={beds[key]} text={(key+1).toString()} />
                  })
                }
                </View>
              </View>

              <View style={styles.bed}>
                <Text style={styles.categoryHeader}>BATHROOM</Text>
                <View style={styles.bedRange}>
                  {
                    [0, 1, 2, 3, 4, 5].map((key, index) => {
                      return <BedButton key={key} changeBeds={this.changeBaths} myIndex={key} isBedSelected={baths[key]} text={(key + 1).toString()} />
                    })
                  }
                </View>
              </View>

              <View style={styles.directions}>
                <Button onPress={() => this.alertFinalPreference()} icon style={styles.buttonArrow}>
                  <Icon style={styles.buttonIconArrow} name="arrow-left" type="Feather" />
                </Button>
                <Button onPress={() => this.alertFinalPreference()} icon style={styles.buttonArrow}>
                  <Icon style={styles.buttonIconArrow} name="arrow-right" type="Feather" />
                </Button>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  buttonIconArrow: {
    textAlign: 'center',
    color: 'white',
    fontSize: 19
  },
  buttonArrow: {
    backgroundColor: '#FF0059',
    borderRadius: 50,
    height: 44,
    width: 44
  },
  buttonTextCircleActive: {
    color: 'white'
  },
  buttonTextCircle: {
    color: '#D6D3D3'
  },
  buttonCircle: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    height: 38,
    width: 40,
    marginRight: 7
  },
  buttonCircleActive: {
    backgroundColor: '#FF0059',
    borderRadius: 50,
    height: 38,
    width: 40,
    marginRight: 7,
    marginBottom: 7
  },
  buttonTextRounded: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonRounded: {
    backgroundColor: '#F4CF03',
    height: 30,
    alignSelf: 'center'
  },
  categoryHeader: {
    marginBottom: 20,
    color: '#4D4F6D',
    fontSize: 14,
    fontWeight: 'bold'
  },
  headText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  trackStyle: {
    height: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D6D3D3',
  },
  pressedMarkerStyle: {
    width: 26,
    height: 26,
  },
  selectedStyle: {
    backgroundColor: '#0AD8FD'
  },
  markerStyle: {
    backgroundColor: "white",
    width: 23,
    height: 23,
    marginTop: 5,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#AEAEB1'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e6e8'
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    flex: 1,

  },
  subheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menus: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 20
  },
  preferences: {
    flex: 1,
    justifyContent: 'space-around',

  },
  price: {
    marginBottom: 25
  },
  priceRange: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bed: {
    marginBottom: 25
  },
  bedRange: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  directions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});


export default withResponsive(HomeScreen);