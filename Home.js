import { useEffect, useState, useCallback } from 'react';
import { RefreshControl, SafeAreaView, FlatList, View, Text, Pressable, Image, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native';
import MarqueeText from 'react-native-marquee';

export default function Home({ navigation }) {
    const [isLoading2, setLoading2] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [scrollImgScroll, setScrollImg] = useState({})
    const [DATA, setData] = useState([])
    const [horizonData, sethorizonData] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        setRefreshing(true);
        fetch('https://www.googleapis.com/blogger/v3/blogs/2226748005741537560/posts/2891385067671012226?key=AIzaSyBNE-CBZDcWS9UuBHp0Z0VZC3gYud4d6PM')
            .then((res) => res.json())
            .then((res) => {
                setScrollImg(JSON.parse(res.content))
            })
            .catch((err) => console.log(err))
        fetch('https://www.googleapis.com/blogger/v3/blogs/2226748005741537560/posts/6326030387215385202?key=AIzaSyBNE-CBZDcWS9UuBHp0Z0VZC3gYud4d6PM')
            .then((res) => res.json())
            .then((res) => {
                setData(JSON.parse(res.content))
            })
            .catch((err) => console.log(err))
        fetch('https://www.googleapis.com/blogger/v3/blogs/2226748005741537560/posts/5525328377887222112?key=AIzaSyBNE-CBZDcWS9UuBHp0Z0VZC3gYud4d6PM')
            .then((res) => res.json())
            .then((res) => {
                sethorizonData(JSON.parse(res.content))
                setLoading2(false)
                setRefreshing(false);
            })
            .catch((err) => console.log(err))
    }
    const Item = ({ title, backgroundColor, img, type, label }) => (
        < Pressable onPress={() => navigation.navigate('content', {
            title,
            label
        })} >
            <View style={{ backgroundColor: backgroundColor, height: type === 'row' ? 150 : 150, width: type === 'row' ? 150 : 160, margin: 10, borderRadius: 15, marginBottom: 10, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <View >
                    <Image
                        style={{ borderRadius: 15, position: "relative", top: 0, width: 130, height: 100, marginBottom: 10 }}
                        source={{ uri: img }} />
                </View>
                <View>
                    <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>{title}</Text>
                </View>
            </View>
        </Pressable >
    );
    const renderItem = (item, type) => (
        <TouchableHighlight>
            <Item label={item.label} title={item.title} backgroundColor={item.backgroundColor} img={item.image} key={item.id + type} type={type}
            />
        </TouchableHighlight>
    );
    const onRefresh = useCallback(() => {
        getData()
    }, []);
    return (
        <SafeAreaView>
            {isLoading2 ? <View style={{
                flex: 1,
                justifyContent: "center"
            }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
                : <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>

                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <View style={{ padding: 5, backgroundColor: "green" }}>
                            <Text style={{ color: "white" }}>
                                New
                            </Text>
                        </View>
                        <View style={{ flex: 2, borderBottomColor: "green", borderBottomWidth: 2, borderTopColor: "green", borderTopWidth: 2 }}>
                            <MarqueeText
                                style={{ fontSize: 20 }}
                                speed={0.3}
                                delay={1000}
                                marqueeOnStart={true}
                                loop={true}
                            >
                                {scrollImgScroll.scroll}
                            </MarqueeText>
                        </View>
                    </View>
                    <View >
                        <Image
                            style={{ width: "100%", height: 200, marginBottom: 20, marginTop: 5 }}
                            source={{ uri: scrollImgScroll.img1 }} />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 15 }}>
                        Useful Info
                    </Text>
                    <View >
                        <FlatList
                            data={horizonData}
                            renderItem={({ item }) => renderItem(item, 'row')}
                            keyExtractor={item => item.id + "horizontal"}
                            horizontal
                            scrollEnabled={true}
                        />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 15, marginTop: 10 }}>
                        M.M.Events - Anakapalle
                    </Text>
                    <View>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => renderItem(item, 'column')}
                            keyExtractor={item => item.id}

                            contentContainerStyle={{ alignSelf: 'flex-start' }}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                        /></View>
                    <Image
                        style={{ width: "100%", height: 200, marginBottom: 20 }}
                        source={{ uri: scrollImgScroll.img2 }} />


                </ScrollView >}
        </SafeAreaView >
    );
}

