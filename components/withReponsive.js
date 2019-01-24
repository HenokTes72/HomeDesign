import React, { Component } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';

const withResponsive = (WrappedComponent) =>
    class MobileResponsive extends React.Component {
        static navigationOptions = {
            header: null,
        };

        constructor(props) {
            super(props);
            this.state = {
                width: this.getWidth(),
            }

            this.resize = this.resize.bind(this);
        }

        componentDidMount() {
            Dimensions.addEventListener("change", this.resize);
            this.resize();
        }

        componentWillUnmount() {
            Dimensions.removeEventListener("change", this.resize);
        }

        getWidth() {
            if(Platform.OS == 'ios') {
                return Dimensions.get('window').width * PixelRatio.get();
            }
            return Dimensions.get('window').width;
        }

        resize() {
            this.setState({
                width: this.getWidth()
            });
        }
        render() {
            const { width } = this.state;

            return <WrappedComponent width={width} />
        }
    }


export default withResponsive;