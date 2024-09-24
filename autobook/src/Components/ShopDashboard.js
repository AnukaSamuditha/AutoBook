import React,{useState,useEffect} from 'react';
import '../Styles/ShopDashboard.css'


export default function ShopDashboard(props){

    const[shopId,setShopID]=useState("");


    useEffect(()=>{
        setShopID(props.activeShop)
    },[props.activeShop])

    
    console.log("Clicked shop",shopId)

    return (
        <div className='shop--dashboard--holder'>
            <div className='section--1'>
                <img src={require('../Images/arrow-left-white.svg').default} alt='back--button' className='back--button' onClick={props.toggleClickedShop}/>
                <div className='shop--info--container'>
                    <h3 className='shop--name--'>{shopId}</h3>
                    <h4 className='title--text'>Fulfill new orders & track analytics.</h4>
                </div>
                <div className='settings--container'>
                    <img src={require('../Images/settingIcon2.svg').default} className='setting--icon' alt='setting--icon'/>
                    <img src={require('../Images/bellWhite.svg').default} className='setting--icon' alt='setting--icon'/>
                    <img src={require('../Images/mailWhite.svg').default} className='setting--icon' alt='setting--icon'/>
                </div>
            </div>

            <div className='section--2'>
                <div className='products--holder'>
                    <div className='products'>

                    </div>
                    <div className='manage--product--info'>
                        <small className='manage--products--title'>Manage products</small>
                        <img src={require('../Images/plus-circle.svg').default} className='setting--icon' alt='plus--icon'/>
                    </div>
                </div>
                <div className='analytics--section'>
                    <div className='sales--container'>
                        <div className='info--sales-shop'>
                            <small className='info--title'>Total Sales</small>
                            <small className='sales--month'>September</small>
                        </div>
                        <h5 className='sales--amount'>Rs.231 500.00</h5>
                        <small className='account--number--'>Saving A/C 1234xxxxxx</small>
                    </div>
                    <div className='visitors--container'>
                        <div className='analytic--titles'>
                         <small className='analytic--heading'>View analytics</small>
                         <img src={require('../Images/open-in-window.svg').default} alt='setting--icon' className='window--icon'/>
                        </div>
                        <h5 className='visitor--count'>10K+ Visitors</h5>
                     </div>

                </div>
                <div className='feature--section'>
                    <div className='report-section'>
                        <img src={require('../Images/report--icon.png')} className='report--icon' alt='report--icon'/>
                        <small className='sales--reports--title'>Sales reports</small>
                    </div>
                    <div className='rating--section'>
                        <img src={require('../Images/THREE-STARS_BLACK.svg').default} alt='rating--icon' className='rating--icon'/>
                        <small className='sales--reports--title'>Sales reports</small>
                    </div>
                </div>
            </div>

            <div className='section--3'>
                
            </div>

        </div>
    )
}