import React from 'react';
import {View, Picker} from 'react-native';
import {Button} from 'react-native-elements';


export default class WidgetTypePicker
    extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            widgetType: 'AS',
            lessonId: 1
        };
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam('lessonId', 0);

        this.setState({lessonId: lessonId});
    }

    render() {
        return (
            <View>
                <Picker
                    onValueChange={(itemValue) => this.setState({widgetType: itemValue})}
                    selectedValue={this.state.widgetType}>
                    <Picker.Item value='AS' label='Assignment'/>
                    <Picker.Item value='EX' label='Exam'/>
                    <Picker.Item value='HD' label='Heading'/>
                    <Picker.Item value='PA' label='Paragraph'/>
                    <Picker.Item value='LI' label='List'/>
                    <Picker.Item value='LK' label='Link'/>
                    <Picker.Item value='IM' label='Image'/>
                </Picker>
                <Button style={{padding: 10}}
                        backgroundColor='#4c73c4'
                        title='Add Widget'
                        onPress={() => {
                            if (this.state.widgetType === 'AS') {
                                this.props.navigation.navigate('AssignmentWidget', {lessonId: this.state.lessonId});
                            }
                            if (this.state.widgetType === 'EX') {
                                this.props.navigation.navigate('ExamCreator', {lessonId: this.state.lessonId});
                            }
                        }}/>
            </View>
        );
    }
}