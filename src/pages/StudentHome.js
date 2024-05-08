import { Component } from "react"
import WeeklySchedule from "../components/WeeklySchedule"


export default class StudentHome extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      user: props.user,
      error: null
    };
  }

  props = {
    user: null
  }

  state = {
    user: null,
    error: null
  }

  render() {
    return (
      <div className="App">
        <h1>Meu Cronograma Semanal</h1>
        <WeeklySchedule studentId={this.props.user.id}/>
      </div>
    )
  }
}