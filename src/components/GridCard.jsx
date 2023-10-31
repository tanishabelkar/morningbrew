import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
export default function GridCard(props) {
  return (
    <>
      <Card className="grid-card" sx={{
        boxShadow: '5px 5px 2px #f0f0f0',
        borderRadius: '0px',
        //borderBottom: '2px solid black'
      }}>
        <CardActionArea>
          <CardMedia
            className="grid-card-visible"
            component="img"
            height="100px"
            image={props.imgurl}
          ></CardMedia>
          <CardContent sx={{ justifyContent: "space-around" }}>
            <Typography
              className="grid-card-visible"
              gutterBottom
              variant="h5"
              sx={{
                fontWeight: 600,
                fontFamily: "Frank Ruhl Libre",
              }}
            >
              {props.headline}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", fontFamily: "Public Sans" }}
              mb="1em"
              className="grid-card-visible"
            >
              {"Tags: " + props.tags}
            </Typography>
            <Divider className="grid-card-visible" />
            <Typography
              variant="body2"
              color='secondary'
              mt="1em"
              className="grid-card-visible"
              sx={{ fontFamily: "Public Sans", fontWeight: '600' }}
            >
              {"Source: " + props.src}
            </Typography>
          </CardContent>
          <div className="grid-card-hidden">
            <Button
              sx={{
                p: "12px",
                display: 'inline-block',
                color: "white",
                borderRadius: 0,
                fontFamily: "Public Sans",
                transition: "all 100ms ease-in-out",
                "&::after":{
                  content: '""',
                  width: '100%',
                  position: 'absolute',
                  transform: 'scaleX(0)',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  backgroundColor: 'white',
                  transition: 'transform 200ms ease-in-out'
                },
                "&:hover":{
                  backgroundColor: 'black'
                },
                "&:hover::after": {
                  transform: 'scaleX(1)',
                },
              }}
            >
              Read more
            </Button>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
