import React from 'react';
import ModuleServiceClient from "../services/ModuleServiceClient";
import {ScrollView} from "react-native";
import {ListItem} from "react-native-elements";


export default class ModuleList
    extends React.Component {

    static navigationOptions = {title: 'Modules'};

    constructor(props) {
        super(props);

        this.state = {
            courseId: 1,
            modules: []
        };

        this.moduleServiceClient = ModuleServiceClient.instance();
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam('courseId', 1);

        this.setState({courseId: courseId});

        this.moduleServiceClient.findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setState({
                    modules: modules
                });
            });
    }

    render() {
        return (
            <ScrollView>
                {this.state.modules.map((module) =>
                    <ListItem
                        onPress={() => this.props.navigation.navigate("LessonList", {
                            courseId: this.state.courseId,
                            lessonId: module.id
                        })}
                        title={module.title}
                        key={module.id}/>)}
            </ScrollView>
        );
    }
}