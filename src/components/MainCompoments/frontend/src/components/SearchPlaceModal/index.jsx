import closeIcon from "../../assets/close-icon.svg";
import { useState } from "react";
import "./style.css";
const {kakao}=window;

function SearchPlaceModal({showSearchModalClick,searchPlaceResult}){
    const [searchQ, setSearchQ]=useState("");
    const [isSearch, setIsSearch]=useState(false);
    const [searchResult, setSearchResult]=useState([]);

    const ps= new kakao.maps.services.Places();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          searchBtnClick();
          event.preventDefault();
        }
    };

    const closeModal=()=>{
        showSearchModalClick(false);
    }

    const placeSelect=(event)=>{
        const address=event.currentTarget.className.split(" ")
        const deleteClassName=address.slice(1);
        const result=deleteClassName.join(" ")

        const placeData=result.split("_")
        const placeAddress=placeData[0]
        const latitude=placeData[1]
        const longitude=placeData[2]
        const placeName=placeData[3]
        const placeRoadAddress=placeData[4]
        

        // 백엔드 전송 데이터
        const sendVisitedData={
            address:placeAddress,
            latitude:latitude,
            longitude:longitude,
            name:placeName,
            roadAddress:placeRoadAddress,
            
        };
        console.log(placeData)
        console.log(sendVisitedData)

        // 상위컴포넌트로 데이터 전달
        searchPlaceResult(sendVisitedData);
    }
    const onSearchQInput=(event)=>{
        setSearchQ(event.target.value);
    }
    const searchBtnClick=()=>{
        if(searchQ===""){
            alert("검색할 상호명을 입력해주세요.");
            return;
        }
        setIsSearch(true);
        ps.keywordSearch(searchQ,callbackFn)
    }
    const callbackFn=(data,status,pafination)=>{
        if(status===kakao.maps.services.Status.OK){
            // const result=data.slice(0,8);
            const result=data
            setSearchResult(result);
            searchResult.map((value,index)=>{
                // console.log(value.place_url)
            })
        }
        if(status===kakao.maps.services.Status.ZERO_RESULT){
            alert("검색 결과가 없습니다.")
        }
    }
    return(
        
        <div className="SearchPlaceModalForm">
            <div className="SearchPlaceWrapper">
                <div className="SearchPlaceBox">
                    <div className="CloseModalButton"><img src={closeIcon} onClick={closeModal}/></div>
                    <input onKeyDown={handleKeyPress} onChange={onSearchQInput} className="searchQ" name="searchQ" type="text" placeholder="상호명을 입력해주세요."/>
                    <button className="SearchPlaceBtn" onClick={searchBtnClick} type="button">검색</button>
                    <div className="Line"></div>
                    {
                        isSearch && searchResult.map((value,index)=>
                        (
                            <div key={index} onClick={placeSelect} className={`SearchPlaceResult ${value.address_name}_${value.y}_${value.x}_${value.place_name}_${value.road_address_name}`}>
                                <p className="PlaceName">{value.place_name}</p>
                                <p>지번주소 : {value.address_name}</p>
                                <p>도로명 주소 : {value.road_address_name}</p>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default SearchPlaceModal;