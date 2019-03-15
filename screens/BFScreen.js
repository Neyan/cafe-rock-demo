import * as React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import PhotoGrid from 'react-native-image-grid';

class BFScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      imageuri: '',
      ModalVisibleStatus: false,
    };
    this.state = { items: [] };
  }

  componentDidMount() {
    var that = this;
    //let items = Array.apply(null, Array(60)).map((v, i) => {
    //  return { id: i, src:  'https://drop.ndtv.com/albums/COOKS/foodpictures/tealeavesgallery.jpg?output-format=webp' };
    //});
	//let items = Array.apply(null, Array(6));
	//items.push( { id: '1', src:  'https://drop.ndtv.com/albums/COOKS/foodpictures/tealeavesgallery.jpg?output-format=webp' });
	
	items = [
        {
          id: "Lunch1",
          src: 'https://drop.ndtv.com/albums/COOKS/foodpictures/tealeavesgallery.jpg?output-format=webp'
        },
		{
          id: "Lunch2",
          src: 'https://d2814mmsvlryp1.cloudfront.net/wp-content/uploads/2016/08/Edna-Valley-Risotto-Prep-3-copy.jpg'
        },
		{
          id: "Lunch3",
          src: 'https://d2814mmsvlryp1.cloudfront.net/wp-content/uploads/SHRIMP_TOSTADAS_4x5-copy.jpg'
        },
		{
          id: "Lunch4",
          src: 'https://d2814mmsvlryp1.cloudfront.net/wp-content/uploads/2017/12/110517_WGC_PAELLA_PARTY-_118.jpg'
        },
		{
          id: "Lunch5",
          src: 'https://img.wonderhowto.com/img/original/71/01/63590176905859/0/635901769058597101.jpg'
        },
		{
          id: "Lunch6",
          src: 'https://diethood.com/wp-content/uploads/2015/09/Crock-Pot-Honey-Garlic-Chicken-Recipe-1.jpg'
        },
		{
          id: "Lunch7",
          src: 'https://diethood.com/wp-content/uploads/2019/02/Cauliflower-Chicken-Casserole-3.jpg'
        },
		{
          id: "Lunch8",
          src: 'https://diethood.com/wp-content/uploads/2019/02/Cauliflower-Chicken-Casserole-1.jpg'
        },
		{
          id: "Lunch9",
          src: 'https://diethood.com/wp-content/uploads/2019/02/Cauliflower-Chicken-Casserole-2.jpg'
        }
		
		
		
  ];
	
    that.setState({ items });
  }
  renderHeader() {
    return <Text style={{padding:16, fontSize:20, color:'white', backgroundColor:'green'}}>Image Gallery</Text>;
  }
  ShowModalFunction(visible, imageURL) {
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL,
    });
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal,
        }}
        onPress={() => {
          this.ShowModalFunction(true, item.src);
        }}>
        <Image
          resizeMode="cover"
          style={{ flex: 1 }}
          source={{ uri: item.src }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    if (this.state.ModalVisibleStatus) {
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus,'');
          }}>
          <View style={styles.modelStyle}>
            <Image
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                this.ShowModalFunction(!this.state.ModalVisibleStatus,'');
              }}>
              <Image
                source={{
                  uri:
                    'https://aboutreact.com/wp-content/uploads/2018/09/close.png',
                }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      return (
        <View style={styles.containerStyle}>
        <PhotoGrid
          data={this.state.items}
          itemsPerRow={3}
          itemMargin={1}
          itemPaddingHorizontal={1}
          //renderHeader={this.renderHeader}
          renderItem={this.renderItem.bind(this)}
        />
        </View>
      );
    }
  }
}

export default BFScreen;
const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 0
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
  },
});
