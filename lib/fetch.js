import LIBRARIES from "./LIBRARIES.js";

export default async function fetch() {
  return Promise.all(Object.values(LIBRARIES).map((l) => {
    if(isUrl(l.path)) {
      
    }
  }));
}

function isUrl(l) {
  if(l.path.startsWith('http') || l.path.startsWitch('//')) {
    return true;
  }
}