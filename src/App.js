import React, { Component } from 'react';
import { useStates } from 'react-us-states';

import { IconContext } from 'react-icons';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import IdleTimer from 'react-idle-timer';

import styled from 'styled-components';
import { workingDaysOfWeek, formData } from './data/WidgetData';

import Helpers from './utils/helpers';
import Dropdown from './components/select';

const CallBackContainer = styled.div`
    .container {
        background: ${(props) => props.styles.formBackground};
        padding-top: 2.5rem;
        -webkit-box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
    }

    .col-md-5 {
        padding-right: 20px;
        padding-left: 40px;
    }
    .col-md-7 {
        padding-right: 40px;
        padding-left: 25px;
    }

    input.form-control {
        height: 50px;
        border: 1px solid ${(props) => props.styles.fieldsBorderColor};
        border-radius: ${(props) => (props.styles.bordered ? '.25rem' : '0')};
    }

    .dd-header {
        border-radius: ${(props) => (props.styles.bordered ? '.25rem' : '0')};
        border: 1px solid ${(props) => props.styles.fieldsBorderColor};
    }

    label {
        font-size: 21px;
        margin-bottom: 0;
        color: ${(props) => props.styles.fontColor};
    }

    button.btn {
        margin: 50px;

        color: ${(props) => props.styles.btnCTAFontColor};
        background-color: ${(props) => props.styles.btnCTANormalColor};
        border-color: ${(props) => props.styles.btnCTANormalColor};
        border-radius: ${(props) => (props.styles.bordered ? '.25rem' : '0')};
        padding: 15px 60px;
        font-size: 25px;
        font-weight: bold;
        -webkit-box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);

        &:hover {
            background-color: ${(props) => props.styles.btnCTAHoveredColor};
            border-color: ${(props) => props.styles.btnCTAHoveredColor};
        }

        @media all and (max-width: 768px) {
            margin: 25px;
            padding: 15px 45px;
        }
    }

    small.text-muted {
        color: #bd2130 !important;
        font-size: 90%;
    }
`;

const CallbackCalendarWrapper = styled.div`
    background: #ffffff;
    padding: 20px 25px;

    border-radius: ${(props) => (props.bordered ? '4px' : '0')};

    -webkit-box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);

    .arrow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
    .arrow span {
        opacity: 0;
        width: 20px;
        height: 20px;
        margin: -7px;
        display: block;
        transform: rotate(45deg);
        border-bottom: 5px solid ${(props) => props.arrowColor};
        border-right: 5px solid ${(props) => props.arrowColor};
        animation: animate 2s 4;
    }
    .arrow span:nth-child(2) {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s;
    }
    .arrow span:nth-child(3) {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s;
    }
    @-webkit-keyframes animate {
        0% {
            opacity: 0;
            transform: rotate(45deg) translate(-20px, -20px);
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: rotate(45deg) translate(20px, 20px);
        }
    }
    @keyframes animate {
        0% {
            opacity: 0;
            transform: rotate(45deg) translate(-20px, -20px);
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: rotate(45deg) translate(20px, 20px);
        }
    }
`;

const CallBackCalendar = styled.div`
    height: 470px;
    overflow: auto;

    h3 {
        margin: 10px 0;
        color: ${(props) => props.styles.fontColor}; /* #013c73 */
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
    }

    p {
        margin: 0;
        color: #666666;
        font-size: 17px;
        font-weight: 700;
        text-align: center;
    }

    ul {
        margin: 0;
        padding: 0;
        li {
            list-style: none;
        }
    }

    .btnDay {
        padding: 0;
        width: 120px;
        height: 50px;
        color: #ffffff;
        cursor: pointer;
        font-size: 20px;
        border-radius: 0;
        font-weight: bold;
        border: 1px solid ${(props) => props.styles.calendarColorLines};
        transition: all 0.3s ease-out 0s;

        &.btnOFF {
            background-color: ${(props) => props.styles.calendarColorOFF};
            cursor: unset;
        }
        &.btnON {
            background-color: ${(props) => props.styles.calendarColorON};
            &:hover {
                background-color: ${(props) => props.styles.calendarColorHOVER};
                transition: all 0.3s ease-out 0s;
            }
        }
        &.btnACTIVE {
            background-color: ${(props) => props.styles.calendarColorACTIVE};
        }
    }

    .BrainhubCarousel__customArrows {
        position: absolute;
        top: 58px;
        z-index: 9999;
        cursor: pointer;
        pointer-events: auto;

        .carouselIcons {
            width: 30px;
            height: 30px;
        }
        .carouselIcons {
            color: ${(props) => props.styles.calendarColorACTIVE};
        }

        &.BrainhubCarousel__arrow--disable {
            cursor: not-allowed;

            .carouselIcons {
                color: #939393;
            }
        }

        &.BrainhubCarousel__custom-arrowLeft {
            left: 25px;
        }

        &.BrainhubCarousel__custom-arrowRight {
            right: 40px;
        }
    }

    .form-error {
        color: red;
        font-size: 15px;
    }
`;

