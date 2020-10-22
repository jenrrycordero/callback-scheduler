export default class Helpers {
    // Parsing URL params
    static getUrlParameter(name) {
        const newName = String(name).replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp(`[\\?&]${newName}=([^&#]*)`);
        const results = regex.exec(window.location.search);

        return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Generates array of times (as strings) for every X minutes
    static getWorkingHorus(lap, start, end, lastM = false) {
        const x = lap; // minutes interval
        const times = []; // time array

        let tt = start * 60; // start time
        const ap = [' AM', ' PM']; // AM-PM

        if (lastM) {
            end = (end * 60) + (lap * 2);
        } else {
            end = (end * 60) + lap;
        }

        // loop to increment the time and push results in array
        for (let i = 0; tt < end; i += 1) {
            const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            const mm = tt % 60; // getting minutes of the hour in 0-55 format

            const seconds = `0${mm}`.slice(-2);
            times[i] = ("" + ((hh===12)?12:hh%12)).slice(-2) + ':' + seconds + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]

            tt += x;
        }

        return times;
    }

    // Returns an array with working days from today date up to lastD day
    static getWorkingDays(lastD = 15) {
        const currDate = new Date();
        const workingDays = [];

        for (let i = 0; i < lastD; i += 1) {
            let dd = currDate.getDate();
            let mm = currDate.getMonth() + 1;
            const yyyy = currDate.getFullYear();

            if (dd < 10) {
                dd = '0'+dd;
            }
            if (mm < 10) {
                mm = '0'+mm;
            }

            const vDate = mm+'-'+dd+'-'+yyyy;
            // let nextDay = new Date(vDate);
            // if( nextDay.getDay() !== 0 && nextDay.getDay() !== 6 ){
            workingDays[i] = vDate;
            // }

            currDate.setDate(currDate.getDate() + 1);
        }

        return workingDays;
    }

    static getCurrentDate() {
        const currDate = new Date();
        let dd = currDate.getDate();
        let mm = currDate.getMonth() + 1;
        const yyyy = currDate.getFullYear();

        if (dd < 10) {
            dd = '0'+dd;
        }

        if (mm < 10) {
            mm = '0'+mm;
        }

        return mm+'-'+dd+'-'+yyyy;
    }

    static decodeProvidedHours(weekHours, step = 30) {
        const result = { sun: null, mon: [], tue: [], wed: [], thu: [], fri: [], sat: null };
        for (const [key, value] of Object.entries(weekHours)) {
            if (value !== null) {
                result[key] = value.map(item => {
                    let auxTimes = item.split('-');
                    let startAux = auxTimes[0].split(':');
                    let start = Number(startAux[0]);
                    let endAux = auxTimes[1].split(':');
                    let end = Number(endAux[0]);

                    return this.getWorkingHorus(step, start, end, false);
                });
                result[key] = [].concat.apply([], result[key]);
            }
        }

        return result;
    }

    static getCurrentHour() {
        const time = new Date();
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    static convertHourTo24Format(timeStr) {
        const sectionArr = timeStr.split(' ');
        const section = sectionArr[1];
        const hourArr = timeStr.split(':');
        const hour = parseInt(hourArr[0], 10);

        return section === 'AM' || hour === 12 ? hour : hour + 12;
    }

    static changeDateFormat(dateStr) {
        return new Date(dateStr.replace(/-/g, '/'));
    }
}
