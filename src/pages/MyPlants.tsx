import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native'
import waterdrop from '../assets/waterdrop.png'
import { Header } from '../components/Header';
import colors from '../styles/colors';
import {PlantProps , loadPlant}  from '../libs/storege'
import {formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCadSecondary } from '../components/PlantCadSecondary';
 
export function MyPlants() {
  const [myPants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

 useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime}.`
      );

      setMyPlants(plantsStorage);
      setLoading(false);

    }

    loadStorageData();
  }, []);

  return (
    <View style={style.container}>
      <Header />
      <View style={style.spotligth}>
        <Image
          source={waterdrop}
          style={ style.spotlightImage}
        />
        <Text style={style.spotligthText}>
          { nextWatered }
        </Text>
      </View>

      <View style={style.plants}>
        <Text style={style.plantsTitles}>
          Próxima Regada
        </Text>
        <FlatList
          data={myPants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCadSecondary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}

        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotligth:{
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotligthText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitles: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }

})