class App extends Component {
    constructor() {
        super();
        this.state = {
            lang: Helpers.getUrlParameter('language') || 'EN',
            /* onMobile: window.innerWidth <= 768,
            pageUrl: Helpers.getUrlParameter('pageUrl'),
            pageDomain: Helpers.getUrlParameter('pageDomain'),
            ip_address: Helpers.getUrlParameter('ip_address'),
            token: Helpers.getUrlParameter('token'),
            timeLaps: Helpers.getUrlParameter('timeLaps') ? Helpers.getUrlParameter('timeLaps') : 15,
            numberOfDays: Helpers.getUrlParameter('numberOfDays') ? Helpers.getUrlParameter('numberOfDays') : 20, */
            workHours: Helpers.getUrlParameter('timeLaps')
                ? Helpers.getWorkingHorus(Number(Helpers.getUrlParameter('timeLaps')), 8, 18, false)
                : Helpers.getWorkingHorus(15, 8, 18, false),
            workDays: Helpers.getUrlParameter('numberOfDays')
                ? Helpers.getWorkingDays(Helpers.getUrlParameter('numberOfDays'))
                : Helpers.getWorkingDays(20),
            daysOff: Helpers.getUrlParameter('daysOff')
                ? JSON.parse(Helpers.getUrlParameter('daysOff'))
                : ['09-24-2020', '10-19-2020', '10-23-2020', '10-30-2020'],
            timeOff: Helpers.decodeProvidedHours(
                {
                    sun: Helpers.getUrlParameter('sun') ? JSON.parse(Helpers.getUrlParameter('sun')) : null,
                    mon: Helpers.getUrlParameter('mon') ? JSON.parse(Helpers.getUrlParameter('mon')) : ['9:00-17:00'],
                    tue: Helpers.getUrlParameter('tue') ? JSON.parse(Helpers.getUrlParameter('tue')) : ['8:00-16:00'],
                    wed: Helpers.getUrlParameter('wed') ? JSON.parse(Helpers.getUrlParameter('wed')) : ['8:00-12:00', '13:00-16:00'],
                    thu: Helpers.getUrlParameter('thu') ? JSON.parse(Helpers.getUrlParameter('thu')) : ['9:00-17:00'],
                    fri: Helpers.getUrlParameter('fri') ? JSON.parse(Helpers.getUrlParameter('fri')) : ['8:00-11:30', '13:00-17:30'],
                    sat: Helpers.getUrlParameter('sat') ? JSON.parse(Helpers.getUrlParameter('sat')) : null,
                },
                Helpers.getUrlParameter('timeLaps') ? Number(Helpers.getUrlParameter('timeLaps')) : 15
            ),
            calendarAvailability: [],
            selectedDate: null,
            usaStates: [
                {
                    id: 'none',
                    title:
                        Helpers.getUrlParameter('language') && Helpers.getUrlParameter('language') === 'ES'
                            ? 'Seleccione su Estado'
                            : 'Select your state',
                    selected: true,
                },
            ],
            selectedState: null,
            name: Helpers.getUrlParameter('name') || '',
            lastname: Helpers.getUrlParameter('lastname') || '',
            phone: Helpers.getUrlParameter('phone') || '',
            email: Helpers.getUrlParameter('email') || '',
            nameError: false,
            lastnameError: false,
            phoneError: false,
            emailError: false,
            timeout: 600000, // Defining default idle time to refresh the calendar component (10 minutes)
            isTimedOut: false,
            twoColumn: Helpers.getUrlParameter('twoColumn') === 'true' || false,
            styles: {
                bordered: Helpers.getUrlParameter('bordered') === 'true' || false,
                formBackground: Helpers.getUrlParameter('formBackground') ? Helpers.getUrlParameter('formBackground') : '#f6f6f6', // '#cfeffa'
                fontColor: Helpers.getUrlParameter('fontColor') ? Helpers.getUrlParameter('fontColor') : '#555555', // '#013C73',
                calendarColorHOVER: Helpers.getUrlParameter('calendarColorHOVER') ? Helpers.getUrlParameter('calendarColorHOVER') : '#246f87', // '#4cc6f4',
                calendarColorON: Helpers.getUrlParameter('calendarColorON') ? Helpers.getUrlParameter('calendarColorON') : '#2F90AF', // '#287DAD',
                calendarColorOFF: Helpers.getUrlParameter('calendarColorOFF') ? Helpers.getUrlParameter('calendarColorOFF') : '#E8E8E8', // '#939393',
                calendarColorACTIVE: Helpers.getUrlParameter('calendarColorACTIVE') ? Helpers.getUrlParameter('calendarColorACTIVE') : '#e61b17', // '#E8730F',
                calendarColorLines: Helpers.getUrlParameter('calendarColorLines') ? Helpers.getUrlParameter('calendarColorLines') : '#ffffff',
                btnCTANormalColor: Helpers.getUrlParameter('btnCTANormalColor') ? Helpers.getUrlParameter('btnCTANormalColor') : '#527E3E', // '#E8730F',
                btnCTAHoveredColor: Helpers.getUrlParameter('btnCTAHoveredColor') ? Helpers.getUrlParameter('btnCTAHoveredColor') : '#6c9b57', // '#287DAD',
                btnCTAFontColor: Helpers.getUrlParameter('btnCTAFontColor') ? Helpers.getUrlParameter('btnCTAFontColor') : '#ffffff',
                fieldsBorderColor: Helpers.getUrlParameter('fieldsBorderColor') ? Helpers.getUrlParameter('fieldsBorderColor') : '#26748b', // '#CED6DD',
            },
        };

        this.idleTimer = null;
        this.onAction = this.onAction.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onIdle = this.onIdle.bind(this);
    }

