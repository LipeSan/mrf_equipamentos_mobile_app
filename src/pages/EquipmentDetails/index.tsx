import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Style from './styles';
import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../components/Input';
import AreaText from '../../components/AreaText'
import ButtonCustom from '../../components/ButtonCustom';
import { messages } from '../../shares/messages';
import { Voltage } from '../../shares/data'
import DatePickerModal from '../../components/PickerDate';
import ObjectPickerModal from '../../components/PickerObject';
import ImagePickerModal from '../../components/PickerImage';
import { Color, Status } from '../../shares/data'
import moment from 'moment';
import ApiEquipments from '../../services/equipments';
import Spinner from 'react-native-loading-spinner-overlay';
import CropImagePicker from 'react-native-image-crop-picker';
import ImageAux from '../../components/ImageAux';
import Toast from 'react-native-toast-message';

const EquipmentDetailsPage = (pageProps: any) => {

    const [model, setModel] = useState("");
    const [client, setClient] = useState("");
    const [collectionDate, setCollectionDate] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [defect, setDefect] = useState("");
    const [equipmentId, setEquipmentId] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [extraInformation, setExtraInformation] = useState("");
    const [serieNumber, setSerieNumber] = useState("");
    const [spent, setSpent] = useState("");
    const [status, setStatus] = useState(Status[0].value);
    const [voltage, setVoltage] = useState("");
    const [workHours, setWorkHours] = useState("");
    const [photoList, setPhotoList] = useState<Array<any>>([]);

    const [isErrorEquipmentType, setIsErrorEquipmentType] = useState(false);
    const [isErrorModel, setIsErrorModel] = useState(false);
    const [isErrorClient, setIsErrorClient] = useState(false);
    const [isErrorSerieNumber, setIsErrorSerieNumber] = useState(false);
    const [isErrorCollectionDate, setIsErrorCollectionDate] = useState(false);
    const [isErrorVoltage, setIsErrorVoltage] = useState(false);
    const [isErrorStatus, setIsErrorStatus] = useState(false);
    const [isErrorDeliveryDate, setIsErrorDeliveryDate] = useState(false);

    const [isVisibleVoltageModal, setIsVisibleVoltageModal] = useState(false);
    const [isVisibleDateModal, setIisVisibleDateModal] = useState(false);
    const [isVisibleDeliveryDateModal, setIisVisibleDeliveryDateModal] = useState(false);
    const [isVisibleStatusModal, setIisVisibleStatusModal] = useState(false);
    const [isVisibleImageModal, setIisVisibleImageModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (pageProps?.route?.params?.equipmentId) {
            setIsEdit(true);
            getEpqimentInfo(pageProps.route.params.equipmentId);
        }
    }, []);

    const getEpqimentInfo = async (id: string) => {
        setIsLoading(true);
        const result = await ApiEquipments.getEquipmentById(id);
        if (result.success) {
            const data = result.data;
            console.log("=====  DATA  =======", data);

            setModel(data.model)
            setClient(data.client)
            setCollectionDate(data.collectionDate)
            setDeliveryDate(data.deliveryDate)
            setDefect(data.defect)
            setEquipmentId(data.equipmentId)
            setEquipmentType(data.equipmentType)
            setExtraInformation(data.extraInformation)
            setSerieNumber(data.serieNumber)
            setSpent(data.spent)
            setStatus(data.status)
            setVoltage(data.voltage)
            setWorkHours(data.workHours)
            setPhotoList(data.images ? data.images : [])
            setIsLoading(false);
        }
    }

    const hideVoltageModal = (hide: boolean) => {
        setIsVisibleVoltageModal(hide);
    }

    const hideDateModal = (hide: boolean) => {
        setIisVisibleDateModal(hide);
    }

    const hideDeliveryDateModal = (hide: boolean) => {
        setIisVisibleDeliveryDateModal(hide);
    }

    const hideStatusModal = (hide: boolean) => {
        setIisVisibleStatusModal(hide);
    }

    const hideImageModal = (hide: boolean) => {
        setIisVisibleImageModal(hide);
    }

    const backButton = () => {
        pageProps.navigation.goBack();
    }

    const validation = () => {
        if (client == '') {
            setIsErrorClient(true);
        }
        if (equipmentType == '') {
            setIsErrorEquipmentType(true);
        }
        if (model == '') {
            setIsErrorModel(true);
        }
        if (serieNumber == '') {
            setIsErrorSerieNumber(true);
        }
        if (voltage == '') {
            setIsErrorVoltage(true);
        }
        if (collectionDate == '') {
            setIsErrorCollectionDate(true);
        }
        console.log("PHOTO", photoList);

        if (collectionDate != '' && voltage != '' && serieNumber != '' && model != '' && equipmentType != '' && client != '') {
            apiSave();
        }
    }

    const apiImages = () => {
        return new Promise(async (resolve, reject) => {
            let imgList: Array<any> = [];
            if (photoList.length > 0) {
                for (let element of photoList) {
                    if (element.path) {
                        let formdata = new FormData();
                        formdata.append("file", {
                            uri: element.sourceURL,
                            name: element.filename,
                            type: element.mine
                        });
                        const result = await ApiEquipments.updatePhoto(pageProps.route.params.equipmentId, formdata);
                        console.log("======= DATA-01 =========", result);
                        if (result.success) {
                            imgList.push(result.data);
                        }
                    } else {
                        imgList.push({url: element.name});
                    }
                }
                resolve(imgList)
            }
            resolve([]);
        })

    }

    const apiSave = async () => {
        setIsLoading(true);
        let equipment = {
            equipmentType: equipmentType,
            client: client,
            model: model,
            serieNumber: serieNumber,
            voltage: voltage,
            collectionDate: collectionDate,
            extraInformation: extraInformation,
            status: status,
            defect: defect,
            deliveryDate: deliveryDate,
            spent: spent,
            workHours: workHours,
            images: await apiImages()
        }
        const result = isEdit ? await ApiEquipments.editEquipment(pageProps.route.params.equipmentId, equipment) : await ApiEquipments.createEquipment(equipment);
        setIsLoading(false);
        if (!result) {
            return;
        }
        Toast.show({
            type: 'success',
            position: 'top',
            text1: '',
            text2: result.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
        setTimeout(() => {
            pageProps.navigation.navigate("Equipments");
        }, 3000);
    }

    const getVoltage = (value: string) => {
        const voltage = Voltage.find(element => element.value === value);
        return voltage?.label;
    }

    const getStatus = (value: string) => {
        const status = Status.find(element => element.value === value);
        return status?.label;
    }

    const onImageOptionPress = (selected_option: any) => {
        console.log("DATA",);

        if (selected_option === 0) {
            setTimeout(() => {
                openCamera();
            }, 500);
        } else if (selected_option === 1) {
            setTimeout(() => {
                openImages();
            }, 500);
        }
    }

    const openCamera = () => {
        CropImagePicker.openCamera({
            mediaType: 'photo',
        }).then((image) => {
            console.log("DATA", image);

        });
    }

    const openImages = () => {
        CropImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        }).then((images: Array<any>) => {
            let list: Array<any> = [];
            for (let element of images) {
                //list.push({ path: element.path });
                list.push(element);
            }
            setPhotoList(photoList.concat(list));
        });
    }

    const deleteImage = (image: any) => {
        let updatedList = [];
        if(image.path){
            updatedList = photoList.filter(item => item.path !== image.path);
        } else {
            updatedList = photoList.filter(item => item.name !== image.name);
        }
        setPhotoList(updatedList);
    }

    useEffect(() => {
    }, [photoList])

    return (
        <Style.Container>
            <Toast style={{ paddingTop: 20, zIndex: 10 }} ref={(ref) => Toast.setRef(ref)} />
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <ScrollView>
                <View style={{ margin: 10 }}>
                    <InputCustom
                        label={'Cliente'}
                        placeholder={'Cliente'}
                        errorMessage={messages.ERROR_FIELD}
                        isErrorMessageAvailable={isErrorClient}
                        value={client}
                        onChangeText={(text: string) => {
                            setClient(text);
                            setIsErrorClient(false)
                        }} />
                    <InputCustom
                        label={'Tipo de Equipamento'}
                        placeholder={'Tipo de Equipamento'}
                        errorMessage={messages.ERROR_FIELD}
                        isErrorMessageAvailable={isErrorEquipmentType}
                        value={equipmentType}
                        onChangeText={(text: string) => {
                            setEquipmentType(text);
                            setIsErrorEquipmentType(false)
                        }} />
                    <InputCustom
                        label={'Modelo'}
                        placeholder={'Modelo'}
                        errorMessage={messages.ERROR_FIELD}
                        isErrorMessageAvailable={isErrorModel}
                        value={model}
                        onChangeText={(text: string) => {
                            setModel(text);
                            setIsErrorModel(false)
                        }} />
                    <InputCustom
                        label={'Número de série'}
                        placeholder={'Número de série'}
                        errorMessage={messages.ERROR_FIELD}
                        isErrorMessageAvailable={isErrorSerieNumber}
                        value={serieNumber}
                        onChangeText={(text: string) => {
                            setSerieNumber(text);
                            setIsErrorSerieNumber(false)
                        }} />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{ width: '100%', zIndex: 3000 }}
                        onPress={() => hideVoltageModal(true)}>
                        <View pointerEvents={'none'}>
                            <InputCustom
                                label={'Voltagem'}
                                placeholder={'Voltagem'}
                                value={getVoltage(voltage)}
                                isErrorMessageAvailable={isErrorCollectionDate}
                                errorMessage={messages.ERROR_FIELD} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{ width: '100%', zIndex: 3000 }}
                        onPress={() => hideDateModal(true)}>
                        <View pointerEvents={'none'}>
                            <InputCustom
                                label={'Data de Coleta'}
                                placeholder={'Data de Coleta'}
                                value={collectionDate ? moment(collectionDate).format('DD/MM/YYYY') : collectionDate}
                                isErrorMessageAvailable={isErrorCollectionDate}
                                errorMessage={messages.ERROR_FIELD} />
                        </View>
                    </TouchableOpacity>
                    <AreaText
                        label={'Informações Extras'}
                        placeholder={'Informações Extras'}
                        errorMessage={messages.ERROR_FIELD}
                        isErrorMessageAvailable={false}
                        maxLine={8}
                        value={extraInformation}
                        onChangeText={(text: string) => {
                            setExtraInformation(text);
                        }} />

                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        {photoList.length > 0 ?
                            <ScrollView horizontal={true}>
                                {photoList.map((element, index) => (
                                    <ImageAux key={index} image={element} removeImage={(item: any) => { deleteImage(item) }} />
                                ))}
                            </ScrollView>
                            : null}
                    </View>
                    <View>
                        <ButtonCustom
                            onPress={() => hideImageModal(true)}
                            text={"Fotos"}
                            backgroundColor={Color.primary}
                            textColor={Color.white} />
                    </View>
                </View>
                {isEdit ?
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ width: '100%', zIndex: 3000 }}
                            onPress={() => hideStatusModal(true)}>
                            <View pointerEvents={'none'}>
                                <InputCustom
                                    label={'Status'}
                                    placeholder={'Status'}
                                    value={getStatus(status)}
                                    isErrorMessageAvailable={isErrorCollectionDate}
                                    errorMessage={messages.ERROR_FIELD} />
                            </View>
                        </TouchableOpacity>
                        <AreaText
                            label={'Defeitos Encontrados'}
                            placeholder={'Defeitos Encontrados'}
                            errorMessage={messages.ERROR_FIELD}
                            isErrorMessageAvailable={false}
                            maxLine={8}
                            value={defect}
                            onChangeText={(text: string) => {
                                setDefect(text);
                            }} />

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ width: '100%', zIndex: 3000 }}
                            onPress={() => hideDeliveryDateModal(true)}>
                            <View pointerEvents={'none'}>
                                <InputCustom
                                    label={'Data de Entrega'}
                                    placeholder={'Data de Entrega'}
                                    value={deliveryDate ? moment(deliveryDate).format('DD/MM/YYYY') : deliveryDate}
                                    isErrorMessageAvailable={isErrorDeliveryDate}
                                    errorMessage={messages.ERROR_FIELD} />
                            </View>
                        </TouchableOpacity>
                        <InputCustom
                            label={'Custo da Manutenção'}
                            keyboardType="numeric"
                            placeholder={'Custo da Manutenção'}
                            errorMessage={messages.ERROR_FIELD}
                            value={spent}
                            onChangeText={(text: string) => {
                                setSpent(text);
                            }} />
                        <InputCustom
                            label={'Horas trabalhadas'}
                            keyboardType="numeric"
                            placeholder={'Horas trabalhadas'}
                            errorMessage={messages.ERROR_FIELD}
                            value={workHours}
                            onChangeText={(text: string) => {
                                setWorkHours(text);
                            }} />
                    </View>
                    : null}


                <View style={{ margin: 10, marginBottom: 50 }}>
                    <View style={{ marginTop: 10 }}>
                        <ButtonCustom onPress={validation} text={"Salvar"} backgroundColor={Color.primary} textColor={Color.white} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <ButtonCustom onPress={backButton} text={"Voltar"} backgroundColor={Color.secondary} textColor={Color.white} />
                    </View>
                </View>

            </ScrollView>


            <DatePickerModal
                isVisible={isVisibleDateModal}
                showDialog={(hideModal: boolean) => hideDateModal(hideModal)}
                date={collectionDate ? new Date(collectionDate) : new Date()}
                setDateModal={(date: any) => {
                    setCollectionDate(date);
                    setIsErrorCollectionDate(false);
                }} />

            <DatePickerModal
                isVisible={isVisibleDeliveryDateModal}
                showDialog={(hideModal: boolean) => hideDeliveryDateModal(hideModal)}
                date={deliveryDate ? new Date(deliveryDate) : new Date()}
                setDateModal={(date: any) => {
                    setDeliveryDate(date);
                    setIsErrorDeliveryDate(false);
                }} />

            <ObjectPickerModal
                isVisible={isVisibleVoltageModal}
                item={voltage}
                showDialog={(hideModal: boolean) => { hideVoltageModal(hideModal) }}
                setValueModal={(value: any) => {
                    setVoltage(value);
                    setIsErrorVoltage(false);
                }}
                placeholder={'Voltagem'}
                itemList={Voltage} />

            <ObjectPickerModal
                isVisible={isVisibleStatusModal}
                item={status}
                showDialog={(hideModal: boolean) => { hideStatusModal(hideModal) }}
                setValueModal={(value: any) => {
                    setStatus(value);
                    setIsErrorStatus(false);
                }}
                placeholder={'Status'}
                itemList={Status} />

            <ImagePickerModal
                isVisible={isVisibleImageModal}
                showDialog={(hideModal: boolean) => { hideImageModal(hideModal) }}
                onItemClick={(selection_type: any) =>
                    onImageOptionPress(selection_type)
                }
                placeholder={'Image'} />

        </Style.Container>
    )
}

export default EquipmentDetailsPage;