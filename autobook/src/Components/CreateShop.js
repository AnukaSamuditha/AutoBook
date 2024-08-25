import React,{useState} from 'react';
import Axios from 'axios'

export default function CreateShop(){
    const [formData,setFormData]=useState({
        shopName:"",
        shopDescription:"",
        primaryProduct:"",
        contactNumber:"",
        shopEmail:"",
        isCreditCardAvailable:false,
        isDebittCardAvailable:false,
        isCODAvailable:false

    })

    function handleChange(event){
       
        setFormData((prevFormData)=>{
            const{name,type,value,checked}=event.target;

            return{
                ...prevFormData,
                [name]:type ==='checkbox' ? checked:value
            }
        })
    }
    function handleSubmit(event){
      event.preventDefault();

      Axios.post('http://localhost:3001/create-shop',{
        shopName:formData.shopName,
        shopDescription:formData.shopDescription,
        primaryProduct:formData.primaryProduct,
        contactNumber:formData.contactNumber,
        shopEmail:formData.shopEmail,
        isCreditCardAvailable:formData.isCreditCardAvailable,
        isDebittCardAvailable:formData.isDebittCardAvailable,
        isCODAvailable:formData.isCODAvailable

      }).then((res)=>{
        console.log("The shop is created successfully",res.data);
      }).catch((err)=>{
        console.error("There was a failure in shop creation",err.message);
      })

      setFormData((prevFormData)=>{
        return {
        shopName:"",
        shopDescription:"",
        primaryProduct:"",
        contactNumber:"",
        shopEmail:"",
        isCreditCardAvailable:false,
        isDebittCardAvailable:false,
        isCODAvailable:false
        }
      })
      
    }
    return(
        <div className='form--container'>
            <div className='form--Info'>
                <h3 className='form--title'>Build the Future of Automotive Commerce.</h3>
                <p className='form-description'>The road to the future is paved with innovation and dedication. Build your shop today and become a key player in the automotive industry, offering products and solutions that drive the future forward.</p>
            </div>
            <form className='form' onSubmit={handleSubmit}>
                     <div className='sector--1'>
                     <label htmlFor="shopName">Shop Name<span className='star--mark'>*</span></label><br/>
                     <input 
                      type='text'
                      name='shopName'
                      value={formData.shopName}
                      onChange={handleChange}
                      placeholder='Provide your shop name'
                     /><br/>
                     <label htmlFor="shopDescription">Shop Description:</label><br/>
                     <input 
                      type='text'
                      name='shopDescription'
                      id='shopDescription'
                      value={formData.shopDescription}
                      onChange={handleChange}
                      placeholder='Enter a brief description of your shop'
                     /><br/>
                     <label htmlFor='primaryProduct'>Primary Product</label><br/>
                     <select 
                       id='primaryProduct'
                       name='primaryProduct'
                       onChange={handleChange}
                       value={formData.primaryProduct}
                     >
                        <option value="">--Select the primary product in yoru shop--</option>
                        <option value="EngineParts">Engine Parts</option>
                        <option value="Tires">Tires</option>
                        <option value="Batteries">Batteries</option>
                        <option value="Bodykit">Body Kit</option>
                        <option value="Other">Other</option>
                     </select><br/>
                     <label htmlFor='contactNumber'>Shop Contact Number</label><br/>
                     <input 
                       type='text'
                       name='contactNumber'
                       onChange={handleChange}
                       value={formData.contactNumber}
                       placeholder="Shop contact number"
                     /><br/>
                     <label htmlFor='shopEmail'>Shop Email Address</label><br/>
                     <input 
                      type='text'
                      name='shopEmail'
                      onChange={handleChange}
                      value={formData.shopEmail}
                      placeholder="Shop email address"
                     /><br/>
                     </div>

                     <div className='sector--2'>
                        <h4 className='payment--methods'>Payment Methods</h4>
                        <div className='payment--option--holder'>
                            <label htmlFor='isCreditCardAvailable' className='payment--label'>Credit Card</label>
                            <input 
                              type='checkbox'
                              id='isCreditCardAvailable'
                              name='isCreditCardAvailable'
                              onChange={handleChange}
                              checked={formData.isCreditCardAvailable}
                            /><br/>
                            <label htmlFor='isDebittCardAvailable' className='payment--label'>Debit Card</label>
                            <input 
                              type='checkbox'
                              id='isDebittCardAvailable'
                              name='isDebittCardAvailable'
                              onChange={handleChange}
                              checked={formData.isDebittCardAvailable}
                            /><br/>
                            <label htmlFor='isCODAvailable' className='payment--label'>Cash On Delivery</label>
                            <input 
                              type='checkbox'
                              id='isCODAvailable'
                              name='isCODAvailable'
                              onChange={handleChange}
                              checked={formData.isCODAvailable}
                            /><br/>
                            
                        </div>
                        <h3 className='subscription--plan--title'>Select a subscription plan</h3>
                        <div className='plans--container'>
                            <div className='plan'>
                              <h5 className='plan--Name'>Starter Gear</h5>
                              <div className='plan--price--holder'>
                                <h3 className='plan--price'>$10</h3>
                                <small className='plan--duration--text'>/per month</small>
                              </div>

                            </div>
                            <div className='plan'>
                              <h5 className='plan--Name'>Starter Gear</h5>

                            </div>
                            <div className='plan'>
                              <h5 className='plan--Name'>Starter Gear</h5>

                            </div>
                        </div>
                        <div className='submit--button--holder'>
                          <button className='submit--button'>Create Shop</button>
                        </div>
                     </div>

            </form>
            
        </div>
    )
}