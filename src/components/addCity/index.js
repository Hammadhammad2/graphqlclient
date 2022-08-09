import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { useDebounce } from "use-debounce";
import { Paper, Button, Alert, Box, Stack, Divider } from "@mui/material";
import { _ERROR } from "../../utils/Constants";
import { Link } from "react-router-dom";
import bgimage from "../../assets/img/image.jpg";
import { getCitiesRequest } from "../../services/addCity";


const City = () => {
  const user = localStorage.getItem("profile").user;

  const [displayLocations, setDisplayLocations] = useState([]);
  const [location, setLocation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [delayValue] = useDebounce(inputValue, 1000);
  const [response, setResponse] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  const changeResponse = () => {
    setTimeout(() => {
      setResponse(null);
      return;
    }, 3000);
  };

  useEffect(() => {
    getCitiesRequest(delayValue, inputValue)
      .then((search) => {
        var newData = [];
        for (var i = 0; i < search.length; i++) {
          newData.push({
            placeId: search[i].id,
            label: search[i].place_name,
            lon: search[i].geometry.coordinates[0],
            lat: search[i].geometry.coordinates[1],
          });
        }
        setDisplayLocations(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delayValue]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgimage})`,
        height: "100vh",

        /* Center and scale the image nicely */
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "blue",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          padding: "200px 500px",
          height: "100vh",
        }}
      >
        <Paper
          sx={{
            padding: "20px",
            marginBottom: "20px",
          }}
          elevation={5}
        >
          <Autocomplete
            noOptionsText="No Cities Found"
            size="small"
            clearOnBlur={false}
            onChange={(event, newValue) => {
              // setLocation(newValue);

              if (newValue) {
                if (user) {
                  newValue["userId"] = user._id;
                }

                console.log(newValue);
                location.push(newValue);


                // addCities(newValue)
                //   .then((city) => {
                //     location.push(newValue);
                //   })
                //   .catch((err) => {
                //     setResponse(err);
                //   });

                
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              setDisplayLocations([]);
            }}
            id="controllable-states-demo"
            options={displayLocations}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Search Location" />
            )}
          />
          {response && (
            <Box>
              {changeResponse()}
              <Alert
                elevation={1}
                sx={{
                  mt: 2,
                }}
                severity={_ERROR}
              >
                {response}
              </Alert>
            </Box>
          )}
        </Paper>
        <Paper
          sx={{
            padding: "20px",
          }}
          elevation={5}
        >
          <h2
            style={{
              color: "#158FFA",
              textAlign: "center",
              bgcolor: "black",
              font: "40px Open Sans bold",
              border: " 1px solid #158FFA",
            }}
          >
            Cities
          </h2>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
              overflow: "hidden",
              overflowY: "scroll",
              borderColor: "secondary.main",
            }}
          >
            {location.length > 0 ? (
              <Box sx={{ borderColor: "secondary.main" }}>
                {location.map((loc, index) => (
                  <h4
                    style={{
                      color: "#34495E",
                      font: "Arial",
                    }}
                    key={index}
                  >
                    {loc.label}
                  </h4>
                ))}
              </Box>
            ) : (
              <h4
                style={{
                  color: "#34495E",
                  font: "Open Sans",
                }}
              >
                No Cities Added
              </h4>
            )}
          </Box>
          <Divider />
          <Paper elevation={0} sx={{ mt: 2, mr: 2, ml: 2 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Button component={Link} to="/ShowCity" variant="contained">
                View All Cities
              </Button>
              {user && (
                <Button
                  sx={{ width: "140px" }}
                  onClick={handleLogout}
                  variant="contained"
                >
                  Logout
                </Button>
              )}
            </Stack>
          </Paper>
        </Paper>
      </Box>
    </Box>
  );
};

export default City;
