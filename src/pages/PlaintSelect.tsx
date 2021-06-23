
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,

} from 'react-native'
import { EnviromentButtonProps } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCadPrimary';
import { useNavigation } from '@react-navigation/core';

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps } from '../libs/storege';
 
interface EnviromentsPros{
  key: string,
  title: string
}


export function PlaintSelect() {

  const [enviroments, setEnviroments] = useState<EnviromentsPros[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteradPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  //paginamento 
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  async function fetchPlants() {
      const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
      if (!data)
        return setLoading(true);
      if (page > 1) {
        setPlants(oldValue => [... oldValue, ... data])
        setFilteredPlants(oldValue => [... oldValue, ... data])
      } else {
        
        setPlants(data)
        setFilteredPlants(data);
      }
      //animaçoes
        setLoading(false);
        setLoadingMore(false);
    }

  function handlerEnviromentSelected(enviraments: string) {
    setEnviromentSelected(enviraments);

    if (enviraments === 'all')
      return setFilteredPlants(plants);
    
    const filtered = plants.filter(plant => 
      plant.environments.includes(enviraments)  
    );
      
    setFilteredPlants(filtered);
  }

  function handlerFetchMore(distance: number) {
    if (distance < 1)
      return;
    
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlerPlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', {plant})
  }

  useEffect(() => {
     async function fetchEnviroment() {
      const { data } = await api
        .get('plants_environments?_sort=title&_order=asc');
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ])
    }
    fetchEnviroment();
  }, []);

  useEffect(() => {  
    fetchPlants();
  }, []);

  if (loading) {
    return<Load/>
  }
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Header />
        <Text style={ style.title}>Em qual ambiente</Text>
        <Text style={ style.subtitle}>você quer colocar sua planta</Text>
      </View>
      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButtonProps
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handlerEnviromentSelected(item.key)}
              
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={ style.enviromentList}
        />
      </View>
      
      <View style={style.plants}>
        <FlatList
          data={filteradPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlerPlantSelect(item)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => 
            handlerFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore 
              ? <ActivityIndicator color={colors.green} />
              : <></>
          }
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30,

  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 6,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  }
});