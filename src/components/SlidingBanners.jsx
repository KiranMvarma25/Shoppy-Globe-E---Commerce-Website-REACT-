import { useState } from "react";

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

function SlidingBanners(){
    
    const items = [
        
        {
            id : 1,
            url : "https://img.freepik.com/free-vector/happy-diwali-biggest-sale-offer-banner-with-lantern_1017-40374.jpg",
        },
        {
            id : 2,
            url : "https://img.freepik.com/premium-psd/festival-lights-diwali-discount-banner_664482-1927.jpg",
            // url : "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9627ec4fbe448976.jpg?q=20",
        },
        {
            id : 3,
            url : "https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-diwali-festival-celebration_23-2150838251.jpg",
        },
        {
            id : 4,
            url : "https://cdn.vectorstock.com/i/preview-1x/57/15/indian-festival-happy-diwali-offer-banner-vector-44165715.jpg",
        },
        
    ];

    const [index, setIndex] = useState(0);

    function handleClickNext(){
        index == items.length-1 ? setIndex(0) : setIndex(index + 1);
    }

    function handleClickPrevious(){
        index == 0 ? setIndex(items.length-1) : setIndex(index-1);
    }

    const item = items[index];
    
    return (
        <>  
            <div className="slidingBanner">
            <button className="slidingBannerButton" onClick={handleClickPrevious} ><GrPrevious /></button>
                <img src={item.url} alt="Image of Diwali Festive Offers" width="90%" height="250px" />
                <button className="slidingBannerButton" onClick={handleClickNext} ><GrNext /></button>
            </div>
        </>
    )
}


export default SlidingBanners;