import React, {useState} from 'react';
import axios from 'axios';
import {TASK_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import DatePicker from 'react-date-picker';
import './tasks.css'

function UploadTask(props) {

    const [task , setTasks] = useState({
        Name: "",
        DateDue : new Date(),
        userID: "",
    })

    const handleChangeDate = (date) => {
        setTasks(prevState => ({
            ...prevState,
            DateDue: date
        }))
    }
    const handleChange = e => {
        const {id , value} = e.target   
        setTasks(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = e => {
        // e.preventDefault();
        const payload = {
            "taskName" : task.Name,
            "dateDue" : task.DateDue,
            "userID" : task.userID
        }
        if(payload){
        axios.post(TASK_BASE_URL+'post', payload)
            .then(function (response) {
                if(response.data.code === 200){
                    console.log(task)
                    setTasks(prevState => ({
                        ...prevState
                    }))
                }
            })
            .catch(function (error) {
                console.log("Error" + error);
            });
            alert("Task posted!")
        }
        else{
            e.preventDefault();
        }
    }

    return(
        <div className="col-xs-6 col-sm-8 col-lg-6 hv-center mt-2 task">
            <form>
                <div className="form-group text-left admin-content">
                <label>Task Name</label>
                <input type="text" 
                       className="form-control" 
                       id="Name" 
                       placeholder="Enter task name" 
                       value={task.Name}
                       onChange={handleChange}
                       required
                />

                </div>
                <div className="form-group text-left">
                <label>Task Due</label>
                <br />
                <DatePicker
                    onChange={handleChangeDate}
                    value={task.DateDue}
                    minDate={new Date()}
                    required
                    dateFormat="dd/MM/yyyy"
                    />
                </div>

                <div className="form-group text-left admin-content">
                <label>For?</label>
                <input type="text" 
                       className="form-control" 
                       id="userID" 
                       placeholder="Enter email" 
                       value={task.userID}
                       onChange={handleChange}
                       required
                />

                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary btn-clock"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="push"></div>
        </div>
    )
}

export default withRouter(UploadTask);