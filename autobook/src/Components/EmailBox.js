import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Styles/EmailBox.css';
import Swal from 'sweetalert2';

export default function EmailBox(props) {
  const [collabIDs, setCollabsIDs] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [productIds, setProductsIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [finalProduct, setFinalProduct] = useState(null); 
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    if (props.shopID) {
      Axios.get(`http://localhost:3001/get-shop/${props.shopID}`)
        .then((res) => {
          const shopData = res.data.data.shop;
          if (shopData) {
            setCollabsIDs(shopData.collabRequests);
            setProductsIds(shopData.products);
          }
          console.log("Shop data is fetched successfully", shopData);
        })
        .catch((err) => {
          console.error("There was an error fetching the shop information", err.message);
        });
    }
  }, [props.shopID]);

  useEffect(() => {
    if (productIds.length > 0) {
      Axios.post("http://localhost:3001/get-shop-products", {
        productIDs: productIds,
      })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching product documents ", err.message);
        });
    }
  }, [productIds]);

  useEffect(() => {
    if (collabIDs.length > 0) {
      Axios.post(`http://localhost:3001/get-collab`, {
        collabIDs: collabIDs,
      })
        .then((res) => {
          setCollabs(res.data);
        })
        .catch((err) => {
          console.error("Error fetching collaboration data", err.message);
        });
    }
  }, [collabIDs]);

  function rejectCollab(collabID) {
    Axios.put(`http://localhost:3001/reject-collab/${collabID}/shops/${props.shopID}`)
      .then((res) => {
        setCollabs((prevCollabs) => prevCollabs.filter((collab) => collab._id !== collabID));
      })
      .catch((err) => {
        console.error("Error rejecting collaboration", err);
      });
  }

  async function acceptCollab(collabID) {
    if (products.length === 0) {
      Swal.fire("Error", "No products found to display.", "error");
      return;
    }

    const inputOptions = products.reduce((options, product) => {
      options[product._id] = product.productName;
      return options;
    }, {});

    const { value: formValues } = await Swal.fire({
      title: "Select a Product",
      html: `
        <select id="collab--product--value" class="swal2-input">
          <option value="">Select a product</option>
          ${Object.keys(inputOptions)
            .map((key) => `<option value="${key}">${inputOptions[key]}</option>`)
            .join('')}
        </select>
        <input type="number" id="collab--discount--price" class="swal2-input" placeholder="Enter Discounted Price">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const selectedProduct = document.getElementById("collab--product--value").value;
        const discountedPrice = document.getElementById("collab--discount--price").value;

        if (!selectedProduct) {
          Swal.showValidationMessage("Please select a product.");
          return null;
        }

        if (!discountedPrice || discountedPrice <= 0) {
          Swal.showValidationMessage("Please enter a valid discounted price.");
          return null;
        }

        return {
          selectedProduct,
          discountedPrice,
        };
      },
      showCancelButton: true,
    });

    if (formValues) {
      setFinalProduct(formValues.selectedProduct);
      setDiscountedPrice(formValues.discountedPrice);
      updateCollab(collabID, formValues.selectedProduct, formValues.discountedPrice);
    }
  }

  function calculateDiscount(productPrice, discountedPrice) {
    return productPrice - discountedPrice;
  }

  function updateCollab(collabID, selectedProductID, discountPrice) {
    const product = products.find((p) => p._id === selectedProductID);

    if (product) {
      const discount = calculateDiscount(product.productPrice, discountPrice);

      Axios.put(`http://localhost:3001/accept-collab/${collabID}/shops/${props.shopID}`, {
        discountedPrice: discount,
        productID: selectedProductID,
      })
        .then((res) => {
          console.log("Collab accepted successfully!", res.data);
          Swal.fire("Success", "Collaboration Invite Accepted.", "success");
        })
        .catch((err) => {
          console.error("Error updating the collab request", err);
        });
    }
  }

  return (
    <div className='email--box--container'>
      <img src={require('../Images/xmark.svg').default} alt='close-button' />
      {collabs.length > 0 &&
        collabs.map((collab) => (
          <div className='collab-req' key={collab._id}>
            <span className='req--title'>{collab.createdShopName}</span>
            <span className='req--date'>{new Date(collab.createdDate).toLocaleDateString()}</span>
            <button className='accept-button' onClick={() => acceptCollab(collab._id)}>
              Accept
            </button>
            <button className='reject-button' onClick={() => rejectCollab(collab._id)}>
              Reject
            </button>
          </div>
        ))}
    </div>
  );
}
