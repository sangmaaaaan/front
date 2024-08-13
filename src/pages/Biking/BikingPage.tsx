import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import { coordProps, spotProps } from '../../types/bikingTypes';
import Direction from '../../components/Biking/Direction';
import NaverMap from '../../components/Biking/NaverMap';

const BikingPage = () => {
    // const missionCoords: coordProps[] = [];
    
    // const [distance, setDistance] = useState<number>(0);
    // const [historyCoords, setHistoryCoords] = useState<spotProps[]>([]);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const coords: spotProps[] = [
        { y: 37.2820329, x: 127.2412078 },
        { y: 37.2828274, x: 127.2409512 },
        { y: 37.2828108, x: 127.2409721 },
        { y: 37.2827259, x: 127.2410808 },
        { y: 37.2800636, x: 127.2365217 },
        { y: 37.2820329, x: 127.2412078 },
        { y: 37.2800676, x: 127.2365219 },
    ]

    // 내 위치
    useEffect(() => {
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lng: longitude });
                        console.log('위치:', latitude, longitude);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        setLocation({ lat: 37.36681775, lng: 127.10809985 });
                    },
                    {
                        enableHighAccuracy: true, // 높은 정확도 사용
                        // timeout: 10000, // 최대 10초 대기
                        maximumAge: 0, // 항상 최신 위치 요청
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                setLocation({ lat: 37.36681775, lng: 127.10809985 });
            }
        };

        // 최초 위치 업데이트
        updateLocation();

        // 2초마다 위치 업데이트
        const intervalId = setInterval(updateLocation, 2000);

        // 컴포넌트가 언마운트될 때 interval을 정리
        return () => clearInterval(intervalId);
    }, []);

  return (
    <div>
        <Header />
        {/* <Direction setDistance={setDistance} missionCoords={missionCoords} coords={coords} /> */}

        <NaverMap location={location} coords={coords} />
        <div>{location?.lat}</div>

    </div>
  )
}

export default BikingPage;