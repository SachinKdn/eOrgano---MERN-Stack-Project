import React, { Fragment,useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import "./shipping.css";
import {saveShippingInfo} from "../../actions/cartAction"
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import {Country, State, City} from "country-state-city" //package have to install firstly
import { useAlert } from "react-alert";
import {useNavigate} from 'react-router-dom'
import CheckoutSteps from "./CheckoutSteps.js"

const Shipping = () => {
    const dispatch = useDispatch();
  const alert = useAlert();  
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const goBackPage = ()=>{
    navigate('/cart')
  }
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <Fragment>
        <CheckoutSteps activeStep={0}/>
        <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              
              <input
                type="text"
                placeholder="Full Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
               
            </div>

            

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                title="e.g. 125001 (6 digits)" //ye thodi derr k liye cursor uppr rkhne pr hint bhi deta h
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                // type="number" krdete lekin usme ye maxLength ki property nhi lgti thats why use tel-telephone number and it opens numpad in mobiles automatically
                type="tel"
                pattern="[0-9]{10}" //ye pattern h ki agar ye pattern follow nhi hua to submit nhi hoga
                // pattern="[0-9]{10}": This pattern specifies that the input should consist of exactly 10 digits (0-9). It enforces a requirement for 10-digit numerical input, ensuring that the user enters a 10-digit number.
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" ye pattern US k liye h === it consists of three groups of digits separated by hyphens, with the first group containing 3 digits, the second group containing 2 digits, and the third group containing 3 digits.
                title="e.g. 9876543210 (10 digits)"//it show error msg when conditions dont match
                placeholder="Phone Number"
                required
                maxlength="10"//maxLength limits the number of characters that can be entered into the input field but does not affect the physical size or appearance of the input field.
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"//size affects the physical width of the input field on the webpage but does not limit the number of characters that can be entered.
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
{/* inke andr ye coutry,state,city store rkhti h inke code like IN (India) , HR(Haryana) */}
            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => {setState(e.target.value)}}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                        
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

{state && (
              <div>
                <LocationCityIcon />

                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">City</option>
                  {City &&
                    City.getCitiesOfState(country,state).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
<div className="btns">

            <input
              type="submit"
              value="Continue >"
              className="shippingBtn"
              disabled={state ? false : false}
            />
            <input
              type="button"
              value="Cancel  X"
              className="shippingBtn"
              onClick={goBackPage}
            />
</div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Shipping