    componentDidMount() {
        this.fillingOutStateAvailability();
    }

    onAction() {
        // user did something
        this.setState({ isTimedOut: false });
    }

    onActive() {
        // user is active
        this.setState({ isTimedOut: false });
    }

    onIdle() {
        // user is idle
        const { isTimedOut } = this.state;
        if (isTimedOut) {
            // do something
        } else {
            // implementing the reload
            this.fillingOutStateAvailability();

            this.idleTimer.reset();
            this.setState({ isTimedOut: true });
        }
    }

    handleCalendarClick = (day, time) => {
        const { calendarAvailability } = this.state;
        const auxAvailability = [...calendarAvailability];
        let flag = 0;

        for (let i = 0; i < auxAvailability.length; i += 1) {
            if (auxAvailability[i].ID === day) {
                for (let j = 0; j < auxAvailability[i].hours.length; j += 1) {
                    if (auxAvailability[i].hours[j].title === time) {
                        auxAvailability[i].hours[j].status = auxAvailability[i].hours[j].status === 'ACTIVE' ? 'ON' : 'ACTIVE';

                        if (auxAvailability[i].hours[j].status === 'ACTIVE') {
                            flag = 1;
                        }
                    } else {
                        auxAvailability[i].hours[j].status = auxAvailability[i].hours[j].status === 'OFF' ? 'OFF' : 'ON';
                    }
                }
            } else {
                for (let j = 0; j < auxAvailability[i].hours.length; j += 1) {
                    auxAvailability[i].hours[j].status = auxAvailability[i].hours[j].status === 'OFF' ? 'OFF' : 'ON';
                }
            }
        }

        let selected = '';
        if (flag === 1) {
            selected = `${day} ${time}`;
        }
        this.setState({ selectedDate: selected, calendarAvailability: auxAvailability });
    };

