import styles from './Home.module.css';
import { BiMoon,BiSearch,BiChevronDown,BiSun } from "react-icons/bi";
import {useState, useEffect} from 'react'
import axios from 'axios';
import CountryCard from '../../components/countryCard/CountryCard'

function App() {



  const[showFilters,setshowFilters] = useState(false)

  const [allCountries,setAllcountries] = useState([])
  const[filter,setfilter] = useState('Filter by Region')
  const[mode,setmode] = useState('Dark Mode')
  const[search,setsearch] = useState('')
  const[icon,seticon] = useState('Dark')


  const BASE_URL = "https://restcountries.eu/rest/v2/all"

  let FILTER_BY_REGION = `https://restcountries.eu/rest/v2/region/${filter}`



  const fetchAllCountries = (url) => {
    axios.get(url)
    .then(res => {
      console.log(res.data)
      setAllcountries(res.data)})
    .catch(err => alert(err))
    }


    // const countryContainer = allCountries.map(country => {
    //   return <CountryCard 
    //   // key={country.callingCodes[0]}
    //   name ={country.name}
    //   population = {country.population}
    //   flag = {country.flag}
    //   region = {country.region}
    //   capital={country.capital}
    //   />
    // })

    const searchFilter = allCountries.filter(country => country.name.toLowerCase().startsWith(search))
    const searchContainer = searchFilter.map(country => {
      return <CountryCard 
      // key={country.callingCodes[0]}
      name ={country.name}
      population = {country.population}
      flag = {country.flag}
      region = {country.region}
      capital={country.capital}
      />
    })

 useEffect(() =>fetchAllCountries(BASE_URL),[])


const displayFilters = () => {
  setshowFilters(!showFilters)
}


const toggleMode = () => {
  if (mode === 'Light Mode'){
    setmode('Dark Mode')
    seticon('Light')
  }else{
    setmode('Light Mode')
    seticon('Dark')
  }
}


const changeLabel = (region) => {
  setshowFilters(!showFilters)
  setfilter(region)
  if(region === 'All' || region === 'Filter by Region'){
    FILTER_BY_REGION = BASE_URL
  }else{
    FILTER_BY_REGION = `https://restcountries.eu/rest/v2/region/${region.toLowerCase()}`
  }
  fetchAllCountries(FILTER_BY_REGION)
}

  return (
    <div>
      <header className={styles.Header}>
        <div className={styles.headerContent}>
        <span className={styles.Heading}> Where in the world? </span>
        <div className={styles.toggleDark} onClick={toggleMode}>
          {/* <BiMoon /> */}
          {icon === "Dark"? <BiSun />: <BiMoon />}
          {/* {"Dark Mode" ? <BiSun />:<BiMoon />} */}
          {mode}
        </div>
        </div>
      </header>
    <div className={styles.App}>
      <div className={styles.filterbox}>
        <div className={styles.searchBar}>
        <BiSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search for a country..." onChange={e => setsearch(e.target.value)}/>
        </div>
        <div>
          <div className={styles.filter} onClick={displayFilters}>
          <div >{filter}</div>
          <BiChevronDown/>
          </div>
        </div>
      </div>
          <div className={showFilters?styles.optionShow:styles.options} >
            <span onClick={() => changeLabel('All')}>All</span>
            <span onClick={() => changeLabel('Africa')}>Africa</span>
            <span onClick={() => changeLabel('Americas')}>Americas</span>
            <span onClick={() => changeLabel('Asia')}>Asia</span>
            <span onClick={() => changeLabel('Europe')}>Europe</span>
            <span onClick={() => changeLabel('Oceania')}>Oceania</span>
          </div>
      <div className={styles.countryContainer}>
        {searchContainer}
        {/* {countryContainer}      */}
      </div>
    </div>
    </div>
  );
}

export default App;
