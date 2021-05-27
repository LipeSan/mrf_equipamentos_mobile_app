import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ApiEquipments from '../../services/equipments';
import EquipmentCard from '../../components/EquipmentCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Status} from '../../shares/data';
import Spinner from 'react-native-loading-spinner-overlay';
import EquipmentDetailsPage from '../EquipmentDetails';
import { FAB } from 'react-native-paper';

const EquipmentsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [equipmentList, setEquipmentList] = useState([]);
    const [equipmentListAux, setEquipmentListAux] = useState([]);

    const [isAll, setIsAll] = useState(true);
    const [isToDo, setIsToDo] = useState(false);
    const [isProgress, setIsProgress] = useState(false);

    const navigation = useNavigation();

    const getAll = async () => {
        setEquipmentList([]);
        setEquipmentListAux([]);
        setIsLoading(true);
        const result = await ApiEquipments.getAllEquipments();
        if (!result.success) {
            setIsLoading(false);
            return;
        }
        setEquipmentList(result.data);
        setEquipmentListAux(result.data);
        setIsLoading(false);
    }

    const filter = (type: any) => {
        setEquipmentList([])
        switch (type) {
            case 'all':
                setIsAll(true);
                setIsToDo(false);
                setIsProgress(false);
                setEquipmentList(equipmentListAux);
                break;
            case 'todo':
                setIsAll(false);
                setIsToDo(true);
                setIsProgress(false);
                setEquipmentList(equipmentListAux.filter((element: any) => element.status === Status[0].value));
                break;
            case 'progress':
                setIsAll(false);
                setIsToDo(false);
                setIsProgress(true);
                setEquipmentList(equipmentListAux.filter((element: any) => element.status === Status[1].value));
                break;
            default:
                break;
        }
    }

    const goToEqipament = (id:any) => {
        navigation.navigate('EquipmentDetails', {
            equipmentId: id
        });
    }

    useEffect(() => {
        getAll();
    }, [])

    return (
        <Styles.Container>
            <Spinner 
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
            />
            <View style={{ flexDirection: "row", height: 60 }}>
                <View style={{ width: '33%', height: '100%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => filter('all')} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: (isAll ? '#7193E2' : 'white'),
                        borderRadius: 5,
                        margin: 10
                    }}>
                        <Text style={{ fontSize: 18, color: (isAll ? 'white' : 'black') }}>{"Todos"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '33%', height: '100%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => filter('todo')} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: (isToDo ? '#7193E2' : 'white'),
                        borderRadius: 5,
                        margin: 10
                    }}>
                        <Text style={{ fontSize: 18, color: (isToDo ? 'white' : 'black') }}>{"A Fazer"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '33%', height: '100%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => filter('progress')} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: (isProgress ? '#7193E2' : 'white'),
                        borderRadius: 5,
                        margin: 10
                    }}>
                        <Text style={{ fontSize: 18, color: (isProgress ? 'white' : 'black') }}>{"Em Prog."}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{margin:15}}>
                <Text style={{fontSize:16}}>{`Total de Equipamentos: ${equipmentList ? equipmentList.length : 0}`}</Text>
            </View>
            <ScrollView>
                <View style={{ margin: 15 }}>
                    {
                        equipmentList.map((element, index) => (
                            <EquipmentCard key={index} equipment={element} onPress={(id:string) => {goToEqipament(id)}}/>
                        ))
                    }
                </View>
            </ScrollView>
        </Styles.Container>
    )
}

export default EquipmentsPage;