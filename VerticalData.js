import React from 'react'
import { FlatList, View } from 'react-native'

export default function VerticalData({ DATA, renderIte }) {
    return (
        <View >
            {<FlatList
                data={DATA}
                renderItem={({ item }) => renderIte(item, 'column')}
                keyExtractor={item => item.id}

                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
            />}
        </View>
    )
}
