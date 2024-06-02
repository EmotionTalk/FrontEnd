import React, { useEffect, useState } from "react";
import * as S from "./styles"; // 스타일 파일 가져오기
import Menu from '../../components/Menu';
import User from '../../components/icons/User';
import pinImage from '../../assets/current.png';
import radioButtonImage from '../../assets/radio_button.svg'; // "radio_button.svg" 이미지 import
import SearchIcon from "../../components/Search";
import PoiImage from "../../assets/pin.png"
import PoiMenu from '../../components/PoiMenu';
import Logo from "../../components/icons/Logo";
const { kakao } = window;


const Main = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const [isPoiOpen, setIsPoiOpen] = useState(false);
    const [map, setMap] = useState(null); // map 변수 추가
    const [isCurrentLocationVisible, setCurrentLocationVisible] = useState(false); // 현재 위치 버튼 보이기 여부 상태 추가
    const [isactive, setIsactive] = useState(false);
    const [isHovered, setIsHovered]=useState(false);
    const ps=new kakao.maps.services.Places();
    var infowindow = new kakao.maps.InfoWindow();

    const toggleMenu = () => {
        if (isPoiOpen) { // POI 모달이 열려 있는지 확인
            setIsPoiOpen(false); // 열려 있으면 닫기
        }
        setIsOpen(!isOpen); // 기존 메뉴 상태 변경 로직은 유지
    };
    const togglePoiMenu = () =>{
        if(isOpen){setIsOpen(false)}
        setIsPoiOpen(!isPoiOpen)};

    const handleClick = () => {
        setIsactive(!isactive); // 클릭 시 isActive 상태를 토글
    };

    const handleCloseMenu = () => {
        setIsOpen(false); // 메뉴 닫기
    };

    const searchKeyword=()=>{
        // const keywords=['선비촌','시일 북스앤웍스','남산공원 강릉','런던베이글뮤지엄','멘야이로']
        const keywords=['서귀포올래시장']
        
        if(keywords.length===0){
            alert('적합한 장소가 없습니다.');
            return(false);
        }

        keywords.forEach(function(keyword){
            keyword=keyword.trim();
            if(keyword){
                ps.keywordSearch(keyword,placeSearchCB)
            }
        });
    }

    const placeSearchCB=(data,status)=>{
        console.log(data)
        if(status===kakao.maps.services.Status.OK){
            displayPlaces(data);
        }
        else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
        }
        else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
        }
    }

    // 마커 표출 함수
    const displayPlaces=(places)=>{
        const fragment = document.createDocumentFragment()
        const bounds = new kakao.maps.LatLngBounds()
        const listStr = ''

        for ( var i=0; i<places.length; i++ ) {
            // 첫 번째 검색 결과만 처리합니다.
            if (places.length > 0) {
                var firstPlace = places[0];
                var placePosition = new kakao.maps.LatLng(firstPlace.y, firstPlace.x),
                marker = addMarker(placePosition);

                // LatLngBounds 객체에 좌표를 추가
                bounds.extend(placePosition);

                // 마커 mouseover
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, firstPlace.place_name);
                });
                kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
                });
            }
        }
        // 지도 범위 재설정
        map.setBounds(bounds);

        //     // 마커를 생성하고 지도에 표시
        //     var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        //         marker = addMarker(placePosition, i);
    
        //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
        //     bounds.extend(placePosition);
    
        //     // 마커 mouseover
        //     (function(marker, title) {
        //         kakao.maps.event.addListener(marker, 'mouseover', function() {
        //             displayInfowindow(marker, title);
        //         });
    
        //         kakao.maps.event.addListener(marker, 'mouseout', function() {
        //             infowindow.close();
        //         });
        //     })(marker, places[i].place_name);
        // }
        // map.setBounds(bounds);
    }


    // 마커생성 및 지도에 마커 표시
    const addMarker=(position,idx,title)=>{
        const imageSrc=PoiImage;
        const imageSize=new kakao.maps.Size(36,38);
        const imgOptions={offset:new kakao.maps.Point(27,69)};

        const markerImage=new kakao.maps.MarkerImage(imageSrc,imageSize,imgOptions);

        const marker=new kakao.maps.Marker({
            position:position,
            image:markerImage
        });

        marker.setMap(map);
        // marker.push(marker);

        return marker;
    }

    // 인포윈도우에 장소명 표시
    const displayInfowindow=(marker,title)=>{
        const content='<div style="width:150px;text-align:center;padding:6px 0;font-weight:bold;">'+title+'</div>';

        infowindow.setContent(content);
        infowindow.open(map,marker)
    }

    // 지도 기능 추가 함수
    useEffect(() => {
        const geoLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    const container = document.getElementById('map');
                    const options = {
                        center: new kakao.maps.LatLng(lat, lng),
                        level: 3
                    };
                    const map = new kakao.maps.Map(container, options);
                    setMap(map); // map 변수 설정

                    // 원하는 이미지로 마커 추가
                    const markerPosition = new kakao.maps.LatLng(lat, lng);
                    const markerImage = new kakao.maps.MarkerImage(
                        pinImage,
                        new kakao.maps.Size(50, 50),
                        {
                            offset: new kakao.maps.Point(15, 15)
                        }
                    );
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        image: markerImage
                    });
                    marker.setMap(map);

                    // 지도타입 컨트롤을 생성
                    var mapTypeControl = new kakao.maps.MapTypeControl();

                    // 지도에 컨트롤을 추가
                    map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOM);

                    // 줌 컨트롤을 생성
                    var zoomControl = new kakao.maps.ZoomControl();
                    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

                    setCurrentLocationVisible(true); // 현재 위치 버튼 표시
                },(error) => {
                    console.error("failed : " + error.message);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };
        geoLocation();
    }, []);

    // 현재 위치로 이동하는 함수
    const moveToCurrentLocation = () => {
        if (navigator.geolocation && map) { // map이 정의되어 있을 때만 실행
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const currentPosition = new kakao.maps.LatLng(lat, lng);
                map.panTo(currentPosition); // 현재 위치로 지도 이동
            }, (error) => {
                console.error("failed : " + error.message);
            });
        } else {
            console.error("Geolocation is not supported by this browser or map is not initialized.");
        }
    };



    return (
        <S.MapContainer id="map">
            {isOpen && <S.ModalBackground onClick={toggleMenu} />}
            <SearchIcon />
            <Menu isOpen={isOpen} onClose={handleCloseMenu} />
            {isCurrentLocationVisible && map && (
                <S.CurrentLocationBtn onClick={moveToCurrentLocation}  className={`${isOpen ? "open": ""}` }>
                    <S.CurrentLocationImg src={radioButtonImage} alt="Current Location" />
                </S.CurrentLocationBtn>
            )}
            <S.TapContainer>
                <S.LogoContainer onClick={searchKeyword}>
                    <Logo  alt="logo" width="40px" height="40px" color1="var(--sub-color2)" color2="var(--sub-color1)"/>
                </S.LogoContainer>
                <S.PoiToggleBtnBox onClick={togglePoiMenu}>
                    <S.PoiToggleBtn>
                        <S.PoiImage src={PoiImage} alt="POI" />
                        <S.PoiText>POI 찾기</S.PoiText>
                    </S.PoiToggleBtn>
                </S.PoiToggleBtnBox>
                <S.CourseToggleBtnBox onClick={togglePoiMenu}>
                    <S.CourseToggleBtn>
                        <S.CourseImage src={PoiImage} alt="COURSE" />
                        <S.CourseText>코스 찾기</S.CourseText>
                    </S.CourseToggleBtn>
                </S.CourseToggleBtnBox>
                <S.MemberToggleBtnBox className={`${isOpen ? "open": ""}` }>
                    <S.MenuToggleBtn onClick={toggleMenu}
                        onMouseEnter={()=>setIsHovered(true)}
                        onMouseLeave={()=>setIsHovered(false)}
                    >
                        <User alt="user" width="40px" height="40px" color={isHovered ? "#6c757d" : "#adb5bd"}/>
                    </S.MenuToggleBtn>
                </S.MemberToggleBtnBox>
            </S.TapContainer>
            <PoiMenu isPoiOpen={isPoiOpen} onClose={() => setIsPoiOpen(false)} />
            {/* <PoiMenu isPoiOpen={isPoiOpen} onFilterApplied={searchPOIBtn} /> */}
        </S.MapContainer>
    )
}

export default Main;