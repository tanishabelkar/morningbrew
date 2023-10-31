import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ReactLoading from "react-loading";
import GridCard from "./GridCard";
import ListCard from "./ListCard";

function Appbar(props) {
  return (
    <Box
      sx={{
        height: "8vh",
        width: "100%",
        // border: "2px solid",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color={props.view === "list" ? "secondary" : "default"}
          onClick={() => {
            props.onListClick();
          }}
        >
          <ViewListRoundedIcon />
        </IconButton>
        <IconButton
          color={props.view === "grid" ? "secondary" : "default"}
          onClick={() => {
            props.onGridClick();
          }}
        >
          <GridViewRoundedIcon />
        </IconButton>
        <Select
          variant="standard"
          displayEmpty
          value={props.category}
          size="small"
          sx={{
            minWidth: "8em",
            mr: "1em",
            ml: "1em",
            fontFamily: "Public Sans",
          }}
          onChange={(event) => {
            props.onCategoryChange(event.target.value);
          }}
        >
          <MenuItem sx={{ fontFamily: "Public Sans" }} value="">
            <em>Select Category</em>
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Public Sans" }} value="Sports">
            Sports
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Public Sans" }} value="World">
            World
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Public Sans" }} value="Politics">
            Politics
          </MenuItem>
        </Select>
        <Select
          variant="standard"
          value={props.sort}
          size="small"
          sx={{
            minWidth: "5em",
            mr: "1em",
            ml: "1em",
            fontFamily: "Public Sans",
          }}
          onChange={(event) => {
            console.log(event.target.value);
            props.onSortChange(event.target.value);
          }}
        >
          <MenuItem sx={{ fontFamily: "Public Sans" }} value="AZ">
            A to Z
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Public Sans" }} value="ZA">
            Z to A
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Public Sans" }} value="Newest">
            Newest
          </MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontFamily: "Public Sans",
        }}
      >
        <TextField
          value={props.searchtext}
          onChange={(event) => {
            props.onSearchTextChange(event.target.value);
          }}
          size="small"
          variant="standard"
          placeholder="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Box>
    </Box>
  );
}

function LoadingComponent() {
  return (
    <Box>
      <ReactLoading type="bubbles"></ReactLoading>
    </Box>
  );
}

function GridView(props) {
  return (
    <Grid
      container
      pt={3}
      spacing={3}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {props.news.sort(props.sortMethods[props.sort]).map((newsItem) => {
        return newsItem.attributes.headline
          .toLowerCase()
          .includes(props.searchtext.toLowerCase()) ? (
          <Grid item key={newsItem.id} xs={6} sm={6} md={4} lg={4}>
            <GridCard
              imgurl={newsItem.attributes.newsIcon}
              headline={newsItem.attributes.headline}
              tags={newsItem.attributes.hashtags}
              src={newsItem.attributes.newsSource}
            />
          </Grid>
        ) : (
          <></>
        );
      })}
    </Grid>
  );
}

function ListView(props) {
  return (
    <Stack spacing={3} pt={3}>
      {props.news.sort(props.sortMethods[props.sort]).map((newsItem) => {
        return newsItem.attributes.headline
          .toLowerCase()
          .includes(props.searchtext.toLowerCase()) ? (
          <ListCard
            key={newsItem.id}
            imgurl={newsItem.attributes.newsIcon}
            headline={newsItem.attributes.headline}
            tags={newsItem.attributes.hashtags}
            src={newsItem.attributes.newsSource}
          />
        ) : (
          <></>
        );
      })}
    </Stack>
  );
}

export default function Body(params) {
  const [category, setcategory] = useState("");
  const [searchtext, setsearchtext] = useState("");
  const [news, setnews] = useState(null);
  const [view, setview] = useState("grid");
  const [sort, setsort] = useState("Newest");

  useEffect(() => {
    if (!category)
      axios
        .get("https://linesnews.onrender.com/api/news-datas")
        .then((result) => {
          console.log(result.data.data);
          setnews(result.data.data);
        })
        .catch((err) => {
          console.log(err);
          setnews({});
        });
    else {
      axios
        .get("https://linesnews.onrender.com/api/news-datas", {
          params: {
            category: category,
          },
        })
        .then((result) => {
          setnews(result.data.data);
        })
        .catch((err) => {
          console.log(err);
          setnews({});
        });
    }
  }, [setnews, category]);

  const sortMethods = {
    AZ: (a, b) => {
      if (a.attributes.headline < b.attributes.headline) return -1;
      else if (a.attributes.headline > b.attributes.headline) return 1;
      else return 0;
    },
    ZA: (a, b) => {
      if (a.attributes.headline > b.attributes.headline) return -1;
      else if (a.attributes.headline < b.attributes.headline) return 1;
      else return 0;
    },
    Newest: (a, b) => {
      if (a.attributes.createdAt <= b.attributes.createdAt) return -1;
      else return 1;
    },
  };

  return (
    <>
      <Appbar
        category={category}
        searchtext={searchtext}
        view={view}
        sort={sort}
        onCategoryChange={function (newCategory) {
          setcategory(newCategory);
        }}
        onSearchTextChange={function (text) {
          setsearchtext(text);
        }}
        onListClick={function () {
          setview("list");
        }}
        onGridClick={function () {
          setview("grid");
        }}
        onSortChange={function (sorttype) {
          setsort(sorttype);
        }}
      />
      {!news ? (
        <LoadingComponent />
      ) : view === "list" ? (
        <ListView news={news} searchtext={searchtext} sortMethods={sortMethods} sort={sort} />
      ) : (
        <GridView news={news} searchtext={searchtext} sortMethods={sortMethods} sort={sort} />
      )}
    </>
  );
}
