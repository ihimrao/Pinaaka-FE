const pickRandomFromObj =  (obj = {}) => obj[ Object.keys(obj)[ Math.floor(Math.random() * Object.keys(obj).length) ] ];

export default pickRandomFromObj;
