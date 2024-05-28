import React, { useState, useEffect } from 'react';
import './CSS/trend.css';
import SplashScreen from './Splash';
import { LineChart, Line, XAxis, Brush, YAxis, Tooltip, Legend, ResponsiveContainer, Bar, ComposedChart } from 'recharts';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Trend() {
  const [data23, setdata23] = useState([]);
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(1);
  const [data, setdata] = useState([]);
  const [alldata, setdata3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hotpro, sethotpro] = useState([]);
  const [sens, setsens] = useState("");
  const [seain, seaset] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const name = sessionStorage.getItem("email") || "";
    const firstime = sessionStorage.getItem("firsttime") || "";
    if (name === "") {
      navigate('/login');
    }

    fetch('http://127.0.0.1:5000/get_user_hot', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        "username": name,
      }),
    }).then((response) => {
      response.json().then((body) => {
        sethotpro(body['hot']);
        setdata23(body['tre']);
      });
    });

    fetch('http://127.0.0.1:5000/get_all_pref', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then((response) => {
      response.json().then((body) => {
        // Assuming `allpref` was used to set preferences
        // allpref(body)
      });
    });

    fetch('http://127.0.0.1:5000/get_all_categories', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then((response) => {
      response.json().then((body) => {
        // Assuming `allcat` was used to set categories
        // allcat(body)
      });
    });

    setTimeout(() => setLoading(false), 1500);
    if (firstime === "true") {
      const boxes = document.getElementsByClassName('firsttime') as HTMLCollectionOf<HTMLElement>;
      if (boxes.length > 0) {
        boxes[0].style.display = 'block';
      }
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave this page?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, [navigate]);

  const toggleic = () => {
    const boxes = document.getElementsByClassName('hoveric') as HTMLCollectionOf<HTMLElement>;
    if (boxes.length > 0) {
      boxes[0].style.display = boxes[0].style.display === 'block' ? 'none' : 'block';
    }
  }

  const search = () => {
    fetch('http://127.0.0.1:5000/search', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        "name": seain
      }),
    }).then((response) => {
      response.json().then((body) => {
        fetch('http://127.0.0.1:5000/get_text', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            "lists": body['main_list']
          }),
        }).then((response) => {
          response.json().then((body) => {
            setdata(body['original']);
            setdata2(body['bar_chart_data']);
            setdata3(body);
            switch (true) {
              case body['threshold'] === "High" && body['trend'] === "Increasing":
                setsens("This item is currently very popular and its appeal is growing over time. It may be a good investment opportunity to consider as it is gaining momentum in the market.");
                break;
              case body['threshold'] === "High" && body['trend'] === "Decreasing":
                setsens("This item is currently very popular but its appeal is declining over time. While it may still be a profitable investment in the short term, it may not have long-term sustainability. It's worth considering other investment options that have a more stable or increasing trend.");
                break;
              case body['threshold'] === "Moderate" && body['trend'] === "Increasing":
                setsens("This item is gaining in popularity and has a positive trend. While it may not have the same level of demand as more popular items, it could still be a good investment opportunity to consider as it is on the rise.");
                break;
              case body['threshold'] === "Moderate" && body['trend'] === "Decreasing":
                setsens("This item has a moderate level of popularity but its appeal is declining over time. It may be a risky investment to consider as it may not have the same level of profitability in the future. It's worth considering other investment options that have a more stable or increasing trend.");
                break;
              case body['threshold'] === "Low" && body['trend'] === "Increasing":
                setsens("This item is currently not very popular but its appeal is growing over time. It may be a good investment opportunity to consider as it has potential for growth in the market.");
                break;
              case body['threshold'] === "Low" && body['trend'] === "Decreasing":
                setsens("This item is not very popular and its appeal is declining over time. It may not be a profitable investment opportunity to consider as it may not have long-term sustainability. It's worth considering other investment options that have a more stable or increasing trend.");
                break;
              default:
                setsens("");
            }
            setmin((Math.round(Math.min(...body['original'].map(item => item.label)) * 10) / 10) - 0.05);
            setmax((Math.round(Math.max(...body['original'].map(item => item.label)) * 10) / 10) + 0.05);
            const boxes = document.getElementsByClassName('line') as HTMLCollectionOf<HTMLElement>;
            if (boxes.length > 0) {
              boxes[0].style.left = body['score'];
            }
            const graphBoxes = document.getElementsByClassName('graphs') as HTMLCollectionOf<HTMLElement>;
            if (graphBoxes.length > 0) {
              graphBoxes[0].style.display = 'block';
            }
            const hotCategoryBoxes = document.getElementsByClassName('hotcategory') as HTMLCollectionOf<HTMLElement>;
            if (hotCategoryBoxes.length > 0) {
              hotCategoryBoxes[0].style.display = 'none';
            }
            const levelBoxes = document.getElementsByClassName('levelff') as HTMLCollectionOf<HTMLElement>;
            if (levelBoxes.length > 0) {
              levelBoxes[0].style.display = 'none';
            }
          });
        });
      });
    });
  }

  const seat = (e) => {
    seaset(e.target.value);
  }

  const formatYAxisTick = (value) => {
    return Math.round(value * 100) / 100;
  }

  const handlegraphs = (is:any) => {
    fetch('http://127.0.0.1:5000/search', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        "name": is
      }),
    }).then((response) => {
      response.json().then((body) => {
        fetch('http://127.0.0.1:5000/get_text', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            "lists": body['main_list']
          }),
        }).then((response) => {
          response.json().then((body) => {
            setdata(body['original']);
            setdata2(body['bar_chart_data']);
            setdata3(body);
            switch (true) {
              case body['threshold'] === "High" && body['trend'] === "Increasing":
                setsens("This item is currently very popular and its appeal is growing over time. It may be a good investment opportunity to consider as it is gaining momentum in the market.");
                break;
              case body['threshold'] === "High" && body['trend'] === "Decreasing":
                setsens("This item is currently very popular but its appeal is declining over time. While it may still be a profitable investment in the short term, it may not have long-term sustainability. It's worth considering other investment options that have a more stable or increasing trend.");
                break;
              case body['threshold'] === "Moderate" && body['trend'] === "Increasing":
                setsens("This item is gaining in popularity and has a positive trend. While it may not have the same level of demand as more popular items, it could still be a good investment opportunity to consider as it is on the rise.");
                break;
              case body['threshold'] === "Moderate" && body['trend'] === "Decreasing":
                setsens("This item has a moderate level of popularity but its appeal is declining over time. It may be a risky investment to consider as it may not have the same level of profitability in the future. It's worth considering other investment options that have a more stable or increasing trend.");
                break;
              case body['threshold'] === "Low" && body['trend'] === "Increasing":
                setsens("This item is currently not very popular but its appeal is growing over time. It may be a good investment opportunity to consider as it has potential for growth in the market.");
                break;
              case body['threshold'] === "Low" && body['trend'] === "Decreasing":
                setsens("This item is not very popular and its appeal is declining over time. It may not be a profitable investment opportunity to consider as it may not have long-term sustainability. It's worth considering other investment options that have a more stable or increasing trend.");
                break;
              default:
                setsens("");
            }
            setmin((Math.round(Math.min(...body['original'].map(item => item.label)) * 10) / 10) - 0.05);
            setmax((Math.round(Math.max(...body['original'].map(item => item.label)) * 10) / 10) + 0.05);
            const boxes = document.getElementsByClassName('line') as HTMLCollectionOf<HTMLElement>;
            if (boxes.length > 0) {
              boxes[0].style.left = body['score'];
            }
            const graphBoxes = document.getElementsByClassName('graphs') as HTMLCollectionOf<HTMLElement>;
            if (graphBoxes.length > 0) {
              graphBoxes[0].style.display = 'block';
            }
            const hotCategoryBoxes = document.getElementsByClassName('hotcategory') as HTMLCollectionOf<HTMLElement>;
            if (hotCategoryBoxes.length > 0) {
              hotCategoryBoxes[0].style.display = 'none';
            }
            const levelBoxes = document.getElementsByClassName('levelff') as HTMLCollectionOf<HTMLElement>;
            if (levelBoxes.length > 0) {
              levelBoxes[0].style.display = 'none';
            }
          });
        });
      });
    });
  }



  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="home">
      {loading ? <SplashScreen /> : (
        <div>
          <div className="login">
          </div>

          <div className="navs">
            <p className="labelc">Product Scout</p>
            <div className="nav-cont">
              <div>
                <div className="search-containerz">
                  <i className="search-icon fas fa-search"></i>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Article name or keywords..."
                    onChange={seat}
                    value={seain}
                  />
                </div>
                <button className="Searchbuttz" onClick={search}>
                  Search
                </button>
                <button className="catz" onClick={() => { navigate("/select-category") }}>
                  Home
                </button>
                <button className="logoutz" onClick={() => { navigate("/") }}>
                  Logout
                </button>
                <button className="trendz" onClick={() => { navigate("/hotcategories") }}>
                  Hot Products
                </button>
                <button className="calcz" onClick={() => { navigate("/calculator") }}>
                  Profit Calculator
                </button>
              </div>
            </div>
          </div>

          <div className="hotcategory">
            <h1 className="hch">Current Hot Products based on your interest</h1>
            <p className="hhp">Click to see predict future trend of these products</p>
            {hotpro.map((category, index) => (
              <div className="hotproduct" onClick={() => { handlegraphs(Object.keys(category)[0]) }} key={index}>
                {Object.keys(category)[0]}
              </div>
            ))}
          </div>

          <ResponsiveContainer className="levelff" width="40%" height="80%">
            <ComposedChart
              width={500}
              height={300}
              data={data23}
              margin={{
                top: 50,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <Tooltip />
              <Legend verticalAlign="bottom" wrapperStyle={{ lineHeight: '40px' }} />
              <Brush dataKey="name" height={30} stroke="#f2065f" y={490} />
              <Bar dataKey="market_trend" fill="#f2003d" />
              <Line type="monotone" dataKey="running_average" stroke="#030637" />
              <text x={300} y={555} fontSize={13} fontWeight={600} textAnchor="middle" fill="#030637">
                GRAPH SHOWING MARKET SALES OVERALL TREND IN ALL CATEGORIES FOR PAST 30 DAYS
              </text>
            </ComposedChart>
          </ResponsiveContainer>

          <div className="graphs">
            {/* <ResponsiveContainer className="chart2" width="45%" height="5%">
              <BarChart width={150} height={200} data={data2}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={xAxisTickStyle} dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#f2003d" />
                <text x={450} y={380} fontSize={20} textAnchor="middle" fill="#030637">
                  Relevant Categories
                </text>
                <Tooltip />
              </BarChart>
            </ResponsiveContainer> */}

            <ResponsiveContainer className="chart" width="80%" height="60%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 50,
                  left: 20,
                  bottom: 5,
              
                }}
              >
                <XAxis tick={{ stroke: '#030637', fontSize: 12 }} axisLine={{ stroke: '#030637' }} dataKey="x" />
                <YAxis tick={{ stroke: '#030637', fontSize: 12 }} axisLine={{ stroke: '#030637' }} tickFormatter={formatYAxisTick} domain={[min, max]} />
                <text x={650} y={20} fontSize={20} textAnchor="middle" fill="#030637">
                  Y-Axis: Trend Values, X-Axis: Date and Day of the Month
                </text>
                <Tooltip />
                <Legend />
               
                <Line type="monotone" dataKey="trend" stroke="#f2003d" strokeWidth={2} />
                
              </LineChart>
             
              
            </ResponsiveContainer>
            

            <div className="Stats">
              <p><span>Max Price:</span> "Rs. {alldata['max_price']}"</p>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <p><span>Min Price:</span> "Rs. {alldata['min_price']}"</p>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <p><span>Mean Price:</span> "Rs. {alldata['mean_price']}"</p>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <p><span>Popularity:</span> {alldata['threshold']}</p>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <p><span>Trend:</span> {alldata['trend']}</p>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <p className="rotateic" onClick={toggleic}><span>Suggestions</span></p>
              <div className="hoveric">
                <p>{sens}</p>
              </div>
            </div>

            <div className="heatmap">
              <p className="sb">Good Investment</p>
              <p className="snb">Bad Investment</p>
              <p className="line">.</p>
              <p className="hmdes">The heatmap colors show investment quality: green for good, red for potentially unfavorable.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
