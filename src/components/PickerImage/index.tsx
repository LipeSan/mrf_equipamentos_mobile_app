import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { messages } from '../../shares/messages';
import { Color, Dimens, Fonts } from '../../shares/data';

import CameraImage from '../../assets/icons/camera.svg';
import GalleryImage from '../../assets/icons/gallery.svg';

interface ObjectPros {
  isVisible: boolean,
  showDialog: any,
  setValueModal?: any,
  placeholder: string,
  onItemClick?: any
}

const ImagePickerModal = (objectProps: ObjectPros) => {
  console.log("DATA",objectProps);
  
  const [isVisible, setIsVisible] = useState(objectProps.isVisible);
  const [optionList, setOptionList] = useState([
    {
      index: 0,
      title: messages.CAMERA,
    },
    {
      index: 1,
      title: messages.PHOTO_LIB,
    },
  ]);

  const common_styles = StyleSheet.create({
    dialog_grey_text_style: {
      color: Color.grey,
      fontSize: Dimens.dimen_20,
      lineHeight: Dimens.dimen_24,
      //fontFamily: Fonts.Regular,
      padding: Dimens.dimen_13,
      marginLeft: Dimens.dimen_10,
    },
    dialog_icon_style: {
      width: Dimens.dimen_25,
      height: Dimens.dimen_25,
    },
    dialog_horizontal_container_style: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: Dimens.dimen_20,
    },
    dialog_list_item_container_style: {
      width: '100%',
    },
  })

  const hideDialog = () => {
    setIsVisible(false);
    objectProps.showDialog(false)
  }

  const onMenuPress = (item:any, index:number) => {
      hideDialog();
      
      setTimeout(() => {
        if (objectProps.onItemClick) {
          objectProps.onItemClick(item.index);
        }
      }, 500);
  }

  const listItemLayout = (item:any, index:number) => {
      return (
        <TouchableOpacity
          style={common_styles.dialog_list_item_container_style}
          activeOpacity={Dimens.opacity}
          onPress={() => onMenuPress(item, index)}>
          <View style={common_styles.dialog_list_item_container_style}>
            <View style={common_styles.dialog_horizontal_container_style}>
              {index == 0 ? (
                <CameraImage width='24' height='24' style={common_styles.dialog_icon_style} />
              ) : null}
              {index == 1 ? (
                <GalleryImage width='24' height='24' style={common_styles.dialog_icon_style} />
              ) : null}
              <Text style={common_styles.dialog_grey_text_style}>
                {item.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
  };

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: Color.grey,
        height: 0.5,
      }}
    />
  );

  useEffect(() => {
    setIsVisible(objectProps.isVisible);
    setOptionList([
      {
        index: 0,
        title: messages.CAMERA,
      },
      {
        index: 1,
        title: messages.PHOTO_LIB,
      },
    ]);
},[objectProps])

  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={isVisible}
      onRequestClose={() => hideDialog}>
      <TouchableWithoutFeedback
        onPress={() => hideDialog}>
        <View
          style={{
            backgroundColor: Color.secondary,
            width: '100%',
            height: '100%',
            position: 'absolute',
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => { hideDialog() }}
            activeOpacity={0.7}>
            <View style={{ flex: 1 }} />
          </TouchableOpacity>
          <View style={{
            zIndex: 5000,
            flexDirection: 'row',
            backgroundColor: Color.white,
            borderRadius: 12,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={optionList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }:any) =>
                listItemLayout(item, index)
              }
              ItemSeparatorComponent={renderSeparator}
              style={{width: '100%'}}
            />
          </View>
          <View
            style={[{
              zIndex: 5000,
              backgroundColor: Color.white,
              borderRadius: 12,
              marginTop: 10,
            }]}>

            <View style={{
              height: 1,
              backgroundColor: '#d3d3d3',
              marginHorizontal: 15
            }} />
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={hideDialog}
              activeOpacity={0.7}>
              <View style={{ width: '100%' }}>
                <Text style={{
                  color: Color.primary,
                  fontSize: 20,
                  textAlign: 'center',
                  padding: 13,
                  width: '100%',
                  textTransform: 'uppercase'
                }}>
                  {messages.BUTTON_CANCEL}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {Platform.OS === 'ios' ? null : (
            <Modal
              transparent={true}
              visible={isVisible}
              animationType={'fade'}
              onRequestClose={hideDialog}>
            </Modal>
          )}
        </View>
      </TouchableWithoutFeedback>

    </Modal>
  )
}

export default ImagePickerModal;