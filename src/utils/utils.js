import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const nameShortner = (name,length) => {
    return name?.length > length ? name.slice(0,length)+"..." : name
}

export const getOrigin = (weblink) =>{
    try {
      const url = new URL(weblink);
      return url.host
      
    } catch (error) {
      return ""
    }
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
  

  export const classMerge = (...inputs) =>{
    return twMerge(clsx(inputs));
  }