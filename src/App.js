import React, { useState } from "react";
import './custom.css';
import axios from "axios";

const cors = require("cors")
const app = express()

// TODO:
// hent alle foretak
// hent alle produkter
// styling
// event på filter

// dummy data
const dsakList = [
  { id: 1, title: "SRapport 123 feiler", registeredDate: "22.12.2023 13:20", customer: "Sykehuspartner", azure: 12345 },
  { id: 2, title: "Tilgang til Kundeportal", registeredDate: "22.12.2023 13:20", customer: "Sykehuspartner", azure: 12345 },
  { id: 3, title: "Dokumentliste uten svar", registeredDate: "22.12.2023 13:20", customer: "Sykehuspartner", azure: 12345 },
  { id: 4, title: "AOM Feil", registeredDate: "22.12.2023 13:20", customer: "Sykehuspartner", azure: 12345 },
  { id: 5, title: "Deaktivert knapp", registeredDate: "22.12.2023 13:20", customer: "Sykehuspartner", azure: 1111 }
];

const Search = () => {
  // get search terms
  // call api
  // include filters if any (check)
  // list all data
  
};


const FetchCompanyNames = () => {

};



const DsakList = (props) => (
  <div>
    {props.profiles.map(profile => <Dsak key={profile.id} {...profile} />)}
  </div>
);


const Dsak = (props) => (  
    <tr className='row'>
      <td>{props.id}</td>
      <td><a href="*">{props.title}</a></td>
      <td>{props.registeredDate}</td>
      <td>{props.customer}</td>
      <td><a href="*">{props.azure}</a></td>
    </tr>  
);

const SearcBar = () => { 

  const handleFormEvent = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchTerm = event.target.value;
      //var json = JSON.stringify(searchTerm);
      await axios.get(`https://localhost:44302/DsakSearch/search?searchString=test%22test2%22test3`, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then (content => console.log("DATA " + content.data))
      .catch((err) => console.log(err));   
    }
  };

  return (
    <header>
      <nav className="fixed-navbar">
        <div className="navbar">
          <div className="logo">Your Logo</div>
          <div className="search">
            <SearchForm onChange={handleFormEvent} />
          </div>
        </div>
      </nav>
    </header>
  );
};

const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className='hf'>
        <form>
          <label>Velg foretak</label>
          <select>
            <option disabled selected value>-- Velg foretak --</option>
            <option>test1</option>
            <option>test2</option>
            <option>test3</option>
          </select>
        </form>
      </div>
      <FromDate />
      <ToDate />
      <Product />
      <Municipal />
  </aside>
  );
};

const SearchForm = (props) => {
  return (
    <form>
      <input
        onKeyDown={props.onChange}
        type="text"
        placeholder="Søk i saker..."
        required />
    </form>
  );
};

const Municipal = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };
  return (
    <div style={{ margin: 5 }}>
      <form>
        <label for="municipal">Inkluder kommune i søket</label>
        <input
          type="checkbox"
          onChange={handleCheckBoxChange}
          id="municipal_id"
          checked={isChecked} />
      </form>
    </div>
  );
};

const Product = () => {
  return (
    <div className="products">
      <form>
        <label for="products">Velg produkt</label>
        <select name="products" id="products_id">
          <option disabled selected value>--- velg produkt ---</option>
          <option value="Dokumentlist1">Dokumentlist1</option>
          <option value="Dokumentlist2">Dokumentlist2</option>
          <option value="Dokumentlist3">Dokumentlist3</option>
          <option value="Dokumentlist4">Dokumentlist4</option>
        </select>
      </form>
    </div>
  );
};

const FromDate = () => {
  return (
    <div className="date">
        <label>Fra dato</label>
        <input type="date" id="fromDate" name="from_date" />
      </div>
  );
};

const ToDate = () => {
  return (
    <div className="date">
        <label>Til dato</label>
        <input type='date' id="toDate" name="to_date" />
      </div>
  );
};

const MainContent = (props) => {
  var content = props.profiles;
  return (
    <div className="content">
    <h1>Main Content Area</h1>
    <div className='row'>
      <table className="content">
<DsakList profiles={content} />
    {/* <table className='content'>
      
      <tr className='row'>
        <td>1</td>
        <td>lasdkjldjkljasd</td>
        <td>12.02.2023, 13:20</td>
        <td>Oslo Universitetssykehus HF</td>
        <td><a>45673</a></td>
      </tr>
    </table> */}
    </table>
    </div>    
  </div>
  );
};

const App = () => {   
  const [profiles, setProfiles] = useState([]);

  const addNewProfile = (profileData) => {
    setProfiles(profileData);
  };

  return (
    <div class='container'>
    <SearcBar onSubmit={addNewProfile} />
    <SideBar/>
    <MainContent profiles={dsakList}/>
    </div>
  );
};

export default App;
