import React, { Component } from 'react'
import { View, FlatList, Dimensions, Text, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
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
        return <View style={{ borderColor: 'black', borderWidth: 2, padding: 15, margin: 10, borderRadius: 10, shadowColor: "black", shadowRadius: 5 }}>
            <RenderHtml
                contentWidth={windowWidth}
                source={{ html: content }}
                renderersProps={renderersProps}
            />
            <View style={{ backgroundColor: 'blue', borderRadius: 5, padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center" }}>{title}</Text>
            </View>
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
                <FlatList
                    data={this.state.content}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    style={{ marginTop: 15 }}
                    scrollEnabled={true}
                />
            </View>
        </ScrollView >
    }
    render() {
        return (<SafeAreaView>
            {this.createItem()}
        </SafeAreaView>
        )
    }
}

export default Content