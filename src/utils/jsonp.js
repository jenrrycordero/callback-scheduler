// Snippet from https://stackoverflow.com/questions/48102543/reactjs-which-component-lifecycle-method-should-be-used-to-create-table-and-po/48102650
const Jsonp = (url, callback) => {
  const callbackName = `jsonpCallback_${Math.round(100000 * Math.random())}`;
  const scriptJsonp = document.createElement('script');
  window[callbackName] = data => {
    delete window[callbackName];
    document.body.removeChild(scriptJsonp);
    callback(data);
  };
  scriptJsonp.src = `${url}${url.indexOf('?') >= 0 ? '&' : '?'}callback=${callbackName}`;
  document.body.appendChild(scriptJsonp);
};

export default Jsonp;
