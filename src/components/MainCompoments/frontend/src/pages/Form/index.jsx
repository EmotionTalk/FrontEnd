import React from "react";
import "./style.css";
import menuImage from '../../assets/hamburger-icon.svg';
import Menu from '../../components/Menu';
import {useEffect, useState } from "react";
import SearchPlaceModal from "../../components/SearchPlaceModal";
import Logo from "../../components/icons/Logo";
import { toast } from 'react-toastify';
import Trash from "../../components/icons/Trash";
import pinImage from '../../assets/current.png';
import { useCookieManager } from '../../storage/cookieManager'; 
import { useNavigate } from "react-router-dom";

const { kakao } = window;

function Form(){
    const [isOpen, setIsOpen] = useState(false);
    const [showSearchModal,setShowSearchModal]=useState(false);
    const [placeResultArr,setPlaceResultArr]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);
    const navigate = useNavigate();

    const itemsPerPage=7;
    const pages=Math.ceil(placeResultArr.length/itemsPerPage);
    const startIndex=(currentPage-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage;
    const currentItems=placeResultArr.slice(startIndex,endIndex);
    const { getCookies } = useCookieManager();


    useEffect(() => {
        if (selectedPlaceIndex === null) return;

        const selectedPlace=placeResultArr[selectedPlaceIndex];
        const lat = parseFloat(selectedPlace.latitude);
        const lng = parseFloat(selectedPlace.longitude);
        const containerId='map-${selectedPlaceIndex}';
        let container=document.getElementById(containerId);

        if (!container){
            container = document.createElement('div');
            container.id = containerId;
            container.style.width = '100%';
            container.style.height = '350px';
            container.style.marginTop='16px'
            document.getElementById(`listItem-${selectedPlaceIndex}`).appendChild(container);
        }
    
        const options = {
          center: new kakao.maps.LatLng(lat,lng),
          level: 3,
        };
    
        const map = new kakao.maps.Map(container, options);
        new kakao.maps.Marker({
          map: map,
          position: options.center,
          image: new kakao.maps.MarkerImage(pinImage, new kakao.maps.Size(50, 50)),
        });
    
        return () => {
          container.remove();
        };
    }, [selectedPlaceIndex,currentPage,placeResultArr]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const localAccessToken = getCookies().accessToken;
                if(!localAccessToken){
                    toast.error('액세스 토큰이 없습니다. 다시 로그인해주세요.', {
                        autoClose: 1500,
                    });
                    navigate('/login'); // 로그인 페이지로 이동
                    return;
                }

                const response = await fetch('http://localhost:8080/place/getAll',{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localAccessToken}`
                    }
                });

                if (!response.ok) {
                    const errorData=await response.json();
                    throw new Error(`[${response.status}] ${errorData.message}`);
                }
                const data = await response.json();
                setPlaceResultArr(data.resultData);
            }
            catch (error) {
                console.error("Error fetching places: ", error);
                toast.error('방문기록을 가져오는 중 오류가 발생했습니다.', {
                    autoClose: 1500,
                });
            }
        };
        fetchPlaces();
    }, []);


    const handlePlaceClick = (index) => {
        if (selectedPlaceIndex === index) {
            setSelectedPlaceIndex(null);
        }
        else {
            setSelectedPlaceIndex(index);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const handleDeletePlace=(index)=>{
        const isConfirmed=window.confirm("이 장소를 삭제하시겠습니까?")
        if(isConfirmed){
            const updatedPlaceResultArr=placeResultArr.filter((_,i)=>i !== index);
            setPlaceResultArr(updatedPlaceResultArr);

            toast.success('장소가 삭제되었습니다.', {
                autoClose:1500
            })
        }
    }

    const handlePageChange=(pageNumber)=>{
        setCurrentPage(pageNumber)
        setSelectedPlaceIndex(null);
    }
    
    const showSearchModalClick=(childEvent)=>{
        setShowSearchModal(true);
        setShowSearchModal(childEvent);
    }


    const handleSearchPlaceResult=async(childResult)=>{
        const isExist=placeResultArr.some((place)=>
            place.name===childResult.name && place.address===childResult.address);
        
        if(isExist){
            toast.error('이미 등록된 장소입니다.',{
                autoClose:1500
            });
        }
        else{
            console.log(childResult);
            try{
                const localAccessToken = getCookies().accessToken;
                const response = await fetch('http://localhost:8080/place/save',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${localAccessToken}` // jwtToken은 JWT 토큰 값
                    },
                    body:JSON.stringify({
                        name:childResult.name,
                        latitude:childResult.latitude,
                        longitude:childResult.longitude,
                        roadAddress:childResult.roadAddress,
                        address:childResult.address
                    })
                });
                if(response.ok){
                    const result=await response.json();
                    console.log(result);
                    setPlaceResultArr([...placeResultArr,childResult]);
                    toast.success('새로운 장소가 등록되었습니다.',{
                        autoClose:1500
                    });
                }
                else{
                    throw new Error('데이터 전송에 실패했습니다.');
                }
            }
            catch(error){
                console.error('데이터 전송 중 오류 발생:',error);
                toast.error('데이터 전송 중 오류가 발생했습니다.',{
                    autoClose:1500
                });
            }
        }
    };

    return(
        <div className="FormWrapper">
            {isOpen && <div className="ModalBackground" onClick={toggleMenu}></div>}
            <div className={`MenuToggleBtnBox ${isOpen ? "open": ""}` }>
                <div className="MenuToggleBtn" onClick={toggleMenu}>
                    <img src={menuImage} alt="Menu" className="MenuImage" />
                </div>
            </div>
            <Menu isOpen={isOpen} onClose={handleCloseMenu} />
            <a  href='/'><Logo  alt="logo" width="140px" height="140px" color1="var(--sub-color2)" color2="var(--sub-color1)"/></a>
            <div className="FormBox">
                <div className="FormField">
                    <input
                    onClick={showSearchModalClick}
                    className="InputField"
                    name="pastVisit" type="text"
                    placeholder="최근 방문지를 입력하세요."/>
                    <button className="SearchBtn" onClick={showSearchModalClick}>검색</button>
                </div>
                    <div className="ResultContainer">
                        {currentItems.map((value,index)=>(
                            <div id={`listItem-${index + (currentPage - 1) * itemsPerPage}`}
                                className="ListBox"
                                key={index}
                                onClick={()=>handlePlaceClick(index+(currentPage-1)*itemsPerPage)}>
                                <span className="PlaceName">{value.name} </span>
                                <span>| {value.address}</span>
                                <button className="DeleteBtn" onClick={()=>handleDeletePlace(index+startIndex)}>
                                    <Trash width="24px" height="24px" color="var(--primary-color)"/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="Pagination">
                        {Array.from({length:pages},(_,i)=>i+1).map(number=>(
                            <button key={number} onClick={()=>handlePageChange(number)}
                                className={`PageButton ${currentPage===number ? "active":""}`}>
                                {number}
                            </button>
                        ))}
                    </div>
            </div>
            {
                 showSearchModal && <SearchPlaceModal showSearchModalClick={showSearchModalClick} searchPlaceResult={handleSearchPlaceResult}/>
            }
        </div>
    )
}
export default Form