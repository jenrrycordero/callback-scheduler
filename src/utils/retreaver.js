/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-multi-assign */
// Retreaver Code  !!!!! Do not touch this code !!!!!!!!
import axios from 'axios';

// Retreaver Code  !!!!! Do not touch this code !!!!!!!!
const retQ = window.retQ || {
  q: {},
  tags(args) {
    Object.keys(args).forEach(tag => {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      this.q[tag] = args[tag];
    });
  },
  empty() {
    return Object.keys(this.q).length === 0;
  },
  to_tags() {
    const ret = this.q;
    this.q = {};
    return ret;
  }
};

const getRetQValues = domain => axios.get(`https://www.debt.com/bib/${domain}/?format=json&asdasd=asdasd`);

const RetreaverCode = (pid, aid, phoneCampaignKey, urlPage) => {
  return new Promise(resolve => {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.src = `${document.location.protocol}//dist.routingapi.com/jsapi/v1/retreaver.min.js`;

    scriptElement.onload = scriptElement.onreadystatechange = () => {
      window.Retreaver.configure({
        host: 'api.routingapi.com',
        prefix: document.location.protocol === 'https:' ? 'https' : 'http'
      });

      // Your code goes here!
      const campaignKey = { campaign_key: phoneCampaignKey };
      const campaign = new window.Retreaver.Campaign(campaignKey);

      const tracker =
        window.ga && window.ga.getAll
          ? window.ga.getAll()[0]
          : {
              get(name) {
                if (name === 'trackingId') return 'UA-41089085-7';
                if (name === 'clientId') return '';
                return '';
              }
            };

      retQ.tags({
        ga_tracking_id: tracker.get('trackingId'),
        ga_client_id: tracker.get('clientId'),
        aid, // aid
        publisher_id: aid, // aid
        pid, // phone_pid
        sub_id: pid, // phone_pid
        source_url: urlPage, // getUrlParameter('pageUrl'),
        s2: urlPage // getUrlParameter('pageUrl')
      });

      campaign.request_number(retQ.to_tags(), number =>
        resolve({ rawNumber: number.get('number'), formattedNumber: number.get('formatted_number') })
      );
    };
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(scriptElement);
  });
};

export { RetreaverCode, getRetQValues };
