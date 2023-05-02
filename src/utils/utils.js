export const nameShortner = (name,length) => {
    return name.length > length ? name.slice(0,length)+"..." : name
}

export const getOrigin = (weblink) =>{
    try {
      const url = new URL(weblink);
      return url.host
      
    } catch (error) {
      return ""
    }
}

export const getAddedTime = (time)=>{

}

export const dataSortByType = (data,sortingType)=>{
    
    switch(sortingType){
        case "MOST_BOOKMARKED":
            const sorteDataByNumberOfBookmarks = data.sort((data1,data2)=>data2.timelines.length-data1.timelines.length);
            return sorteDataByNumberOfBookmarks;
        default:
            const sorteDataByUpdated = data.sort((data1,data2)=>new Date(data2.updatedAt)-new Date(data1.updatedAt));
            return sorteDataByUpdated;
    }

}


const DURATION_IN_SECONDS = {
    epochs: ['year', 'month', 'day', 'hour', 'minute'],
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
const getDuration = (seconds) => {
    var epoch, interval;
  
    for (var i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
      epoch = DURATION_IN_SECONDS.epochs[i];
      interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
      if (interval >= 1) {
        return {
          interval: interval,
          epoch: epoch
        };
      }
    }
  
  };
  
export const fromNow = (date)=>{
   let seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  let unit = "sec";
  let direction = "ago";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "from now";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "min";
  }
  if (value != 1)
    unit = unit + "s";
  return value + " " + unit + " " + direction;
  };
  