import React, {useState} from 'react';
import axios from 'axios';
import {ADMIN_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import './admin.css'


function AdminPage(props) {

    const [event , setEvents] = useState({
        Name : "",
        Date : new Date(),
        Venue: "",
        Detail: "",
        Stars: "",
        Code: "",
        StartTime: '',
        EndTime: ''
    })

    const [photo, setPhoto] = useState('')


    const handleFileSelect = (e) => {
        setPhoto(e.target.files[0])
    }
    
    const handleChangeStartTime = (starttime) => {
        setEvents(prevState => ({
            ...prevState,
            StartTime: starttime
        }))
    }

    const handleChangeEndTime = (time) => {
        setEvents(prevState => ({
            ...prevState,
            EndTime: time
        }))
    }

    const handleChangeDate = (date) => {
        setEvents(prevState => ({
            ...prevState,
            Date : date
        }))
    }

    const handleChange = e => {
        const {id , value} = e.target   
        setEvents(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = e => {
        e.preventDefault();
        var datestr = (new Date(event.Date)).toISOString();
        var formData = new FormData();
            formData.append('eventName', event.Name);
            formData.append('eventDate', datestr);
            formData.append('eventVenue', event.Venue);
            formData.append('eventDetail', event.Detail);
            formData.append('eventStars', event.Stars);
            formData.append('eventPhoto', photo);
            formData.append('eventCode', event.Code);
            formData.append('eventStart', event.StartTime);
            formData.append('eventEnd', event.EndTime);
        // console.log(fd)
        // const payload={
        //     "eventName" : event.Name,
        //     "eventDate" : event.Date,
        //     "eventVenue" : event.Venue,
        //     "eventDetail" : event.Detail,
        //     "eventStars" : event.Stars,
        //     "eventPhoto" : fd,
        //     "eventStart" : event.StartTime,
        //     "eventEnd" : event.EndTime
        // }
        // fd.append('files', payload)
        if(formData){
        axios.post(ADMIN_BASE_URL+'adminpost', formData)
            .then(function (response) {
                if(response.data.code === 200){
                    setEvents(prevState => ({
                        ...prevState
                    }))
                }
            })
            .catch(function (error) {
                console.log("Error" + error);
            });
            alert("Event posted!")
        }
        else{
            e.preventDefault();
        }
    }

    return(
        <div className="col-xs-6 col-sm-8 col-lg-6 hv-center mt-2 admin">
            <form>
                <div className="form-group text-left admin-content">
                <label>Event Name</label>
                <input type="text" 
                       className="form-control" 
                       id="Name" 
                       placeholder="Enter event name" 
                       value={event.Name}
                       onChange={handleChange}
                       required
                />

                </div>
                <div className="form-group text-left">
                <label>Event Date</label>
                <br />
                <DatePicker
                    onChange={handleChangeDate}
                    value={event.Date}
                    minDate={new Date()}
                    required
                    dateFormat="yyyy/MM/dd"
                    />
                </div>
                
                <div className="form-group text-left">
                <label>Event Venue</label>
                <input type="text" 
                       className="form-control" 
                       id="Venue" 
                       placeholder="Enter event venue" 
                       value={event.Venue}
                       onChange={handleChange}
                       required
                />

                </div>

                <div className="form-group text-left">
                <label>Event Details</label>
                <input type="text" 
                       className="form-control" 
                       id="Detail" 
                       placeholder="Enter event details" 
                       value={event.Detail}
                       onChange={handleChange}
                       required
                />

                </div>

                <div className="form-group text-left">
                <label>Event Photo</label>
                <input type="file" 
                       className="form-control" 
                       id="Photo"
                       onChange={handleFileSelect}
                />
                </div>

                <div className="form-group text-left">
                <label>Event Stars</label>
                <input type="text" 
                       className="form-control" 
                       id="Stars" 
                       placeholder="How many stars is this event worth?" 
                       value={event.Stars}
                       onChange={handleChange}
                       required
                />

                </div>

                <div className="form-group text-left">
                <label>Event Code</label>
                <input type="text" 
                       className="form-control" 
                       id="Code" 
                       placeholder="Enter event code" 
                       value={event.Code}
                       onChange={handleChange}
                       required
                />

                </div>

                 <div className="form-group text-left">
                <label>From</label>
                <br />
                <TimePicker
                    onChange={handleChangeStartTime}
                    value={event.StartTime}
                    required
                    disableClock={true}
                />

                </div>

                <div className="form-group text-left">
                <label>To</label>
                <br />
                <TimePicker
                    onChange={handleChangeEndTime}
                    value={event.EndTime}
                    required
                    disableClock={true}
                    />

                </div> 

                <div className="form-check">
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

export default withRouter(AdminPage);