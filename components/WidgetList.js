import React from 'react';
import {ScrollView, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import WidgetTypePicker from '../elements/WidgetTypePicker';
import WidgetServiceClient from "../services/WidgetServiceClient";


export default class WidgetList
    extends React.Component {

    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);

        this.state = {
            courseId: 0,
            moduleId: 0,
            lessonId: 0,
            widgets: []
        };

        this.widgetServiceClient = WidgetServiceClient.instance();
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam('courseId', 0);
        const moduleId = this.props.navigation.getParam('moduleId', 0);
        const lessonId = this.props.navigation.getParam('lessonId', 0);

        this.setState({courseId: courseId});
        this.setState({moduleId: moduleId});
        this.setState({lessonId: lessonId});

        this.widgetServiceClient.findAllWidgetsForLesson(lessonId)
            .then((widgets) => {
                this.setState({widgets: widgets});
            });
    }

    render() {
        return (
            <ScrollView>
                {this.state.widgets.map((widget) => {
                    return (
                        <ListItem title={widget.title}
                                  key={widget.id}
                                  subtitle={widget.widgetType}
                                  onPress={() => {
                                      if (widget.widgetType === 'Exam') {
                                          this.props.navigation.navigate('ExamWidget', {
                                              courseId: this.state.courseId,
                                              moduleId: this.state.moduleId,
                                              lessonId: this.state.lessonId,
                                              examId: widget.id,
                                              title: widget.title,
                                              description: widget.description
                                          });
                                      }
                                      if (widget.widgetType === 'Assignment') {
                                          this.props.navigation.navigate('AssignmentWidget', {
                                              courseId: this.state.courseId,
                                              moduleId: this.state.moduleId,
                                              lessonId: this.state.lessonId,
                                              assignmentId: widget.id,
                                              title: widget.title,
                                              description: widget.description,
                                              points: widget.points
                                          });
                                      }
                                  }}/>

                    );
                })}
                <WidgetTypePicker navigation={this.props.navigation}/>
            </ScrollView>
        );
    }
}
