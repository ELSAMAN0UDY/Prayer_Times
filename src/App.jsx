import { useEffect, useState } from "react";
import Paynner from "./components/Paynner.jsx"
import "./index.css"

function App() {
  const [city, setCity] = useState("Cairo");

  const [namePayner, setNamePayner] = useState({});

  const [timerData, setTimerData] = useState("");

  const cities = [
  { id: 1, name: "القاهرة", nameEn: "Cairo" },
  { id: 2, name: "الجيزة", nameEn: "Giza" },
  { id: 3, name: "الإسكندرية", nameEn: "Alexandria" },
  { id: 4, name: "الدقهلية", nameEn: "Dakahlia" },
  { id: 5, name: "البحر الأحمر", nameEn: "Red Sea" },
  { id: 6, name: "البحيرة", nameEn: "Beheira" },
  { id: 7, name: "الفيوم", nameEn: "Faiyum" },
  { id: 8, name: "الغربية", nameEn: "Gharbia" },
  { id: 9, name: "الإسماعيلية", nameEn: "Ismailia" },
  { id: 10, name: "المنوفية", nameEn: "Monufia" },
  { id: 11, name: "المنيا", nameEn: "Minya" },
  { id: 12, name: "القليوبية", nameEn: "Qalyubia" },
  { id: 13, name: "الوادي الجديد", nameEn: "New Valley" },
  { id: 14, name: "السويس", nameEn: "Suez" },
  { id: 15, name: "أسوان", nameEn: "Aswan" },
  { id: 16, name: "أسيوط", nameEn: "Assiut" },
  { id: 17, name: "بني سويف", nameEn: "Beni Suef" },
  { id: 18, name: "بورسعيد", nameEn: "Port Said" },
  { id: 19, name: "دمياط", nameEn: "Damietta" },
  { id: 20, name: "الشرقية", nameEn: "Sharqia" },
  { id: 21, name: "جنوب سيناء", nameEn: "South Sinai" },
  { id: 22, name: "كفر الشيخ", nameEn: "Kafr El Sheikh" },
  { id: 23, name: "مطروح", nameEn: "Matrouh" },
  { id: 24, name: "الأقصر", nameEn: "Luxor" },
  { id: 25, name: "قنا", nameEn: "Qena" },
  { id: 26, name: "شمال سيناء", nameEn: "North Sinai" },
  { id: 27, name: "سوهاج", nameEn: "Sohag" },
];
useEffect(()=>{
  const getTimer = async () => {
    try{

      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=${city}`);
      const data = await res.json();
      setNamePayner(data.data.timings);
      setTimerData(data.data.date.gregorian.date);

    }catch(err){
      console.log(err);
      
    }
  }
  getTimer()
},[city])

const formatTime = (time) => {

  if(!time){
    return "00:00";
  }

  let [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;

}
  return (
    <>
      <section>
        <div className="container">
        <div className="top_section">
            <div className="city">
            <h3>المدينة</h3>
              <select name="" id="" onChange={(e) => setCity(e.target.value)}>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

              <div className="data">
                <h3>التاريخ</h3>
                <h4>{timerData}</h4>
              </div>
        </div>

        <Paynner title="الفجر" time={formatTime(namePayner.Fajr)} />
        <Paynner title="الظهر" time={formatTime(namePayner.Dhuhr)} />
        <Paynner title="العصر" time={formatTime(namePayner.Asr)} />
        <Paynner title="المغرب" time={formatTime(namePayner.Maghrib)} />
        <Paynner title="العشاء" time={formatTime(namePayner.Isha)} />
        </div>
      </section>
    </>
  )
}

export default App
