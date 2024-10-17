import React,{useState,useEffect} from 'react';
import '../Styles/ShopDashboard.css';
import Axios from 'axios';
import ProductDashboard from './ProductDashboard';
import AddProductForm from './AddProductForm';
import UpdateShop from './UpdateShop';
import html2pdf from 'html2pdf.js';
import DeletePopup from './DeletePopup';
import CollaborationForm from './CollaborationForm';

export default function ShopDashboard(props){

    const[shopId,setShopID]=useState("");
    const [shop,setShop]=useState({})
    const[productToggle,setProductToggle]=useState(false);
    const [productFormToggle,setProductFormToggle]=useState(false);
    const [orders,setOrders]=useState([]);
    const [ordersData,setOrdersData] =useState([])
    const[updateShopToggle,setUpdateShopToggle]=useState(false)
    const[deletePopupToggle,setDeletePopupToggle]=useState(false)
    const[toggleCollabForm,setToggleCollabForm]=useState(false);

    useEffect(()=>{
        setShopID(props.activeShop)
    },[props.activeShop])

    
    useEffect(()=>{
        if(shopId){
            Axios.get(`http://localhost:3001/get-shop/${shopId}`)
         .then((res)=>{
            console.log("Data Fetched",res.data.data.shop)
            setShop(res.data.data.shop)
            console.log("Shop data is fetched successfully",res.data.data.shop);
    
         }).catch((err)=>{
            console.error("There was an error fetching the shop information",err.message);
         })
        }
        
    },[shopId]);

    useEffect(() => {
        if (shop) {
          setOrders(shop.orders);
        }
      }, [shop]);
    
    
    function toggleProductDashboard(){
        setProductToggle((prevValue)=>!prevValue);
    }

    function toggleProductForm(){
        setProductFormToggle((prevValue)=>!prevValue)
    }

    function toggleUpdateShopForm(){
        setUpdateShopToggle((prevValue)=>!prevValue)
    }
    function toggleDeletePopup(){
        setDeletePopupToggle((prevValue)=>!prevValue)
    }
    function handleCollabFormToggle (){
        setToggleCollabForm((prevValue)=>!prevValue);
    }

    useEffect(()=>{
        console.log("Order values in orders",orders)
        const fetchOrdersData = async () =>{

            if(orders){
                console.log("Orders fetching started",orders);

             await Axios.post('http://localhost:3001/get-shop-orders',
                { ordersIDs : orders, })
             .then((res)=>{
                setOrdersData(res.data)
                console.log("Orders are here ",res.data)
             }).catch((err)=>{
                console.error("Error fetching products data",err.message)
             })
            }
        }
        fetchOrdersData();
     },[orders])

     function calculateTotalSales(){
         let totalSales=0;

         if(orders){
            for(let i=0;i<ordersData.length;i++){
                totalSales=totalSales+ordersData[i].productPrice;
             }
         }

         return totalSales

     }
     
     function generateSalesReport(){
        const template=document.getElementById('sales-report-template');

        template.style.display = 'block';

        const options={
            margin:0.5,
            fileName:"sales--report.pdf",
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        }

        html2pdf().from(template).set(options).save().then(()=>{
            template.style.display='none';
        })

     }
     const ordersArray=ordersData.map((order)=>(
        <tr key={order._id} className='orders--table--tableRow'>
            <td className='orders--table--tableData'>{order.userName ? order.userName : ""}</td>
            <td className='orders--table--tableData'>{new Date(order.orderDate).toLocaleDateString()}</td>
            <td className='orders--table--tableData'>{order.productName ? order.productName : ""}</td>
            <td className='orders--table--tableData'>{order.productPrice}</td>
            <td className='orders--table--tableData'>{order.orderStatus}</td>
            <td className='orders--table--tableData'>{order.productCategory ? order.productCategory : ""}</td>
        </tr>
     ))
    
    return (
        <div className='shop--dashboard--holder'>
            <div className='section--1'>
                <img src={require('../Images/arrow-left-white.svg').default} alt='back--button' className='back--button' onClick={props.toggleClickedShop}/>
                <div className='shop--info--container'>
                    <h3 className='shop--name--'>{shop.shopName}</h3>
                    <h4 className='title--text'>Fulfill new orders & track analytics.</h4>
                </div>
                <div className='settings--container'>
                {toggleCollabForm && <CollaborationForm shopID={shopId} toggleForm={handleCollabFormToggle} sellerID={props.sellerID}/>}
                    <button className='collab--button' onClick={handleCollabFormToggle}>Collaborate</button>
                    <img src={require('../Images/settingIcon2.svg').default} className='setting--icon' alt='setting--icon' onClick={toggleUpdateShopForm}/>
                   {updateShopToggle && <UpdateShop shopID={shopId} toggleForm={toggleUpdateShopForm}/>}
                    <img src={require('../Images/bellWhite.svg').default} className='setting--icon' alt='setting--icon'/>
                    <img src={require('../Images/mailWhite.svg').default} className='setting--icon' alt='mail--icon'/>
                    <img src={require('../Images/trash--icon--white.svg').default} className='setting--icon' alt='trash--icon' onClick={toggleDeletePopup}/>
                   {deletePopupToggle && <DeletePopup shopID={shopId} deleteToggle={toggleDeletePopup}/>}
                </div>
            </div>

    
            {!productToggle ? <div className='section--2'>
                {productFormToggle && <AddProductForm toggleForm={toggleProductForm} shopId={shopId}/>}
                <div className='products--holder'>
                    <div className='products'>

                    </div>
                    <div className='manage--product--info'>
                        <small className='manage--products--title' onClick={toggleProductDashboard}>Manage products</small>
                        <img src={require('../Images/plus-circle.svg').default} className='setting--icon' alt='plus--icon' onClick={toggleProductForm}/>
                    </div>
                </div>
                <div className='analytics--section'>
                    <div className='sales--container'>
                        <div className='info--sales-shop'>
                            <small className='info--title'>Total Sales</small>
                            <small className='sales--month'>September</small>
                        </div>
                        <h5 className='sales--amount'>Rs.{calculateTotalSales()}.00</h5>
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
                    <div className='report-section' onClick={generateSalesReport}>
                        <img src={require('../Images/report--icon.png')} className='report--icon' alt='report--icon'/>
                        <small className='sales--reports--title'>Sales reports</small>
                    </div>
                    <div className='rating--section'>
                        <img src={require('../Images/THREE-STARS_BLACK.svg').default} alt='rating--icon' className='rating--icon'/>
                        <small className='sales--reports--title'>Sales reports</small>
                    </div>
                </div>
            </div> : <ProductDashboard shopID={shopId}/>}

            <div className='section--3'>
                <h5 className='orders--heading'>Orders Section</h5>
                <table className='orders--table'>
                    <thead>
                    <tr className='order--table--rows'>
                        <th className='order--table--headings'>User Name</th>
                        <th className='order--table--headings'>Ordered Date</th>
                        <th className='order--table--headings'>Product Title</th>
                        <th className='order--table--headings'>Product Price</th>
                        <th className='order--table--headings'>Status</th>
                        <th className='order--table--headings'>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                        {ordersArray}
                    </tbody>
                </table>
            </div>
            <div id="sales-report-template" style={{ display: 'none', fontFamily: 'DM Sans, sans-serif', padding: '20px', color: '#333' }}>
  
  <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px', 
      borderRadius: '8px', 
      marginBottom: '20px'
  }}>
    
    <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: '#333', fontWeight: 'bold', margin: 0 }}>
      AutoBook
    </h2>
    
    <h1 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', margin: 0 }}>
      {shop.shopName}
    </h1>
    
    <div style={{ width: '50px' }}></div>
  </div>

  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
    <h4 style={{ fontSize: '22px', color: '#555', margin: '10px 0' }}>Monthly Sales Report</h4>
    <p style={{ fontSize: '14px', color: '#777' }}>
      <strong>Report Generated on:</strong> {new Date().toLocaleDateString()}
    </p>
  </div>
  
  {/* Order Details Table */}
  <h3 style={{ marginBottom: '10px', fontSize: '20px', color: '#444' }}>Order Details</h3>
  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden' }}>
    <thead>
      <tr style={{ backgroundColor: '#4CAF50', color: 'white', textAlign: 'left' }}>
        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>User Name</th>
        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Order Date</th>
        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Product Title</th>
        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Product Price</th>
        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Order Status</th>
      </tr>
    </thead>
    <tbody>
      {ordersData.length > 0 ? (
        ordersData.map((order, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fff' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', color: '#333' }}>{order.userName}</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', color: '#333' }}>{new Date(order.orderDate).toLocaleDateString()}</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', color: '#333' }}>{order.productName}</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', color: '#333' }}>{order.productPrice}</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', color: '#333' }}>{order.orderStatus}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" style={{ textAlign: 'center', padding: '12px', color: '#777' }}>No orders found.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
    )
}