import React, { Component } from 'react'
import { View, FlatList, Dimensions, Text, ScrollView, RefreshControl, SafeAreaView, ActivityIndicator, Image } from 'react-native'
import RenderHtml from 'react-native-render-html';

export class Content extends Component {
    state = {
        content: [],
        isLoading: true
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        this.setState({ isLoading: true })
        fetch(`https://www.googleapis.com/blogger/v3/blogs/2226748005741537560/posts?labels=${this.props.route.params.label}&key=AIzaSyBNE-CBZDcWS9UuBHp0Z0VZC3gYud4d6PM`)
            .then((res) => res.json())
            .then((res) => { this.setState({ content: res.items, isLoading: false }) })
            .catch((err) => console.log(err))
    }

    renderItem = ({ item: { content, title } }) => {
        const windowWidth = Dimensions.get('window').width;

        const renderersProps = {
            img: {
                enableExperimentalPercentWidth: true
            }
        };
        return <View style={{ borderColor: 'black', borderWidth: 2, margin: 10, borderRadius: 10, padding: 5, }}>
            <View style={{ backgroundColor: 'blue', width: "100%", borderRadius: 10, padding: -5, height: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" }}>{title}</Text>
            </View>
            <RenderHtml
                contentWidth={windowWidth}
                source={{ html: content }}
                renderersProps={renderersProps}
            />
        </View>
    }

    createItem = () => {
        return <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={this.getData}
                />
            }>
            <View>
                {this.state.content.length > 0 ? <FlatList
                    data={this.state.content}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    style={{ marginTop: 15 }}
                    scrollEnabled={true}
                /> : <View style={{
                    marginTop: "50%"
                }}><Text style={{ textAlign: "center", fontSize: 30 }}>New Data Will be added soon..</Text></View>}
            </View>
        </ScrollView >
    }
    render() {
        return (<SafeAreaView>
            {this.state.isLoading ? <View style={{
                backgroundColor: "#ff5458", height: "100%", paddingTop: "30%"
            }}>
                <Image
                    style={{ width: "100%", height: 400, marginBottom: 20, marginTop: 5 }}
                    source={{ uri: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKNiJE88OokqHdbCIZVmNbp2ctUqSmKKKz3pWeSqzGTI8vX8AxspHwKAuAX8QLXtvf4_NrYdoMZxFPOirkEJCiFWiKeLjdyzo0GIPcrz6OvVBgNV3VvBhXN_6vY3m95hNOOuyCS0y2hm0Jz2oDRzj_q5EiZhCIecfxB7pESsw7VW3shCmcJl9dVMljvg/s16000/loader22.gif" }} />
            </View>
                : this.createItem()}
        </SafeAreaView>
        )
    }
}

export default Content