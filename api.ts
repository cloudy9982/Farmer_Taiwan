const sensorUrl = process.env.SENSOR_API;
const key = process.env.KEY;
const device_hash = process.env.DEVICE_HASH;
const fetch = require('node-fetch');

export async function fetchSensorData_1() {
  return fetch(`${sensorUrl}/FDxjm4ej/realtime?params=air_humidity,air_pressure,air_temperature,air_co,air_co2,air_nh3,bug_num,daily_bugs,dew_point,rain_rate,rainfalls,soil_ph,soil_temperature,soil_moisture,soil_conductivity,solar_lux,solar_par,solar_radiation,uvi,wind_direction,wind_speed`, {
    headers: {
      'Authorization': `Bearer ${key}`
    }
  })
    .then((x: any) => x.json())
    .catch(console.log);
}

export async function fetchSensorData_2() {
  return fetch(`${sensorUrl}/FD4p4x15/realtime?params=air_humidity,air_pressure,air_temperature,air_co,air_co2,air_nh3,bug_num,daily_bugs,dew_point,rain_rate,rainfalls,soil_ph,soil_temperature,soil_moisture,soil_conductivity,solar_lux,solar_par,solar_radiation,uvi,wind_direction,wind_speed`, {
    headers: {
      'Authorization': `Bearer ${key}`
    }
  })
    .then((x: any) => x.json())
    .catch(console.log);
}

export async function fetchSensorData_3() {
  return fetch(`${sensorUrl}/FDk57ovj/realtime?params=air_humidity,air_pressure,air_temperature,air_co,air_co2,air_nh3,bug_num,daily_bugs,dew_point,rain_rate,rainfalls,soil_ph,soil_temperature,soil_moisture,soil_conductivity,solar_lux,solar_par,solar_radiation,uvi,wind_direction,wind_speed`, {
    headers: {
      'Authorization': `Bearer ${key}`
    }
  })
    .then((x: any) => x.json())
    .catch(console.log);
}

export async function fetchSensorData_4() {
  return fetch(`${sensorUrl}/WE2m2w0m/realtime?params=air_humidity%2Cair_temperature%2Cdew_point%2Crain_rate%2Crainfalls%2Csolar_radiation%2Cuvi%2Cwind_direction%2Cwind_speed`, {
    headers: {
      'Authorization': `Bearer ${key}`
    }
  })
    .then((x: any) => x.json())
    .catch(console.log);
}

export async function fetchPhotoList() {
  return fetch(`https://data.agriweather.online/api/v1/timelapse/${device_hash}/photos`, {
    headers: {
      'Authorization': `Bearer ${key}`
    }
  })
    .then((x: any) => x.json())
    .catch(console.log);
}

export async function fetchPhotoId(photo_id:string) {
  return fetch(`https://data.agriweather.online/api/v1/timelapse/${device_hash}/photos/${photo_id}`, {
    headers: {
      'Authorization': `Bearer ${key}`
    }
  })
    .then((x: any) => {
      x.blob();
    })
    .catch(console.log);
}

//air_humidity%2Cair_pressure%2Cair_temperature%2Cair_co%2Cair_co2%2Cair_nh3%2Cbug_num%2Cdaily_bugs%2Cdew_point%2Crain_rate%2Crainfalls%2Csoil_conductivity%2Csoil_ph%2Csolar_lux%2Csolar_par%2Csolar_radiation%2Cuvi%2Cwind_direction%2Cwind_speed%2Csoil_temperature%2Csoil_moisture
//FDxjm4ej,FD4p4x15,FDk57ovjair(感測器偵測項目):air_humidity%2Cair_temperature%2Cdew_point%2Csoil_conductivity%2Csoil_ph%2Csolar_par%2Csolar_radiation%2Cwind_speed%2Csoil_temperature%2Csoil_moisture
//WE2m2w0m(感測器偵測項目)：air_humidity%2Cair_temperature%2Cdew_point%2Crain_rate%2Crainfalls%2Csolar_radiation%2Cuvi%2Cwind_direction%2Cwind_speed
//CBvg98jy(相機編號)

// fetch(`https://data.agriweather.online/api/v1/devices/FDy5evje/realtime?params=air_humidity,air_temperature,dew_point,soil_ph,soil_temperature,soil_moisture,soil_conductivity,solar_par,solar_radiation,wind_speed`, {
//   headers: {
//     'Authorization': `Bearer ${key}`
//   }
// })
//   .then((x) => x.json())
//   .then((y) => console.log(y))
//   .catch(console.log);
  
  
  //?params=air_humidity,air_pressure,air_temperature,air_co,air_co2,air_nh3,bug_num,daily_bugs,dew_point,rain_rate,rainfalls,soil_ph,soil_temperature,soil_moisture,soil_conductivity,solar_lux,solar_par,solar_radiation,uvi,wind_direction,wind_speed
