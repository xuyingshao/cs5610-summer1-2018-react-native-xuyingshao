import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {Button, Text} from 'react-native-elements';


export default class AssignmentWidget
    extends React.Component {

    static navigationOptions = {title: 'Assignment Editor'};

    constructor(props) {
        super(props);

        this.state = {
            assignmentId: 0,
            lessonId: 0,
            title: '',
            description: '',
            points: 0,
            widget: {},
            previewMode: false
        }
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam('lessonId', 0);
        const assignmentId = this.props.navigation.getParam('assignmentId', 0);
        const title = this.props.navigation.getParam('title', '');
        const description = this.props.navigation.getParam('description', '');
        const points = this.props.navigation.getParam('points', 0);

        this.setState({lessonId: lessonId});
        this.setState({title: title});
        this.setState({assignmentId: assignmentId});
        this.setState({description: description});
        this.setState({points: points});
    }

    render() {
        return (
            <ScrollView>
                {!this.state.previewMode &&
                <ScrollView>
                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={(text) => {
                        this.setState({title: text});
                    }}>{this.state.title}</FormInput>
                    <FormValidationMessage>
                        {this.state.title === '' && 'Title is required'}
                        {this.state.title !== '' && ''}
                    </FormValidationMessage>

                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={(text) => {
                        this.setState({description: text});
                    }}>{this.state.description}</FormInput>
                    <FormValidationMessage>
                        {this.state.description === '' && 'Description is required'}
                        {this.state.description !== '' && ''}
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={(text) => {
                        this.setState({points: text.valueOf()});
                    }}>{this.state.points}</FormInput>
                    <FormValidationMessage>
                        {this.state.points === 0 && 'Points is required'}
                        {this.state.points !== 0 && ''}
                    </FormValidationMessage>

                    <Button sytle={{padding: 10}}
                            backgroundColor='#4c73c4'
                            title='Save Assignment'
                            onPress={() => {
                                if (this.state.assignmentId === 0) {
                                    fetch(`http://localhost:8080/api/lesson/${this.state.lessonId}/assignment`,
                                        {
                                            method: 'post',
                                            body: JSON.stringify({
                                                'title': this.state.title,
                                                'description': this.state.description,
                                                'points': this.state.points,
                                                'widgetType': 'Assignment'
                                            }),
                                            headers: {
                                                'content-type': 'application/json'
                                            }
                                        })
                                        .then(this.props.navigation.navigate('LessonList'));
                                }
                                if (this.state.assignmentId !== 0) {
                                    fetch(`http://localhost:8080/api/assignment/${this.state.assignmentId}`, {
                                        method: 'put',
                                        body: JSON.stringify({
                                            'title': this.state.title,
                                            'description': this.state.description,
                                            'points': this.state.points,
                                            'widgetType': 'Assignment'
                                        }),
                                        headers: {
                                            'content-type': 'application/json'
                                        }
                                    })
                                        .then(this.props.navigation.navigate('LessonList'));
                                }
                            }}/>
                    <Button sytle={{padding: 10}}
                            backgroundColor='#4682B4'
                            color='white'
                            title='Cancel'
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}/>
                    <Button sytle={{padding: 10}}
                            backgroundColor='#FA8072'
                            title='Delete Assignment'
                            onPress={() => {
                                fetch(`http://localhost:8080/api/assignment/${this.state.assignmentId}`, {
                                    method: 'delete'
                                })
                                    .then(this.props.navigation.navigate('LessonList'));
                            }}/>
                </ScrollView>}

                <Button title="Preview"
                        onPress={() => {
                            this.setState({previewMode: !this.state.previewMode})
                        }}/>

                {this.state.previewMode &&
                <ScrollView style={styles.textAreaContainer}>
                    <Text h4>{this.state.description}</Text>
                    <Text h5>{this.state.points} pts</Text>
                </ScrollView>}

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
})