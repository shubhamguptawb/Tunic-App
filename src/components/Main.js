import React, { useEffect, useState } from "react";
import "../assets/css/main.css";
import searchIco from "../assets/images/search.svg";
import Product from "./Product";
import ViewSimilar from "./ViewSimilar";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import {
  filterByQuery,
  filterList,
  search,
  fetchProducts,
  sort,
  sortByGender,
} from "../utilities";

function Main(props) {
  let [loading, setLoading] = useState(false);
  let [sortValue, setSortValue] = useState("new");
  let [sortDisplay, setSortDisplay] = useState("New Arrivals");
  let [showSortMenuD, setShowSortMenuD] = useState(false);
  let [view, setView] = useState(false);
  let [prodId, setProdId] = useState();
  let [msearch, setMsearch] = useState(false);
  //----------------------------------------------------------->

  // search query

  let [value, setValue] = useState("");

  const handleSearchQuery = () => {
    if (value === " " || value === "") {
      return;
    }
    let output = search(value, fetchProducts());
    props.data[1](output);
  };

  const handleChange = (event) => {
    setValue((value = event.target.value));
  };

  //----------------------------------------------------------->

  //-------------------------------------------------------->
  //state and function  for filter values

  //find by gender

  let [filterSearch, setFilterSearch] = useState(false);

  let [filterState, setFilterState] = useState([]);

  let [activeFilter, setActiveFilter] = useState([]);

  const onFilterChange = (filter) => {
    if (filterSearch != true) {
      setFilterSearch((filterSearch = true));
    }

    if (filter.type === "discount") {
      let newFilter = activeFilter.filter((elem) => elem.type != "discount");
      newFilter = [...newFilter, filter];
      setActiveFilter((activeFilter = newFilter));
      console.log(filterByQuery(activeFilter, props.data[0]));
      setFilterState(
        (filterState = filterByQuery(activeFilter, props.data[0]))
      );

      return;
    }

    for (let i of activeFilter) {
      if (i.id === filter.id) {
        let newFilter = activeFilter.filter((elem) => elem.id != filter.id);
        setActiveFilter((activeFilter = newFilter));

        if (activeFilter.length === 0) {
          setFilterState((filterState = props.data[0]));
          setFilterSearch((filterSearch = false));
        }

        setFilterState(
          (filterState = filterByQuery(activeFilter, props.data[0]))
        );

        return;
      }
    }

    setActiveFilter((activeFilter = [...activeFilter, filter]));

    setFilterState((filterState = filterByQuery(activeFilter, props.data[0])));
  };

  // mobile filter

  //Filter By Gender
  let [gender, setGender] = useState();
  const handleGenderSearch = (event) => {
    console.log(event.target.value);
    setLoading((loading = true));
    setGender((gender = event.target.value));
    let data = sortByGender(gender, fetchProducts());
    props.data[1](data);
    setTimeout(() => {
      setLoading((loading = false));
    }, 250);
  };
  //----------------------------------------------------------->

  const handleShowFilter = () => {
    document.getElementById("aside").style.transform = "translateX(0vw)";
    document.getElementById("touch-close").addEventListener("click", () => {
      document.getElementById("aside").style.transform = "translateX(-100vw)";
    });
  };

  const handleShowSimilar = (id) => {
    setProdId((prodId = id));
    setView((prev) => !prev);
  };

  const closeShowSm = () => {
    setView((view = false));
  };

  const handleShowSortMenuD = () => {
    setShowSortMenuD((prev) => !prev);
  };

  const handleSortValue = (event) => {
    setSortValue((sortValue = event.target.value));

    setLoading((loading = true));
    if (sortValue.localeCompare("new") === 0) {
      setSortDisplay((sortDisplay = "New Arrivals"));
    }

    if (sortValue.localeCompare("discount") === 0) {
      setSortDisplay((sortDisplay = "Better Discount"));
    }

    if (sortValue.localeCompare("rating") === 0) {
      setSortDisplay((sortDisplay = "Customer Rating"));
    }

    if (sortValue.localeCompare("price-desc") === 0) {
      setSortDisplay((sortDisplay = "Price: High to Low"));
    }

    if (sortValue.localeCompare("price-asc") === 0) {
      setSortDisplay((sortDisplay = "Price: Low to High"));
    }

    if (sortValue === "popularity") {
      setSortDisplay((sortDisplay = "Popularity"));
    }

    let data = sort(sortValue, props.data[0]);

    props.data[1](data);

    setShowSortMenuD((showSortMenuD = false));

    setTimeout(() => {
      setLoading((loading = false));
    }, 50);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="main">
        <div className="aside" id="aside">
          <div className="aside-wrapper">
            <div className="d-filters-header">
              <h1
                style={{
                  fontSize: "1rem",
                  height: "6%",
                  paddingTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Category
              </h1>
            </div>
            {/* filter by gender  */}
            <ul className="d-filter">
              <li style={{ fontWeight: "600" }}>
                <input
                  type="radio"
                  name="gender"
                  value="Men"
                  onChange={(e) => {
                    handleGenderSearch(e);
                  }}
                ></input>
                <label htmlFor="gender">Men</label>
              </li>
              <li style={{ fontWeight: "600" }}>
                <input
                  type="radio"
                  name="gender"
                  value="Women"
                  onChange={(e) => {
                    handleGenderSearch(e);
                  }}
                ></input>
                <label htmlFor="gender">Women</label>
              </li>
              <li style={{ fontWeight: "600" }}>
                <input
                  type="radio"
                  name="gender"
                  value="Boys"
                  onChange={(e) => {
                    handleGenderSearch(e);
                  }}
                ></input>
                <label htmlFor="gender">Boys</label>
              </li>
              <li style={{ fontWeight: "600" }}>
                <input
                  type="radio"
                  name="gender"
                  value="Girls"
                  onChange={(e) => {
                    handleGenderSearch(e);
                  }}
                ></input>
                <label htmlFor="gender">Girls</label>
              </li>
            </ul>{" "}
            <hr
              style={{
                marginTop: "10px",
                marginLeft: "10%",
                background: "black",
              }}
            />
            <div className="d-filters-header">
              <h1>Filters</h1>
              <h6
                onClick={() => {
                  setActiveFilter((activeFilter = []));
                  setFilterState((filterState = props.data[0]));
                  setFilterSearch((filterSearch = false));
                }}
              >
                Clear all
              </h6>
            </div>
            {/* filter by price  */}
            <ul className="d-filter">
              <h2>Price</h2>
              {filterList.map((elem) => {
                return elem.type === "price" ? (
                  <li>
                    <input
                      type="checkbox"
                      value={JSON.stringify(elem)}
                      id={elem.id}
                      checked={activeFilter.some(
                        (element) => elem.id === element.id
                      )}
                      onChange={() => onFilterChange(elem)}
                    />

                    <label htmlFor={elem.id}>
                      {`Rs. ${elem.value.lower} to Rs. ${elem.value.upper}`}
                    </label>
                  </li>
                ) : null;
              })}
            </ul>
            <hr
              style={{
                marginLeft: "10%",
                marginTop: "10px",
                background: "black",
              }}
            />
            {/* filter by discount */}
            <ul className="d-filter">
              <h2>Discount</h2>
              {filterList.map((elem) => {
                return elem.type === "discount" ? (
                  <li>
                    <input
                      name="discount"
                      type="radio"
                      value={JSON.stringify(elem)}
                      id={elem.id}
                      checked={activeFilter.some(
                        (element) => elem.id === element.id
                      )}
                      onChange={() => onFilterChange(elem)}
                    />
                    <label
                      htmlFor={elem.id}
                    >{`${elem.value}% and above`}</label>
                  </li>
                ) : null;
              })}
            </ul>
            <hr
              style={{
                marginLeft: "10%",
                marginTop: "10px",
                background: "black",
              }}
            />
            {/* filter by color  */}
            <ul className="d-filter">
              <h2>Colour</h2>
              {filterList.map((elem) => {
                return elem.type === "color" ? (
                  <li>
                    <input
                      type="checkbox"
                      value={elem}
                      id={elem.id}
                      checked={activeFilter.some(
                        (element) => elem.id === element.id
                      )}
                      onChange={() => onFilterChange(elem)}
                    />

                    <label htmlFor={elem.id}>{elem.value}</label>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
          <div id="touch-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <path d="M28 34 18 24 28 14Z" />
            </svg>
          </div>
        </div>
        <section className="products-section">
          <div
            style={{
              width: "96%",
              paddingRight: "20px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "2%",
              marginTop: "15px",
              marginLeft: "10px",
              color: "black",
              cursor: "pointer",
              fontSize: "15px",
              textDecoration: "underline",
            }}
            onClick={() => {
              setValue((value = ""));
              props.data[1](fetchProducts());
            }}
          >
            View All
          </div>
          <div className="asdfas">
            <h2>Shirts</h2>
          </div>
          <div className="sort-filter-bar">
            <div
              className="m-filter"
              onClick={() => {
                handleShowFilter();
              }}
            >
              More Filter
            </div>
            <div
              className="sort-filter-btn"
              onClick={() => {
                handleShowSortMenuD();
              }}
            >
              <span>Sort by</span>
              <span>:</span>
              <span
                style={{
                  fontWeight: "700",
                  textDecoration: "capitalize",
                }}
              >
                {sortDisplay}
              </span>
            </div>
            {showSortMenuD ? (
              <div className="sort-menu-d">
                <ul class="sort-list-d">
                  <li>
                    <label class="sort-label-d ">
                      <input
                        type="radio"
                        name="sort-value"
                        value="new"
                        onChange={(e) => {
                          handleSortValue(e);
                        }}
                      />
                      What's New
                    </label>
                  </li>
                  <li>
                    <label class="sort-label-d ">
                      <input
                        type="radio"
                        name="sort-value"
                        value="popularity"
                        onChange={(e) => {
                          handleSortValue(e);
                        }}
                      />
                      Popularity
                    </label>
                  </li>
                  <li>
                    <label class="sort-label-d ">
                      <input
                        type="radio"
                        name="sort-value"
                        value="discount"
                        onChange={(e) => {
                          handleSortValue(e);
                        }}
                      />
                      Better Discount
                    </label>
                  </li>
                  <li>
                    <label class="sort-label-d ">
                      <input
                        type="radio"
                        name="sort-value"
                        value="price-desc"
                        onChange={(e) => {
                          handleSortValue(e);
                        }}
                      />
                      Price: High to Low
                    </label>
                  </li>
                  <li>
                    <label class="sort-label-d ">
                      <input
                        type="radio"
                        name="sort-value"
                        value="price-asc"
                        onChange={(e) => {
                          handleSortValue(e);
                        }}
                      />
                      Price: Low to High
                    </label>
                  </li>
                  <li>
                    <label class="sort-label-d ">
                      <input
                        type="radio"
                        name="sort-value"
                        value="rating"
                        onChange={(e) => {
                          handleSortValue(e);
                        }}
                      />
                      Customer Rating
                    </label>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>

          {/* products display */}
          {console.log(filterSearch, "filterSearch")}
          {loading ? (
            <Loader />
          ) : (
            <div className="products-container">
              {filterSearch
                ? filterState.map((elem) => {
                    return <Product data={[elem, handleShowSimilar]} />;
                  })
                : props.data[0].map((elem) => {
                    return <Product data={[elem, handleShowSimilar]} />;
                  })}
            </div>
          )}
        </section>

        {/* mobile view components  */}
        <section className="m-main">
          {/* Mobile Gender filter  */}
          <div className="m-gender-filter">
            <div className="m-gender-filter-btn">
              <div>
                <input
                  id="Men"
                  type="radio"
                  name="gender"
                  value={"Men"}
                  onChange={handleGenderSearch}
                ></input>
                <label htmlFor="Men">
                  <img src="https://img.mensxp.com/media/content/2015/Feb/funkystylesformenthattotallywork10_1424342831.jpg?w=640&h=393"></img>
                </label>
              </div>
              <h3>Men</h3>
            </div>
            <div className="m-gender-filter-btn">
              <div>
                <input
                  id="Women"
                  type="radio"
                  name="gender"
                  value={"Women"}
                  onChange={handleGenderSearch}
                ></input>
                <label htmlFor="Women">
                  <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/03/27/11/woman-clothing-happy.jpg?width=1200"></img>
                </label>
              </div>
              <h3>Women</h3>
            </div>
            <div className="m-gender-filter-btn">
              <div>
                <input
                  id="Boys"
                  type="radio"
                  name="gender"
                  value={"Boys"}
                  onChange={handleGenderSearch}
                ></input>
                <label htmlFor="Boys">
                  <img src="https://i.pinimg.com/originals/58/ae/a7/58aea70ea747badcf50f707014f46684.jpg"></img>
                </label>
              </div>
              <h3>Boys</h3>
            </div>
            <div className="m-gender-filter-btn">
              <div>
                <input
                  id="Girls"
                  type="radio"
                  name="gender"
                  value={"Girls"}
                  onChange={handleGenderSearch}
                ></input>
                <label htmlFor="Girls">
                  <img src="https://thumbs.dreamstime.com/b/studio-portrait-cute-little-girl-kids-fashion-child-denim-pants-jacket-white-sneakers-gray-background-150695166.jpg"></img>
                </label>
              </div>
              <h3>Girls</h3>
            </div>
          </div>

          <section className="m-products-display">
            {loading ? (
              <Loader />
            ) : filterSearch ? (
              filterState.map((elem) => {
                return <Product data={[elem, handleShowSimilar]} />;
              })
            ) : (
              props.data[0].map((elem) => {
                return <Product data={[elem, handleShowSimilar]} />;
              })
            )}
          </section>
          {/* mobile search  */}
          <div className="m-search">
            {msearch ? (
              <div className="m-search-wrapper" id="m-search-wrapper">
                <input
                  type="text"
                  value={value}
                  placeholder="Search and Enter.."
                  onChange={handleChange}
                ></input>
              </div>
            ) : null}
            <div
              className="m-search-icon"
              onClick={() => {
                handleSearchQuery();
                setMsearch((prev) => !prev);
              }}
            >
              <img src={searchIco}></img>
            </div>
          </div>
        </section>
        {view ? <ViewSimilar data={[prodId, closeShowSm]} /> : null}
      </div>
    </>
  );
}

export default Main;
