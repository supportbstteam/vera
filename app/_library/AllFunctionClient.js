
import dayjs from 'dayjs'

const AllFunctionClient = {   

  shortName : (text)=> {
    text = `${text}`
    let letter = ''
    const myArray = text.split(" ");
    myArray.forEach(function (item, index) {
      let firstLetter = item[0] ?? ''
      if(firstLetter){
        letter += firstLetter.toUpperCase()      
      }
      
    });
    return text;
  },
  limit : ()=> {    
    return 10;
  },
  generateRandomNumber : (length)=>{
    var randomValues = '';
    var stringValues = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';  
    var sizeOfCharacter = stringValues.length;  
    for (var i = 0; i < length; i++) {
      randomValues = randomValues+stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
    }
    return randomValues;
  }, 
  formatDate: (isoDateStr)=> {
    const date = new Date(isoDateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  objToQuerystring : (obj)=> {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      keyValuePairs.push(`${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(Object.values(obj)[i])}`);
    }
    return keyValuePairs.join('&');
  },  
  getHourMinute: (myDateTime)=> {    
    return dayjs(myDateTime).format('hh:mm');
  },
  getDate: (myDateTime)=> {    
    return dayjs(myDateTime).format('MMMM D, YYYY');
  },
  getDateTime: (myDateTime)=> {    
    return dayjs(myDateTime).format('MMMM D, YYYY h:mm A');
  },  
  currency: (amount)=>{
    return '€'+amount;
  },
  get_localTime : (obj)=> {
    let localTime = new Date(new Date().toLocaleString("en-US", {timeZone: "CAT"}));
    return localTime
  },
  checkAxiosError : (err)=> { 
    if(err && err.response.statusText==='Unauthorized'){
      localStorage.removeItem('authToken');	
      localStorage.removeItem('user_id');         
    }     
  },  
  range :(start, end)=>{
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
  }, 
  getTimeAgo:(date)=>{
      const pastdate = new Date(date);
      const now = new Date();
      const seconds = Math.floor((now - pastdate) / 1000);

      if(seconds < 60){
        return "just now";
      }

      const minutes = Math.floor(seconds / 60);
      if(minutes < 60){
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
      }

      const hours = Math.floor(minutes / 60);
      if(hours < 24){
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
      }

      const days = Math.floor(hours / 24);
      if(days < 2){ // Approximate for simplicity
        return `${days} day${days === 1 ? '' : 's'} ago`;
      }

      return dayjs(date).format('MMMM D, YYYY h:mm A');

      // const months = Math.floor(days / 30); // Approximate for simplicity
      // if(months < 12){
      //   return `${months} month${months === 1 ? '' : 's'} ago`;
      // }

      // const years = Math.floor(months / 12);
      // return `${years} year${years === 1 ? '' : 's'} ago`;
  }

}
export default AllFunctionClient;