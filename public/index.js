/* eslint-disable prefer-destructuring */
(function () {
    function onMessage(event) {
        // eslint-disable-next-line prefer-destructuring
        const data = event.data;

        if (typeof window[data.func] === 'function') {
            window[data.func].call(null, data.message);
        }
    }

    if (window.addEventListener) {
        window.addEventListener('message', onMessage, false);
    } else if (window.attachEvent) {
        window.attachEvent('onmessage', onMessage, false);
    }

    // Validate ip_address
    // function isip_addressValid(ip_address) {
    //   return true;
    // }
    // Validate id name
    function isCssIdValid(id) {
        // eslint-disable-next-line no-useless-escape
        const reId = /^[A-Za-z]+[\w\-\:\.]*$/;
        return reId.test(id) && id.length < 20;
    }

    // Check if Error object is empty
    function isEmpty(obj) {
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    // This function create a div to show an error when client parameters are wrong
    function createErrorMessage(parentDiv, errors) {
        const errorMessage = document.createElement('h4');
        errorMessage.id = 'errorMessage';
        errorMessage.style.fontSize = '30px';
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.fontFamily = 'Arial';
        errorMessage.appendChild(document.createTextNode('Please check the form parameters'));
        document.getElementById(parentDiv).appendChild(errorMessage);
        console.log('errors:', errors);
    }

    // Create Loading
    function loading() {
        // loading parent div
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'dcomLoadingDivForm';
        // spinner img
        const spinner = new Image(50, 50);
        spinner.src = 'https://www.debt.com/wp-content/themes/Dcom/images/loading.gif';
        spinner.id = 'dcomLoadingSpinner';
        spinner.alt = 'loading';
        // loading text
        const loadingText = document.createElement('h4');
        loadingText.id = 'dcomLoadingText';
        loadingText.appendChild(document.createTextNode('Please wait'));
        loadingDiv.appendChild(spinner);
        loadingDiv.appendChild(loadingText);
        loadingText.style.fontSize = '20px';
        loadingText.style.fontFamily = 'Open Sans, sans-serif';
        loadingText.style.marginTop = '5px';

        // inserting loading div inside form-div
        const parent = document.getElementById(window.callbackScheduler.info[0].parent_id);
        parent.style.position = 'relative';
        loadingDiv.style.position = 'absolute';
        loadingDiv.style.height = '100px';
        loadingDiv.style.top = '50%';
        loadingDiv.style.left = '50%';
        loadingDiv.style.transform = 'translate(-50%,-50%)';
        loadingDiv.style.textAlign = 'center';
        parent.appendChild(loadingDiv);
    }

    // Remove loading
    function removeLoading() {
        document.getElementById('dcomLoadingDivForm').style.display = 'none';
    }

    // Get Auth Token
    function getAuthToken(url, data, success) {
        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                success(response);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(data));
        return xhr;
    }

    // This function get all the config-params entered by the client
    // eslint-disable-next-line camelcase
    function readIframeAttributes(ip_address) {
        let parentId = {};
        const clientUrl = window.location.href;
        const clientDomain = window.location.hostname;

        let twoColumn = true;
        let language = 'EN';

        // Style variables
        let bordered = true;
        let formBackground = '#f6f6f6';
        let fontColor = '#013c73';
        let calendarColorON = '#287dad';
        let calendarColorOFF = '#939393';
        let calendarColorHOVER = '#246f87';
        let calendarColorACTIVE = '#E8730F';
        let calendarColorLines = '#ffffff';
        let btnCTANormalColor = '#ffffff';
        let btnCTAHoveredColor = '#ffffff';
        let btnCTAFontColor = '#ffffff';
        let fieldsBorderColor = '#ced6dd';

        // Date & time variables
        let timeLaps = 15; // Laps of time between each hour in a working day. This is comming from the backend
        let numberOfDays = 20; // Total number of working days from today's date. This will come from the backend API

        // Holidays and non-working days
        let daysOff = [
            '01-01-2020',
            '02-17-2020',
            '05-25-2020',
            '06-03-2020',
            '06-03-2020',
            '09-07-2020',
            '10-12-2020',
            '11-26-2020',
            '12-25-2020',
        ];

        // This is the availability definition for each time in the week labor days.

        let sun = null;
        let mon = ['9:00-17:00'];
        let tue = ['8:00-16:00'];
        let wed = ['8:00-12:00', '13:00-16:00'];
        let thu = ['9:00-17:00'];
        let fri = ['8:00-11:30', '13:00-17:30'];
        let sat = null;

        // Personal data coming from the URL
        let source = '';
        let name = '';
        let lastname = '';
        let phone = '';
        let email = '';

        const errors = {
            parent_id_not_found: true,
        };
        window.callbackScheduler.info.map((elem) => {
            // check if user entered a parent_id value
            if (Object.prototype.hasOwnProperty.call(elem, 'parent_id')) {
                // check if the parent_id value is a valid CSS name
                const check_id_name = isCssIdValid(elem.parent_id);
                // check if user assigned this id to a div in the document
                const div_with_id_assigned = document.getElementById(elem.parent_id);
                // valid id and div found with id assigned correctly
                if (check_id_name && div_with_id_assigned) {
                    parentId = elem.parent_id;
                    delete errors.parent_id_not_found;
                }
                // invalid CSS id and div found with incorrect id assigned correctly
                if (!check_id_name && div_with_id_assigned) {
                    errors.parent_id = true;
                    delete errors.parent_id_not_found;
                }
            }

            // language
            if (Object.prototype.hasOwnProperty.call(elem, 'language')) {
                if (elem.language === 'EN' || elem.language === 'ES') {
                    language = elem.language;
                } else {
                    errors.language = true;
                }
            }

            // Styling the widget -------------------------------------------------
            // Two Column Option
            if (Object.prototype.hasOwnProperty.call(elem, 'twoColumn')) {
                twoColumn = elem.twoColumn;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'bordered')) {
                bordered = elem.bordered;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'formBackground')) {
                formBackground = elem.formBackground;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'fontColor')) {
                fontColor = elem.fontColor;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'calendarColorON')) {
                calendarColorON = elem.calendarColorON;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'calendarColorOFF')) {
                calendarColorOFF = elem.calendarColorOFF;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'calendarColorHOVER')) {
                calendarColorHOVER = elem.calendarColorHOVER;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'calendarColorACTIVE')) {
                calendarColorACTIVE = elem.calendarColorACTIVE;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'calendarColorLines')) {
                calendarColorLines = elem.calendarColorLines;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'btnCTANormalColor')) {
                btnCTANormalColor = elem.btnCTANormalColor;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'btnCTAHoveredColor')) {
                btnCTAHoveredColor = elem.btnCTAHoveredColor;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'btnCTAFontColor')) {
                btnCTAFontColor = elem.btnCTAFontColor;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'fieldsBorderColor')) {
                fieldsBorderColor = elem.fieldsBorderColor;
            }
            // End of widget style -----------------------------------------------

            // Laps of time between each hour in a working day
            if (Object.prototype.hasOwnProperty.call(elem, 'timeLaps')) {
                timeLaps = elem.timeLaps;
            }

            // Total number of days to move forward from today's date
            if (Object.prototype.hasOwnProperty.call(elem, 'numberOfDays')) {
                numberOfDays = elem.numberOfDays;
            }

            // Holidays and non-working days
            if (Object.prototype.hasOwnProperty.call(elem, 'daysOff')) {
                daysOff = elem.daysOff;
            }

            // Available time per days of the week -------------------------------
            if (Object.prototype.hasOwnProperty.call(elem, 'sun')) {
                sun = elem.sun;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'mon')) {
                mon = elem.mon;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'tue')) {
                tue = elem.tue;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'wed')) {
                wed = elem.wed;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'thu')) {
                thu = elem.thu;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'fri')) {
                fri = elem.fri;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'sat')) {
                sat = elem.sat;
            }
            // End of day's hour availability ------------------------------------

            // User Information coming from the URL ------------------------------
            if (Object.prototype.hasOwnProperty.call(elem, 'source')) {
                source = elem.source;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'name')) {
                name = elem.name;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'lastname')) {
                lastname = elem.lastname;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'phone')) {
                phone = elem.phone;
            }
            if (Object.prototype.hasOwnProperty.call(elem, 'email')) {
                email = elem.email;
            }
            // End of Information coming from the querystring ---------------------

            return false;
        });
        console.log(errors);
        // ========== Closure Here ==========
        // This function creates the Iframe, It is a closure to have access to all the values from the client
        function createIframe(authToken) {
            // //////////////////// IFRAME CREATION ////////////////////////////////////
            const formIframe = document.createElement('iframe');
            // append to body
            const parent = document.getElementById(parentId);
            parent.appendChild(formIframe);

            // add attr to the iframe
            // formIframe.frameBorder = '0'; this is obsolet
            // formIframe.scrolling = 'no'; this has been deprecated
            // formIframe.style = 'border:0; overflow:hidden;';
            formIframe.frameBorder = '0';
            formIframe.scrolling = 'no';
            formIframe.title = 'Consolidated Credit Callback Scheduler';
            formIframe.id = 'callbackScheduler';
            formIframe.sandbox = 'allow-forms allow-scripts allow-same-origin allow-popups';

            // Dcom URL: https://ewc.debt.com/fef/
            // eslint-disable-next-line prettier/prettier
            formIframe.src = `https://resources.venturetechsolutions.com/iframes/callback-scheduler?pageUrl=${clientUrl}&pageDomain=${clientDomain}&ip_address=${ip_address}&twoColumn=${twoColumn}&language=${language}&token=${authToken.token}&bordered=${bordered}&formBackground=${formBackground}&fontColor=${fontColor}&calendarColorON=${calendarColorON}&calendarColorOFF=${calendarColorOFF}&calendarColorHOVER=${calendarColorHOVER}&calendarColorACTIVE=${calendarColorACTIVE}&calendarColorLines=${calendarColorLines}&btnCTANormalColor=${btnCTANormalColor}&btnCTAHoveredColor=${btnCTAHoveredColor}&btnCTAFontColor=${btnCTAFontColor}&fieldsBorderColor=${fieldsBorderColor}&timeLaps=${timeLaps}&numberOfDays=${numberOfDays}&daysOff=${JSON.stringify(daysOff)}&sun=${JSON.stringify(sun)}&mon=${JSON.stringify(mon)}&tue=${JSON.stringify(tue)}&wed=${JSON.stringify(wed)}&thu=${JSON.stringify(thu)}&fri=${JSON.stringify(fri)}&sat=${JSON.stringify(sat)}&source=${source}&name=${name}&lastname=${lastname}&phone=${phone}&email=${email}`;

            // Remove Loading
            removeLoading();
        }

        // if no errors
        if (isEmpty(errors)) {
            // this function request the auth token before create the iframe
            getAuthToken('https://fam.debt.com/signin', { url: clientDomain, pid: '4654656' }, createIframe);
        }

        if (errors.parent_id_not_found) {
            console.warn(
                "We couldn't find a div with the same ID you provided at the form widget config block parameter parent_id, please make sure that both IDs are exactly the same."
            );
        }
        if (!isEmpty(errors) && !errors.parent_id_not_found) {
            // this function create a error message inside the parent div
            createErrorMessage(parentId, errors);
        }
    }

    // Add iframeResizer.min.js
    function addIframeResizer() {
        const resizerScript = document.createElement('script');
        resizerScript.src = 'https://ewc.debt.com/cdn/iframe/iframeResizer.min.js';
        resizerScript.id = 'resizerScript';
        resizerScript.type = 'text/javascript';
        document.body.appendChild(resizerScript);
    }

    // Add style tag
    function addIframeStytles() {
        let css = '#callbackScheduler{ width: 100%; min-width: 100%;}';
        let location = document.getElementById(callbackScheduler.info[0].parent_id);
        let style = document.createElement('style');
        style.id = 'dcomStyles';
        location.parentNode.insertBefore(style, location);
        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    // detect if iframeResizer have been loaded
    function detectIframeResizer(ip) {
        const timeout = 10; // 10 seconds timeout
        const poll = function () {
            setTimeout(function () {
                if (typeof window.iFrameResize !== 'undefined') {
                    readIframeAttributes(ip);
                } else {
                    poll();
                }
            }, timeout);
        };
        poll();
    }

    // GET USER IP
    function getIpAddress() {
        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status === 200) {
                const resp = JSON.parse(xhr.responseText);
                // readIframeAttributes(window.callbackScheduler, resp.ip);
                addIframeResizer();
                addIframeStytles();
                detectIframeResizer(resp.ip);
            }
            if (xhr.readyState > 3 && xhr.status !== 200) {
                // readIframeAttributes(window.callbackScheduler, 'FAILED TO DETECT IP');
                addIframeResizer();
                addIframeStytles();
                detectIframeResizer('FAILED TO DETECT IP');
            }
        };
        xhr.open('GET', 'https://api.ipify.org?format=json', true);
        xhr.send(null);
    }

    // Init here
    // check for parent div
    if (window.callbackScheduler.info[0]) {
        if (document.getElementById(window.callbackScheduler.info[0].parent_id)) {
            loading();
            getIpAddress();
        } else {
            console.warn(
                "We couldn't find a div with the same ID you provided at the form widget config block parameter parent_id, please make sure that both IDs are exactly the same."
            );
        }
    } else {
        console.warn(
            "We couldn't find a div with the same ID you provided at the form widget config block parameter parent_id, please make sure that both IDs are exactly the same."
        );
    }
})();

// eslint-disable-next-line no-unused-vars
/* function parentFuncName() {
    window.iFrameResize(
        {
            checkOrigin: false,
            heightCalculationMethod: 'lowestElement',
            onInit(iframe) {
                // eslint-disable-next-line func-names
                setTimeout(function () {
                    if (iframe.clientHeight < 500) {
                        // reload the iframe
                        window.iFrameResize(
                            {
                                checkOrigin: false,
                                heightCalculationMethod: 'lowestElement',
                            },
                            'iframe'
                        );
                    }
                }, 200);
            },
        },
        'iframe'
    );
} */

function parentFuncName() {
  window.iFrameResize(
    {
      checkOrigin: false,
      heightCalculationMethod: 'lowestElement',
      onInit: function(iframe) {
        setTimeout(function() {
          if (iframe.clientHeight < 500) {
            // reload the iframe
            window.iFrameResize(
              {
                checkOrigin: false,
                heightCalculationMethod: 'lowestElement'
              },
              'iframe'
            );
          }
        }, 200);
      }
    },
    'iframe'
  );
}
