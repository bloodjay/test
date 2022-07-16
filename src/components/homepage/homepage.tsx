import React, {
    useEffect,
    useState,
} from "react";
import "./homepage.css"

interface Assest {
    time: String,
    assestId: String,
    name :String,
    data_start:String
}

function Homepage(props) {
    const [assest, setAssest] = useState<Assest|undefined>(undefined);
    const [search,setSearch] = useState('');
    const [display, setDisplay] = useState('');
    const [first,setFirst] = useState({name:String,price_usd:Number});
    const [second,setSecont] = useState({name: String,price_usd:Number});
    const [rate,setRate] = useState(Number);
    useEffect(() => {
        if (assest === undefined) {
            fetch(
                "https://rest-sandbox.coinapi.io/v1/assets/?apikey=4D02C9E7-0210-4C64-B6D4-6A133C47D98E")
                .then((res) => res.json())
                .then((json) => {
                    setAssest(json);
                    setDisplay(json);
                })
        }
    }, [assest])
    const handleSubmit = (event) => {
        event.preventDefault();
        let temp:Array<Assest>;
        assest.forEach(element => {
            if(element.name.includes(search)){
                temp.push(element)
            }
        });
        setDisplay(temp);
      }
    const handleClick = (index) => {
        if(first!==undefined){
            setSecont({name:display[index].name,price_usd:display[index].price_usd});
        }else{
            setFirst({name:display[index].name,price_usd:display[index].price_usd});
            setRate(first.price_usd / display[index].price_usd);
        }
    }  
    return (
        <div className="home">
            <div className="search">
                <form onSubmit={handleSubmit}>
                    <label>Search</label>
                    <input type = "text"
                    onChange = {(e) => setSearch(e.target.value)}/>
                    <input type="submit" />
                </form>
            </div>
            <div>
               {
                "Rates between " + first.name + " and " + second.name + " is " + rate
               }
            </div>
            <div className="grid">
            {
              (assest !== undefined)?display.map((x,index) => 
              <div onClick = {(e) => handleClick(index)} className="card-container">
                <div className="home-cell">{x.name}</div>
                <div className="hide">
                <div>{x.name}</div>
                <div>{x.data_start}</div>
                <div>{x.data_end}</div>
                </div>
              </div>):''
            }
            </div>
        </div>
    )
}

export default Homepage;