    handleSelect = (value, name) => {
        // Updating List of States
        // let auxStates = [...this.state.usaStates];

        this.setState((previousState) => ({
            // now we'll use cached value
            usaStates: previousState.usaStates.map((item) =>
                item.id === value ? Object.assign(item, { selected: true }) : Object.assign(item, { selected: false }))
        }));

        this.setState({ [name]: value });
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                if (/[a-zA-Z]+/g.test(value) || value === '') {
                    if (/\d/g.test(value) === false) {
                        this.setState({ [name]: value, [`${name}Error`]: false });
                    } else {
                        this.setState({ [`${name}Error`]: true });
                    }
                } else {
                    this.setState({ [`${name}Error`]: true });
                }
                break;
            case 'phone':
                if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
                    this.setState({ [name]: value, [`${name}Error`]: false });
                } else {
                    this.setState({ [`${name}Error`]: true });
                }
                break;
            case 'email':
                // eslint-disable-next-line no-case-declarations
                const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (mailFormat.test(value.toLowerCase())) {
                    this.setState({ [name]: value, [`${name}Error`]: false });
                } else {
                    this.setState({ [`${name}Error`]: true });
                }
                break;
            default:
                if (/[a-zA-Z]+/g.test(value) || value === '') {
                    if (/\d/g.test(value) === false) {
                        this.setState({ [name]: value, [`${name}Error`]: false });
                    } else {
                        this.setState({ [`${name}Error`]: true });
                    }
                } else {
                    this.setState({ [`${name}Error`]: true });
                }
                break;
        }

        this.setState({ [name]: value });
    };

    handleFormSubmit = () => {
        // this.setState( {formTriguer: 1} );
    };

    fillingOutStateAvailability() {
        const { workDays, workHours, daysOff, timeOff } = this.state;

        // Filling the array of availability (calendarAvailability)
        const auxAvailabilityArray = [];

        let isOff = false;
        for (let i = 0; i < workDays.length; i += 1) {
            const day = {
                ID: workDays[i],
                hours: [],
            };
            // 1- Set days as Off from the given array (daysOff)
            isOff = daysOff.includes(workDays[i]);

            for (let j = 0; j < workHours.length; j += 1) {
                const hourData = {
                    ID: `${workDays[i]} ${workHours[j]}`, // Ex.: '09-24-2020 9:00AM'
                    title: workHours[j], // Ex.: '9:00AM'
                    status: 'ON', // Possible values: ['ON', 'OFF', 'ACTIVE']
                };

                // 2- Set hours Off depending on the given arrays
                if (isOff) {
                    hourData.status = 'OFF';
                } else {
                    // Getting short version of day title (SUN, MON,...,SAT)

                    const workDayDate = Helpers.changeDateFormat(workDays[i]);
                    const dayTitle = workingDaysOfWeek.EN[Number(workDayDate.getDay())];

                    // Getting the given hours available for i day
                    const dayHours = timeOff[dayTitle];

                    // This will returns true if the array of hours provided contains the current j hour, and false if not.
                    if (dayHours == null || !dayHours.includes(workHours[j])) {
                        hourData.status = 'OFF';
                    }

                    // Filter by today day and current hour running (All hours before current must be OFF)
                    const currentDate = Helpers.getCurrentDate();
                    const currentTime = Helpers.getCurrentHour();

                    // Set status OFF: IF workDays[i] === today and the current time is < workHours[j]
                    if (currentDate === workDays[i]) {
                        const jhour = Helpers.convertHourTo24Format(workHours[j]);
                        const chour = Helpers.convertHourTo24Format(currentTime);

                        if (chour + 1 >= jhour) {
                            hourData.status = 'OFF';
                        }
                    }
                }

                // Adding each hour info to the day
                day.hours[j] = hourData;
            }

            // Adding each day to the availability array
            auxAvailabilityArray[i] = day;
        }

        // Initializing the states list
        const states = useStates();
        const { usaStates } = this.state;
        const list = [...usaStates];

        /* for (const [index, value] of states.entries()) {
            list.push({
                id: value.abbreviation,
                title: `${value.abbreviation} | ${value.name}`,
                selected: false
            });
        } */
        states.map((item) =>
            list.push({
                id: item.abbreviation,
                title: `${item.abbreviation} | ${item.name}`,
                selected: false,
            })
        );

        this.setState({ calendarAvailability: auxAvailabilityArray, usaStates: list, selectedDate: null });
    }

    render() {
        const {
            lang,
            name,
            nameError,
            lastname,
            lastnameError,
            phone,
            phoneError,
            email,
            emailError,
            usaStates,
            selectedDate,
            selectedState,
            twoColumn,
            styles,
        } = this.state;

        return (
            <CallBackContainer styles={styles}>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={twoColumn ? 5 : 12}>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>{formData.label[lang].name}:</Form.Label>
                                    <Form.Control
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Text className="text-muted">
                                        {nameError && formData.inputsError[lang].name}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formLastName">
                                    <Form.Label>{formData.label[lang].lastname}:</Form.Label>
                                    <Form.Control
                                        name="lastname"
                                        type="text"
                                        value={lastname}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Text className="text-muted">
                                        { lastnameError && formData.inputsError[lang].lastname}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>{formData.label[lang].phone}:</Form.Label>
                                    <Form.Control name="phone" type="text" value={phone} onChange={this.handleChange}/>
                                    <Form.Text className="text-muted">
                                        { phoneError && formData.inputsError[lang].phone}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>{formData.label[lang].email}:</Form.Label>
                                    <Form.Control name="email" type="email" value={email} onChange={this.handleChange}/>
                                    <Form.Text className="text-muted">
                                        { emailError && formData.inputsError[lang].email}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formState">
                                    <Form.Label>{formData.label[lang].state}:</Form.Label>

                                    <Dropdown id="formState" name="selectedState" list={usaStates} onSelect={this.handleSelect}/>

                                    <Form.Text className="text-muted">
                                        {selectedState === 'none' && formData.inputsError[lang].state}
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={12} sm={12} md={twoColumn ? 7 : 12}>
                            <IdleTimer
                                ref={(ref) => this.idleTimer = ref }
                                element={document}
                                onActive={this.onActive}
                                onIdle={this.onIdle}
                                onAction={this.onAction}
                                debounce={250}
                                timeout={this.state.timeout}
                            />
                            <Form.Label>{formData.label[lang].calendar}:</Form.Label>
                            <CallbackCalendarWrapper bordered={styles.bordered} arrowColor={styles.calendarColorACTIVE}>
                                <div className="arrow">
                                    <span/>
                                    <span/>
                                    <span/>
                                </div>

                                <CallBackCalendar styles={styles}>
                                    <Carousel
                                        itemWidth={120}
                                        slidesPerPage={4}
                                        addArrowClickHandler
                                        arrowLeft={<IconContext.Provider value={{ className: "carouselIcons" }}><FaCaretLeft /></IconContext.Provider>}
                                        arrowRight={<IconContext.Provider value={{ className: "carouselIcons" }}><FaCaretRight /></IconContext.Provider>}
                                    >
                                    {
                                        this.state.calendarAvailability.map(day => {
                                            var hTitle = Helpers.changeDateFormat( day.ID );
                                            return (
                                                <div key={day.ID} className="dayContainer" >
                                                    <h3>{ workingDaysOfWeek[lang][hTitle.getDay()] }</h3>
                                                    <p>{ day.ID }</p>
                                                    <ul>
                                                        {day.hours.map(hour =>
                                                            <li key={hour.ID}>
                                                                <button
                                                                    className={`btnDay ${hour.status === 'OFF' ? 'btnOFF' : hour.status === 'ACTIVE' ? 'btnACTIVE' : 'btnON'}`}
                                                                    onClick={() => this.handleCalendarClick( day.ID, hour.title )}
                                                                    disabled={hour.status === 'OFF'}
                                                                >
                                                                    {hour.status !== 'OFF' ? hour.title : <span>&nbsp;</span>}
                                                                </button>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        })
                                    }
                                    </Carousel>
                                </CallBackCalendar>
                            </CallbackCalendarWrapper>
                            <Form.Text className="text-muted">
                                {selectedDate === '' && formData.inputsError[lang].calendar}
                            </Form.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={ nameError || lastnameError || phoneError || emailError || selectedDate === "" || selectedState === null || selectedState === 'none'}
                                onClick={this.handleFormSubmit}
                            >
                                {formData.cta[lang].btnTitle}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </CallBackContainer>
        );
    }
}

export default App;
